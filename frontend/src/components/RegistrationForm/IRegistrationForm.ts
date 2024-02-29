import * as yup from 'yup';
import WWIIAPIBackend from '../../api/Api';

const API = new WWIIAPIBackend()


const RegistrationSchema = yup.object({
    email: yup.string()
    .required('Поле почты обязательно для заполнения.')
    .test(
        'email is free',
        'Данная почта уже занята',
        (value: string) => {
            return API.emailIsFree(value)
            .catch(
                () => false
            )
            .then(
                (response: boolean) => response
            )
        }
    )
    ,

    password: yup.string()
    .required('Поле пароля обязательно для заполнения.')
    .min(8, `Пароль должен содержать не менее {min} символов.`)
    ,

    firstName: yup.string()
    .required('Поле имени обязательно для заполнения.')
    ,

    lastName: yup.string()
    .notRequired()
})

type IRegistationData = yup.InferType<typeof RegistrationSchema>

interface IRegistrationFormProps {
    onSubmit?: (data: IRegistationData) => void
    onClose?: () => void
}

export default IRegistrationFormProps
export {RegistrationSchema}
export type {IRegistationData}
