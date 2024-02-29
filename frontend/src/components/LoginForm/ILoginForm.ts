import * as yup from 'yup';


const LoginSchema = yup.object({
    'email': yup.string()
    .required('Данное поле обязательно для заполнения')
    ,

    'password': yup.string()
    .required('Данное поле обязательно для заполнения.')
})


type IUserLoginData = yup.InferType<typeof LoginSchema>

interface ILoginFormProps {
    onSubmit?: (formData: any) => void
    onClose?: () => void
}

export default ILoginFormProps;
export {LoginSchema};
export type {IUserLoginData};