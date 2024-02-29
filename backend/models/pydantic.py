import inspect
import pydantic
import pydantic_core
from fastapi import Form
from datetime import datetime
from typing import Union, Optional, Type

ErrorModel = pydantic_core.ErrorDetails
ValidationError = pydantic.ValidationError


def as_form(cls: Type[pydantic.BaseModel]):
    new_parameters = []

    for field_name, model_field in cls.__fields__.items():
        new_parameters.append(
             inspect.Parameter(
                 getattr(model_field, 'alias') or getattr(model_field, 'serialization_alias') or field_name,
                 inspect.Parameter.POSITIONAL_ONLY,
                 default=Form(...) if model_field.is_required else Form(model_field.default),
                 annotation=model_field.annotation,
             )
         )

    async def as_form_func(**data):
        return cls(**data)

    sig = inspect.signature(as_form_func)
    sig = sig.replace(parameters=new_parameters)
    as_form_func.__signature__ = sig  # type: ignore
    setattr(cls, 'as_form', as_form_func)
    return cls


@as_form
class PydanticModel(pydantic.BaseModel, extra=pydantic.Extra.ignore):
    """
    Базовая модель Pydantic
    """


@as_form
class VeteranModel(PydanticModel):
    """
    Модель ветерана
    """

    id: Optional[int] = pydantic.Field(
        description='ID Ветерана',
        default=None,
        serialization_alias='id',
        validation_alias='id'
    )

    first_name: str = pydantic.Field(
        description='Имя ветерана',
        max_length=100,
        serialization_alias='firstName',
        validation_alias=pydantic.AliasChoices('firstName', 'first_name')
    )

    last_name: str = pydantic.Field(
        description='Фамилия ветерана',
        max_length=100,
        serialization_alias='lastName',
        validation_alias=pydantic.AliasChoices('lastName', 'last_name')
    )

    surname: Optional[str] = pydantic.Field(
        description='Отчество ветерана (необязательное поле)',
        default=None,
        max_length=100,
        serialization_alias='surname',
        validation_alias=pydantic.AliasChoices('surname')
    )

    description: str = pydantic.Field(
        description='Описание подвигов ветерана',
        max_length=512,
        serialization_alias='description',
        validation_alias='description'
    )

    quote: Optional[str] = pydantic.Field(
        description='Цитата ветерана (необязательное поле)',
        default=None,
        max_length=120,
        serialization_alias='quote',
        validation_alias=pydantic.AliasChoices('quote')
    )

    photo_url: Optional[str] = pydantic.Field(
        description='Ссылка на фото ветерана (необязательное поле)',
        default=None,
        serialization_alias='photoUrl',
        validation_alias=pydantic.AliasChoices('photoUrl', 'photo_url')
    )

    years_of_battle: list[int] = pydantic.Field(
        description='Годы сражения ветерана',
        default=[],
        serialization_alias='yearsOfBattle',
        validation_alias=pydantic.AliasChoices('yearsOfBattle', 'years_of_battle')
    )

    date_of_birth: datetime = pydantic.Field(
        description='Дата рождения ветерана',
        serialization_alias='dateOfBirth',
        validation_alias=pydantic.AliasChoices('dateOfBirth', 'date_of_birth')
    )

    date_of_death: Optional[datetime] = pydantic.Field(
        description='Дата смерти ветерана (необязательное поле)',
        serialization_alias='dateOfDeath',
        validation_alias=pydantic.AliasChoices('dateOfDeath', 'date_of_death'),
        default=None
    )

    created_by: Optional[int] = pydantic.Field(
        description='Создатель ветерана',
        serialization_alias='createdBy',
        validation_alias=pydantic.AliasChoices('createdBy', 'created_by'),
        default=None
    )

    @pydantic.field_validator('date_of_birth')
    def validate_date_of_birth(cls, value: datetime):
        if value.timestamp() > datetime.now().timestamp():
            raise pydantic.ValidationError(
                'Дата рождения не может быть больше текущей даты.'
            )

        return value

    @pydantic.field_validator('date_of_death')
    def validate_date_of_death(cls, value: datetime):
        if value.timestamp() > datetime.now().timestamp():
            raise pydantic.ValidationError(
                'Дата смерти не может быть больше текущей даты.'
            )

        return value


@as_form
class EmailCheckModel(PydanticModel):
    """
    Модель для проверки почты на занятость
    """

    email: str = pydantic.Field(
        description='Почта пользователя',
        alias='email'
    )


@as_form
class VeteranListModel(pydantic.RootModel):
    """
    Модель Pydantic для валидации списка ветеранов
    """

    root: list[VeteranModel]


@as_form
class UserLoginModel(PydanticModel):
    """
    Модель для авторизации пользователя
    """

    email: str = pydantic.Field(
        description='Эл. почта пользователя'
    )

    password: str = pydantic.Field(
        description='Пароль пользователя'
    )


@as_form
class UserRegisterModel(PydanticModel):
    """
    Модель для регистрации пользователя
    """

    email: str = pydantic.Field(
        description='Эл. почта пользователя',
        serialization_alias='email',
        validation_alias=pydantic.AliasChoices('email')
    )

    password: str = pydantic.Field(
        description='Пароль пользователя',
        serialization_alias='password',
        validation_alias=pydantic.AliasChoices('password')
    )

    first_name: str = pydantic.Field(
        description='Имя пользователя',
        serialization_alias='firstName',
        validation_alias=pydantic.AliasChoices('firstName', 'first_name')
    )

    last_name: str = pydantic.Field(
        description='Фамилия пользователя',
        default=None,
        serialization_alias='lastName',
        validation_alias=pydantic.AliasChoices('lastName', 'last_name')
    )


@as_form
class UserModel(PydanticModel):
    """
        Модель для регистрации пользователя
        """

    id: Optional[int] = pydantic.Field(
        description='ID пользователя',
        serialization_alias='id',
        validation_alias=pydantic.AliasChoices('id')
    )

    email: str = pydantic.Field(
        description='Эл. почта пользователя',
        serialization_alias='email',
        validation_alias=pydantic.AliasChoices('email')
    )

    password_hash: str = pydantic.Field(
        description='Хэш пароля пользователя',
        serialization_alias='passwordHash',
        validation_alias=pydantic.AliasChoices('passwordHash', 'password_hash')
    )

    first_name: str = pydantic.Field(
        description='Имя пользователя',
        serialization_alias='firstName',
        validation_alias=pydantic.AliasChoices('firstName', 'first_name')
    )

    last_name: Optional[str] = pydantic.Field(
        description='Фамилия пользователя',
        default=None,
        serialization_alias='lastName',
        validation_alias=pydantic.AliasChoices('lastName', 'last_name')
    )

    date_joined: Optional[Union[datetime, str]] = pydantic.Field(
        description='Дата регистрации пользователя',
        default=None,
        serialization_alias='dateJoined',
        validation_alias=pydantic.AliasChoices('dateJoined', 'date_joined')
    )

    date_password_changed: Optional[Union[datetime, str]] = pydantic.Field(
        description='Дата смены пароля пользователя',
        default=None,
        serialization_alias='datePasswordChanged',
        validation_alias=pydantic.AliasChoices('datePasswordChanged', 'date_password_changed')
    )

    email_verified: Optional[bool] = pydantic.Field(
        description='Почта пользователя подтверждена',
        default=False,
        serialization_alias='emailVerified',
        validation_alias=pydantic.AliasChoices('emailVerified', 'email_verified')
    )

