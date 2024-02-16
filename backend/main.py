import settings
import fastapi
import uvicorn
import random
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Union
from models import pydantic, sqlalchemy
from faker import Faker

fake = Faker(locale='ru')


app = fastapi.FastAPI(
    debug=settings.DEBUG,
    title=settings.PROJECT_TITLE,
    description=settings.PROJECT_DESCRIPTION,
    redirect_slashes=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def response_model(model):
    return Union[model, list[pydantic.ErrorModel]]


@app.get('/veterans/', name='listOfVeterans')
async def get_veteran_list():
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


@app.post('/veterans/add/', name='createVeteran')
async def create_veteran(
        form_data: pydantic.VeteranModel
):
    try:
        sqlalchemy.Veteran.create(**form_data.model_dump())
        return form_data

    except pydantic.ValidationError as validation_error:
        return validation_error.errors()

    except Exception as error:
        if settings.DEBUG:
            raise error

        return {'error': str(error)}


@app.delete('/veterans/{veteran_id}/delete/')
async def delete_veteran(veteran_id: int, response: fastapi.Response):
    try:
        data = sqlalchemy.Veteran.fetch_one(id=veteran_id)
        if not data:
            response.status_code = fastapi.status.HTTP_404_NOT_FOUND
            return {'detail': 'Not found'}

        sqlalchemy.Veteran.delete(id=veteran_id)
        return pydantic.VeteranModel(**data.as_dict())

    except pydantic.ValidationError as validation_error:
        return validation_error.errors()

    except Exception as error:
        if settings.DEBUG:
            raise error

        return {'error': str(error)}


@app.post('/test-add/{count}/')
async def test_add_veterans(count: int):
    years_of_battles = [1939, 1940, 1941, 1942, 1943, 1944, 1945]

    century_18 = datetime.fromtimestamp(-5360626269)
    century_19 = datetime.fromtimestamp(-1258266052)
    century_20 = datetime.fromtimestamp(-753348052)
    end_date = datetime.now()

    rows = []

    for _ in range(count):
        date_of_birth: datetime = fake.date_between(century_18, century_19)
        date_of_death: datetime = fake.date_between(century_20, end_date)

        first_name, last_name = fake.passport_owner()

        data = {
            'id': random.randint(0, 1000000),
            'first_name': first_name,
            'last_name': last_name,
            'surname': '',
            'description': fake.paragraph(nb_sentences=5, variable_nb_sentences=False),
            'quote': fake.text(max_nb_chars=20),
            'photo_url': '',
            'years_of_battle': list(
                set(random.choice(years_of_battles) for _ in range(random.randint(
                    1, len(years_of_battles)
                )))
            ),
            'date_of_birth': date_of_birth.isoformat(),
            'date_of_death': date_of_death.isoformat()
        }

        rows.append(data)
        sqlalchemy.Veteran.create(**data)

    return pydantic.VeteranListModel(root=rows)


if __name__ == '__main__':
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
