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
    .test(
        'test-firstname-length',
        'Длина имени должна быть не менее 2 символов.',
        (value) => !!value && !nameIsInvalid(value)
    )
    ,

    lastName: yup.string()
    .required("Поле фамилии ветерана обязательно для заполнения.")
    .notOneOf(['Землеройка'], "Ты че долбоеб :)")
    .test(
        'test-lastname-length',
        'Длина фамилии должна быть не менее 2 символов.',
        (value) => !value || !nameIsInvalid(value)
    )
    ,

    surname: yup.string()
    .test(
        'test-surname-length',
        'Длина отчества должна быть не менее 2 символов.',
        (value) => !value || !nameIsInvalid(value)
    )
    .nullable()
    ,

    description: yup.string()
    .required("Поле описания обязательно для заполнения.")
    ,

    quote: yup.string()
    .notRequired()
    ,

    photoUrl: yup.string()
    .test(
        'test-valid',
        'Некорректная ссылка на изображение',
        (value) => (!value || !urlIsInvalid(value))
    )
    .notRequired()
    ,

    yearsOfBattle: yup.array()
    .of(
        yup.number()
        .oneOf(
            [1941, 1942, 1943, 1944, 1945],
            "Неверные годы сражения."
        )
    )
    .required("Поле годов сражения обязательно для заполнения.")
    ,

    dateOfBirth: yup.date()
    .required("Поле даты рождения обязательно для заполнения.")
    .max('1945-09-02', 'Дата рождения не может быть позже окончания войны.')
    .test({
        name: 'max_dateOfBirth',
        message: 'Ветеран родился позже годов сражения.',
        test: (value, context) => {
            return !context.parent.yearsOfBattle || value <= new Date(`01-01-${getMinValue(context.parent.yearsOfBattle)}`)
        }
    })
    ,

    dateOfDeath: yup.date()
    .notRequired()
    .max(new Date(), "Дата смерти не может быть позднее текущей даты.")
    .test({
        name: 'min_dateOfDeath',
        message: 'Ветеран умер раньше своих годов сражения.',
        test: (value, context) => {
            return !context.parent.yearsOfBattle || !value || value >= new Date(`01-01-${getMaxValue(context.parent.yearsOfBattle)}`)
        }
    })
})


type IPerson = InferType<typeof PersonFormSchema>

export default IPerson
export { PersonFormSchema }