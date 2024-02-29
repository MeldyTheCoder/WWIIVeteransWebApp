import fastapi
import settings
import testing
from models import sqlalchemy, pydantic
from auth import UserType

router = fastapi.APIRouter(
    prefix='/veterans',
    tags=['veterans'],
    redirect_slashes=True
)

test_router = fastapi.APIRouter(
    prefix='/test-veterans',
    redirect_slashes=True
)


@router.get('/', name='listOfVeterans')
async def get_veteran_list():
    """
    Выводит список всех ветеранов с БД.
    """

    try:
        veterans = sqlalchemy.Veteran.fetch_all()
        veterans = [pydantic.VeteranModel.model_validate(obj=row.as_dict()) for row in veterans]
        serialized_data = pydantic.VeteranListModel(root=veterans)
        return serialized_data

    except pydantic.ValidationError as validation_error:
        return validation_error.errors()

    except Exception as error:
        if settings.DEBUG:
            raise error

        return {'error': str(error)}


@router.post('/add/', name='createVeteran')
async def create_veteran(
        user: UserType,
        form_data: pydantic.VeteranModel
):
    """
    Требует авторизации. Добавляет нового ветерана.
    """

    form_data.created_by = user.id

    try:
        row_data = sqlalchemy.Veteran.create(**form_data.model_dump())
        return pydantic.VeteranModel.model_validate(obj=row_data.as_dict())

    except pydantic.ValidationError as validation_error:
        return validation_error.errors()

    except Exception as error:
        if settings.DEBUG:
            raise error

        return {'error': str(error)}


@router.delete('/{veteran_id}/delete/')
async def delete_veteran(
        user: UserType,
        veteran_id: int,
):
    """
    Требует авторизации. Удаляет ветерана.
    """

    try:
        data = sqlalchemy.Veteran.fetch_one(id=veteran_id)
        if not data:
            raise fastapi.HTTPException(
                status_code=fastapi.status.HTTP_404_NOT_FOUND,
                detail='Запись не найдена.'
            )

        if data.created_by and data.created_by != user.id:
            raise fastapi.HTTPException(
                status_code=fastapi.status.HTTP_403_FORBIDDEN,
                detail='Вы не являетесь владельцем записи'
            )

        sqlalchemy.Veteran.delete(id=veteran_id)
        return pydantic.VeteranModel(**data.as_dict())

    except pydantic.ValidationError as validation_error:
        return validation_error.errors()

    except Exception as error:
        if settings.DEBUG:
            raise error

        return {'error': str(error)}


@test_router.delete('/delete/all/')
async def delete_all_veterans():
    """
    Тестовая функция. Удаляет всех ветеранов с БД.
    Установите setting.DEBUG на False, чтобы убрать эту функцию.
    """

    try:
        sqlalchemy.Veteran.delete(id__gt=0)
        return {'detail': 'Deleted'}
    except Exception as exception:
        return {'detail': str(exception)}


@test_router.post('/add/{count}/')
async def test_add_veterans(count: int):
    """
    Тестовая функция. Создает случайно сгенерированных ветеранов.
    Установите setting.DEBUG на False, чтобы убрать эту функцию.
    """

    try:
        fake_veterans = testing.generate_fake_users(count)
        for veteran in fake_veterans:
            sqlalchemy.Veteran.create(**veteran)

        return pydantic.VeteranListModel(root=fake_veterans)

    except Exception as exception:
        return {'detail': str(exception)}
