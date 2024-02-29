from datetime import datetime
import random
import faker

fake = faker.Faker(locale='ru')


def generate_fake_users(count: int):
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

    return rows
