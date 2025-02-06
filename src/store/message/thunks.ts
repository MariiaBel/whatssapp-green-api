import { createAppAsyncThunk } from '../../hooks/store';
import { deleteNotification, receiveNotification, sendMessage } from './api';
import { TInitialStateMessage } from './types';


export const fetchSendMessage = createAppAsyncThunk<TInitialStateMessage | null, string>('message/fetchMessage', async (message, { getState }) => {
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


export const fetchGetMessage = createAppAsyncThunk('message/fetchGetMessage', async (_, { getState }) => {
    const { userData } = getState().message

    const dataNotification = await receiveNotification({ ...userData })
    if (!dataNotification) return null

    if (dataNotification.receiptId) await deleteNotification({ ...userData, receiptId: dataNotification.receiptId })

    console.log(dataNotification.body)
    if (dataNotification.body?.typeWebhook === "outgoingMessageReceived" &&
        dataNotification.body.senderData.chatId === `${userData.phone}@c.us`) {
        return {
            idMessage: dataNotification.body.idMessage,
            type: 'response',
            value: dataNotification.body.messageData?.extendedTextMessageData?.text
        } as TInitialStateMessage
    }

})