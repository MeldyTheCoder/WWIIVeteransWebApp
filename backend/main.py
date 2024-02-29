import settings
import fastapi
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routers import veterans, users

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

app.include_router(veterans.router)
app.include_router(users.router)

if settings.DEBUG:
    app.include_router(veterans.test_router)

if __name__ == '__main__':
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
