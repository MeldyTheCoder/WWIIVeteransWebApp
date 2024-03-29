import axios, { AxiosRequestConfig } from 'axios';
import IPerson from '../interfaces/IPerson';
import { RequestMethods, HeadersType, ResponseData, DataType, wait, AccessTokenResponse, GetTokenResponse } from './Types';


class WWIIAPIBackend {
    private token: string | null | undefined
    defaultHeaders: Record<string, string>

    constructor(token?: string) {
        this.token = token
        this.defaultHeaders = {
            'Authorization': `Bearer ${this.token}`
        }
    }

    private baseUrl = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080/'

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

    async getToken(email: string, password: string, headers?: HeadersType) {
        const requestUrl = 'users/token/'
        const requestMethod: RequestMethods = RequestMethods.POST
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers}
        const requestData = {email, password}

        const response = await this.makeRequest<GetTokenResponse>(
            requestUrl, 
            requestMethod,
            requestData,
            requestHeaders
        )

        return response.data
    }

    async getMe(headers?: HeadersType) {
        const requestUrl = 'users/me'
        const requestMethod: RequestMethods = RequestMethods.GET
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers}
        const requestData = {}

        const response = await this.makeRequest<AccessTokenResponse>(
            requestUrl, 
            requestMethod,
            requestData,
            requestHeaders
        )

        return response.data
    }

    async registerUser(email: string, password: string, firstName: string, lastName?: string, headers?: HeadersType) {
        const requestUrl = 'users/register/'
        const requestMethod: RequestMethods = RequestMethods.POST
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers}
        const requestData = {email, password, firstName, lastName}

        const response = await this.makeRequest<AccessTokenResponse>(
            requestUrl, 
            requestMethod,
            requestData,
            requestHeaders
        )

        return response.data
    }


    async emailIsFree(email: string, headers?: HeadersType) {
        const requestUrl = 'users/registration/email/check/'
        const requestMethod: RequestMethods = RequestMethods.POST
        const requestHeaders: HeadersType = {...this.defaultHeaders, ...headers}
        const requestData = {'email': email}

        const request = await this.makeRequest<Record<string, boolean>>(
            requestUrl, 
            requestMethod,
            requestData,
            requestHeaders
        )

        return request.data?.detail || false
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
        
        return await axios(requestInitial)
    }
}

export default WWIIAPIBackend