export type sendFile_Params = {
    file: string //| File
    chat_id: number|string  // 1234 | bahram_askari
    caption?: string
    title?: string  // just for Eitaayar panel
    // اگر با عدد یک مقدار دهی شود، پیام را بدون notification برای کاربر ارسال میکند.
    disable_notification?: number
    reply_to_message_id?: number    // message-id you want to reply
    date?: number   // unix timestamp -> the seconds since `January 01 1970 00:00:00` -> new Date(date)
    pin?: 1
    viewCountForDelete?: number
}








export type sendFile_FailedResponse = {
    ok: false
}
export type sendFile_SucceedResponse = {
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
export type sendFile_Response = sendFile_FailedResponse | sendFile_SucceedResponse