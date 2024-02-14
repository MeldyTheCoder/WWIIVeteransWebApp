import axios, { AxiosRequestConfig } from 'axios';
import IPerson from '../interfaces/IPerson';
import { RequestMethods, HeadersType, ResponseData, DataType, wait } from './Types';


class WWIIAPIBackend {
    private baseUrl = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080/'
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

    async deleteVeteran(veteran_id: number, headers?: HeadersType): ResponseData<IPerson> {
        const requestUrl: string = `veterans/${veteran_id}/delete/`
        const requestMethod: RequestMethods = RequestMethods.DELETE
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers} || {}

        return await this.makeRequest(
            requestUrl, 
            requestMethod,
            {},
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
        
        await wait(1000)
        return await axios(requestInitial)
    }
}

export default WWIIAPIBackend