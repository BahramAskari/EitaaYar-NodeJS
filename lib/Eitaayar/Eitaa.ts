import axios, {AxiosError, AxiosResponse} from "axios"
import {getMe_FailedResponse, getMe_Response, getMe_SucceedResponse} from "./types/getMe";
import {
    sendMessage_FailedResponse,
    sendMessage_Params,
    sendMessage_Response,
    sendMessage_SucceedResponse
} from "./types/sendMessage";
import {sendFile_FailedResponse, sendFile_Params, sendFile_Response, sendFile_SucceedResponse} from "./types/sendFile";
/**
 * Class
 */
class Eitaa {
    private baseApiUrl: string = `https://eitaayar.ir/api` // https://eitaayar.ir/api/TOKEN/METHOD_NAME
    private apiUrl: string
    private accessToken: string

    constructor(token: string) {
        this.accessToken = token
        this.apiUrl = this.baseApiUrl+`/${token}`
    }

    public async getMyInfo(): Promise<getMe_Response> {

        return await axios.get(this.apiUrl+`/getMe`).then((res: AxiosResponse<getMe_SucceedResponse>)=> {
            return res.data
        }).catch((err: AxiosError<getMe_FailedResponse>)=> {
            return err.response.data
        })

    }

    public async sendMessage(parameters: sendMessage_Params) : Promise<sendMessage_Response> {

        return await axios.post(this.apiUrl+`/sendMessage`,parameters).then((res: AxiosResponse<sendMessage_SucceedResponse>)=> {
            return res.data
        }).catch((err: AxiosError<sendMessage_FailedResponse>)=> {
            return err.response.data
        })

    }

    public async sendFile(parameters: sendFile_Params) : Promise<sendFile_Response> {

        return await axios.post(this.apiUrl+`/sendFile`,parameters).then((res: AxiosResponse<sendFile_SucceedResponse>)=> {
            return res.data
        }).catch((err: AxiosError<sendFile_FailedResponse>)=> {
            return err.response.data
        })

    }
}