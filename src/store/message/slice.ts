import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetMessage, fetchSendMessage } from './thunks';
import { TInitialState, TInitialStateMessage, TUserData } from './types';

const initialState: TInitialState = {
    userData: {
        idInstance: '',
        apiTokenInstance: '',
        phone: ''
    },
    messages: []

}


const messageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<TUserData>) => {
            state.userData = {
                ...state.userData,
                ...action.payload
            }
        },
        setMessage: (state, action: PayloadAction<TInitialStateMessage>) => {
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
                if (!!action.payload) {
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