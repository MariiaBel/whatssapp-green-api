export type TInitialState = {
    userData: TUserData,
    messages: TInitialStateMessage[]
}

export type TInitialStateMessage = {
    type: 'request' | 'response',
    value: string,
    idMessage: string
}

export type TUserData = {
    idInstance: string,
    apiTokenInstance: string,
    phone: string
}

// export type TStatusMessage = {
//     status: 'next' | 'end'
// }