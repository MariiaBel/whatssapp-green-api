
import { configureStore } from '@reduxjs/toolkit';
import { messageReducer } from './message/slice';


export default configureStore({
    reducer: {
        message: messageReducer
    }
})