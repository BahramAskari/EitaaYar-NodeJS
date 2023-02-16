export type getMe_FailedResponse = {
    ok: false
}
export type getMe_SucceedResponse = {
    ok: true
    result: {
        id: number
        is_bot: boolean
        first_name: string
        last_name: string
        username: string
    }
}
export type getMe_Response = getMe_FailedResponse | getMe_SucceedResponse