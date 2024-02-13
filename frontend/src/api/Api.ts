import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import IPerson from '../interfaces/IPerson';


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


class WWIIAPIBackend {
    private baseUrl = process.env.REACT_APP_BACKEND_HOST || 'http://backend_service:8080/'
    private defaultHeaders = {}


    async getVeteransList(data?: DataType, headers?: HeadersType): ResponseData<IPerson[]> {
        const requestUrl: string = 'veterans/'
        const requestMethod: RequestMethods = RequestMethods.GET
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers} || {}
        const requestData = {...data} || null

        return this.makeRequest(
            requestUrl,
            requestMethod,
            requestData,
            requestHeaders
        )
    }

    async createVeteran(data?: DataType, headers?: HeadersType): ResponseData<IPerson> {
        const requestUrl: string = 'veterans/add/'
        const requestMethod: RequestMethods = RequestMethods.POST
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers} || {}
        const requestData = {...data} || null

        return await this.makeRequest(
            requestUrl,
            requestMethod,
            requestData,
            requestHeaders
        )
    }

    private async makeRequest<ResponseType>(url: string, method: RequestMethods, data?: DataType, headers?: HeadersType): ResponseData<ResponseType> {
        url = `${this.baseUrl}${url}`

        const requestInitial: AxiosRequestConfig = {
            url: url,
            data: data,
            method: method,
            headers: headers,
            timeout: 5000
        }
        
        await wait(2000)
        return await axios(requestInitial)
    }
}

export default WWIIAPIBackend