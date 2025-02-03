import { TInitialState } from "./types"

export const userData = (state: any) => (state.message as TInitialState).userData

export const messages = (state: any) => (state.message as TInitialState).messages