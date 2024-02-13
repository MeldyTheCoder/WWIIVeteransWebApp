import os
from dotenv import load_dotenv


# Директория проекта
BASE_DIR = os.path.dirname(__file__)

# Путь к .env файлу для регистрации
# Параметров виртуального окружения
ENV_PATH = os.path.join(BASE_DIR, '.env')

# Прогрузка виртуального окружения
load_dotenv(dotenv_path=ENV_PATH)

# Секретный ключ проекта для валидации хешей паролей
SECRET_KEY = os.getenv('SECRET_KEY', 'secret-key_554c1139-abb2-420c-8229-1d8f9375eead')

# Хост, на котором должен быть запущен проект
HOST = os.getenv('HOST', '0.0.0.0')

# Порт, на котором должен быть запущен проект
PORT = os.getenv('PORT', 8080)

# Состояние отладки проекта
# Ставить False, если собираетесь деплоить проект на продакшн
DEBUG = os.getenv('DEBUG', True)


# Ссылка на подключение к БД
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+psycopg2://kirill:1234@localhost:5433/main')

# Заголовок проекта для отображения в документации API
PROJECT_TITLE = 'WWII Backend'

# Описание проекта для отображения в документации API
PROJECT_DESCRIPTION = ('Бэкенд для просмотра и обработки информации '
                       'о ветеранах Великой Отечественной Войны')

