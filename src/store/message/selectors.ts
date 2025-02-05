import { RootState } from "../store"

export const userData = (state: RootState) => state.message.userData

export const messages = (state: RootState) => state.message.messages