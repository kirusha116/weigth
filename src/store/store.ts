import { configureStore } from '@reduxjs/toolkit'
import { storageSlice } from './storageSlice'
import { tasksSlice } from './tasksSlice'
import { awardsSlice } from './awardsSlice'

export const { handleSave } = storageSlice.actions

export const store = configureStore({
  reducer: {
    storage: storageSlice.reducer,
    tasks: tasksSlice.reducer,
    awards: awardsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
