export type TInitialState = {
    userData: {
        idInstance: string,
        apiTokenInstance: string,
        phone: string
    },
    messages: TInitialStateMessage[]
}

export type TInitialStateMessage = {
    type: 'request' | 'response',
    value: string,
    idMessage: string
}

export type TStatusMessage = {
    status: 'next' | 'end'
}