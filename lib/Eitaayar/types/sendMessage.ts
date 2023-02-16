export type sendMessage_Params = {
    chat_id: number|string  // 1234 | bahram_askari
    text: string
    title?: string  // just for Eitaayar panel
    // اگر با عدد یک مقدار دهی شود، پیام را بدون notification برای کاربر ارسال میکند.
    disable_notification?: boolean
    reply_to_message_id?: number    // message-id you want to reply
    date?: number   // unix timestamp -> the seconds since `January 01 1970 00:00:00` -> new Date(date)
    pin?: 1
    viewCountForDelete?: number
}








export type sendMessage_FailedResponse = {
    ok: false
}
export type sendMessage_SucceedResponse = {
    ok: true
    result: {

        message_id: number

        from: {
            id: number
            is_bot: boolean
            first_name: string
            last_name: string
            username: string
        }

        chat: {
            id: number
            type: "public" | "private"
            username: string
        }

        date: number  // unix timestamp -> the seconds since `January 01 1970 00:00:00` -> new Date(date)
        text: string

    }
}
export type sendMessage_Response = sendMessage_FailedResponse | sendMessage_SucceedResponse