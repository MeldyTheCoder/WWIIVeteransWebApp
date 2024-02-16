import random
from faker import Faker
import requests
from datetime import datetime

fake = Faker(locale='ru')
session = requests.session()


def test_add_table_data():
    url = 'http://localhost:8080/veterans/add'
    years_of_battles = [1939, 1940, 1941, 1942, 1943, 1944, 1945]
    counter = 100

    century_18 = datetime.fromtimestamp(-5360626269)
    century_19 = datetime.fromtimestamp(-1258266052)
    century_20 = datetime.fromtimestamp(-753348052)
    end_date = datetime.now()

    for _ in range(counter):
        date_of_birth: datetime = fake.date_between(century_18, century_19)
        date_of_death: datetime = fake.date_between(century_20, end_date)

        first_name, last_name = fake.passport_owner()

        data = {
            'id': random.randint(0, 1000000),
            'firstName': first_name,
            'lastName': last_name,
            'surname': '',
            'description': fake.paragraph(nb_sentences=5, variable_nb_sentences=False),
            'quote': fake.text(max_nb_chars=20),
            'photoUrl': '',
            'yearsOfBattle': list(
                set(random.choice(years_of_battles) for _ in range(random.randint(
                    1, len(years_of_battles)
                )))
            ),
            'dateOfBirth': date_of_birth.isoformat(),
            'dateOfDeath': date_of_death.isoformat()
        }

        response = session.post(url, json=data)
        print(response.text)
