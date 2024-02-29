import { AxiosResponse } from "axios"


const enum RequestMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS'
}

interface PydanticErrorField {
    loc: [string, number]
    msg: string
    type: string

}


interface PydanticErrorResponse {
    detail: PydanticErrorField[]
}


interface AccessTokenResponse {
    access_token: string
    token_type: string
}


interface UserResponse {
    id?: number
    email: string
    passwordHash?: string
    firstName: string
    lastName?: string
    dateJoined?: string | Date 
    datePasswordChanged?: string | Date
    emailVerified: boolean
}



interface GetTokenResponse {
    user: UserResponse
    token: AccessTokenResponse
}

type DataType = Record<string, any>
type HeadersType = Record<string, string>
type ResponseData<Model> = Promise<AxiosResponse<Model>>
const wait = (ms: number) => {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}


export type { DataType, HeadersType, ResponseData, PydanticErrorField, PydanticErrorResponse, AccessTokenResponse, UserResponse, GetTokenResponse } 
export { wait, RequestMethods }