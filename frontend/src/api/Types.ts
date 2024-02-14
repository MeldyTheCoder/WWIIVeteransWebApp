import { AxiosResponse } from "axios"


const enum RequestMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS'
}

type DataType = Record<string, any>
type HeadersType = Record<string, string>
type ResponseData<Model> = Promise<AxiosResponse<Model>>

const wait = (ms: number) => {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}


export type { DataType, HeadersType, ResponseData} 
export { wait, RequestMethods }