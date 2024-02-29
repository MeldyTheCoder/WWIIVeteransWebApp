from typing import Annotated

import fastapi
from models import pydantic, sqlalchemy
from auth import UserType, authenticate_user, create_token, get_user, create_password_hash


router = fastapi.APIRouter(
    prefix='/users',
    tags=['users']
)


incorrect_login_data_exception = fastapi.HTTPException(
    status_code=fastapi.status.HTTP_400_BAD_REQUEST,
    detail='Неверные данные для входа.'
)

incorrect_registration_data_exception = fastapi.HTTPException(
    status_code=fastapi.status.HTTP_400_BAD_REQUEST,
    detail='Неверные данные для регистрации.'
)

user_already_exists_exception = fastapi.HTTPException(
    status_code=fastapi.status.HTTP_403_FORBIDDEN,
    detail='Пользователь с данной почтой уже существует.'
)


@router.post('/token/')
async def get_token(form_data: pydantic.UserLoginModel):
    """
    Генерирует Bearer-токен для авторизации.
    """

    if not form_data:
        raise incorrect_login_data_exception

    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise incorrect_login_data_exception

    return {'user': user, 'token': create_token(user)}


@router.post('/register/')
async def register_user(form_data: pydantic.UserRegisterModel):
    """
    Регистрирует пользователя в БД.
    """

    if not form_data:
        raise incorrect_registration_data_exception

    email = form_data.email
    if get_user(email):
        raise user_already_exists_exception

    password = form_data.password
    password_hash = create_password_hash(password)

    created_user = sqlalchemy.User.create(
        email=form_data.email,
        password_hash=password_hash,
        first_name=form_data.first_name,
        last_name=form_data.last_name
    )

    return pydantic.UserModel.model_validate(obj=created_user.as_dict())


@router.post('/registration/email/check/')
async def validate_registration_email(form_data: pydantic.EmailCheckModel):
    """
    Проверка почты на ее занятость другим пользователем.
    Данная функция нужна для валидации поля почты на клиенте.
    """

    if get_user(form_data.email):
        return {'detail': False}

    return {'detail': True}


@router.get('/me/')
async def get_me(user: UserType):
    """
    Выводит данные с БД текущего авторизованного пользователя.
    """

    return user


@router.post('/email-verification/{uidb}/{token}')
async def email_verification(uidb: str, token: str):
    return {'uidb': uidb, 'token': token}