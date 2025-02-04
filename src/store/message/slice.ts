import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteNotification, receiveNotification, sendMessage } from './api';
import { TInitialState, TInitialStateMessage, TStatusMessage } from './types';

const initialState: TInitialState = {
    userData: {
        idInstance: '',
        apiTokenInstance: '',
        phone: ''
    },
    messages: []

}

export const fetchSendMessage = createAsyncThunk<TInitialStateMessage | null, string>('message/fetchMessage', async (message, { getState }) => {
    const { userData } = getState().message

    const result = await sendMessage({
        message,
        ...userData
    })

    if (result.idMessage) {
        return {
            idMessage: result.idMessage,
            type: 'request',
            value: message
        }
    }
    return null
})

export const fetchGetMessage = createAsyncThunk<TInitialStateMessage | TStatusMessage, void>('message/fetchGetMessage', async (_, { getState, dispatch }) => {
    const { userData } = getState().message

    const dataNotification = await receiveNotification({ ...userData })
    if (!dataNotification) return null

    if (dataNotification.receiptId) await deleteNotification({ ...userData, receiptId: dataNotification.receiptId })

    if (dataNotification.body?.idMessage) {
        // if(dataNotification.body && dataNotification.body.messageData) {
        return {
            idMessage: dataNotification.body.idMessage,
            type: 'response',
            value: dataNotification.body.messageData?.extendedTextMessageData?.text || ""
        }
    }

})

const messageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = {
                ...state.userData,
                ...action.payload
            }
        },
        setMessage: (state, action) => {
            state.messages = [
                ...state.messages,
                action.payload
            ]
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchSendMessage.fulfilled, (state, action) => {
            if (!!action.payload) {
                state.messages = [
                    ...state.messages,
                    action.payload
                ]
            }
        }),
            builder.addCase(fetchGetMessage.fulfilled, (state, action) => {
                if (!!action.payload && action.payload.value) {
                    state.messages = [
                        ...state.messages,
                        action.payload
                    ]
                }
            })
    }
})

export const { setUserData, setMessage } = messageSlice.actions

export const messageReducer = messageSlice.reducer