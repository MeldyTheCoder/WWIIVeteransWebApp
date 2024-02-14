import * as yup from 'yup';
import { InferType } from 'yup';


const nameIsInvalid = (name: string): boolean => (name?.length > 0 && name?.length <= 1)
const urlIsInvalid = (url: string): boolean => (url?.length > 0 && (!url.startsWith('http') || url.length >= 1000))

const getMinValue = (array?: any[]) => {
    array = array?.sort()
    if (!array) {
        return null
    }

    const value = array[0]
    
    if (typeof value === 'string') {
        return parseInt(value)
    }

    return value
} 

const getMaxValue = (array?: any[]) => {
    array = array?.sort()
    if (!array) {
        return null
    }

    const value = array[array.length - 1]
    
    if (typeof value === 'string') {
        return parseInt(value)
    }

    return value
}

const PersonFormSchema = yup.object({
    firstName: yup.string()
    .required("Поле имени ветерана обязательно для заполнения.")
    .min(2, 'Длина имени должна быть не менее 2 символов.')
    .max(100, "Длина имени должна быть не более 100 символов.")
    ,
    
    lastName: yup.string()
    .required("Поле фамилии ветерана обязательно для заполнения.")
    .notOneOf(['Землеройка'], "Ты че долбоеб :)")
    .min(2, 'Длина фамилии должна быть не менее 2 символов.')
    .max(100, "Длина фамилии должна быть не более 100 символов.")
    ,

    surname: yup.string()
    .notRequired()
    .min(2, 'Длина отчетства должна быть не менее 2 символов.')
    .max(100, "Длина отчества должна быть не более 100 символов.")
    ,

    description: yup.string()
    .required("Поле описания обязательно для заполнения.")
    .min(10, 'Длина описания должна быть не менее 10 символов.')
    .max(512, "Длина описания должна быть не более 512 символов.")
    ,

    quote: yup.string()
    .notRequired()
    .min(5, 'Длина цитаты должна быть не менее 5 символов.')
    .max(120, "Длина цитаты должна быть не более 120 символов.")
    ,

    photoUrl: yup.string()
    .notRequired()
    .test(
        'test-valid',
        'Некорректная ссылка на изображение',
        (value) => (!value || !urlIsInvalid(value))
    )
    ,

    yearsOfBattle: yup.array()
    .of(
        yup.number()
        .oneOf(
            [1939, 1940, 1941, 1942, 1943, 1944, 1945],
            "Неверные годы сражения."
        )
    )
    .required("Поле годов сражения обязательно для заполнения.")
    ,

    dateOfBirth: yup.date()
    .required("Поле даты рождения обязательно для заполнения.")
    .min('1800-01-01', 'Минимальная дата рождения - 1 января 1800 года.')
    .max('1945-09-02', 'Дата рождения не может быть позже окончания войны.')
    .test({
        name: 'max_dateOfBirth',
        message: 'Ветеран родился позже годов сражения.',
        test: (value, context) => {
            return !context.parent.yearsOfBattle || value <= new Date(`01-01-${getMinValue(context.parent.yearsOfBattle)}`)
        }
    })
    .test({
        name: 'dateOfBirth_more_than_dateOfDeath',
        message: 'Ветеран родился позднее, чем умер.',
        test: (value, context) => {
            return !value || !context.parent.dateOfDeath || value <= context.parent.dateOfDeath
        }
    })
    ,

    dateOfDeath: yup.date()
    .notRequired()
    .min('1800-01-01', 'Минимальная дата смерти - 1 января 1800 года.')
    .max(new Date(), "Дата смерти не может быть позднее текущей даты.")
    .test({
        name: 'min_dateOfDeath',
        message: 'Ветеран умер раньше своих годов сражения.',
        test: (value, context) => {
            return !context.parent.yearsOfBattle || !value || value >= new Date(`01-01-${getMaxValue(context.parent.yearsOfBattle)}`)
        }
    })
    .test({
        name: 'dateOfDeath_less_than_dateOfBirth',
        message: 'Ветеран умер раньше, чем родился.',
        test: (value, context) => {
            return !value || !context.parent.dateOfBirth || value >= context.parent.dateOfBirth
        }
    })
})


type IPerson = InferType<typeof PersonFormSchema>

export default IPerson
export { PersonFormSchema }