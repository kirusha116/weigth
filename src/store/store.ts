import { configureStore } from '@reduxjs/toolkit'
import { tasksSlice } from './tasksSlice'
import { awardsSlice } from './awardsSlice'
import { balanceSlice } from './balanceSlice'

export const { updateBalance } = balanceSlice.actions

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    awards: awardsSlice.reducer,
    balance: balanceSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
