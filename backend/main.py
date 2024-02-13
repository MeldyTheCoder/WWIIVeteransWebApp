import settings
import fastapi
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from models import pydantic, sqlalchemy

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


if __name__ == '__main__':
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
