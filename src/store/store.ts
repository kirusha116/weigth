import { getStorage, saveStorage } from '@/utils/workWithStorage'
import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

const storageSlice = createSlice({
  name: 'storage',
  initialState: getStorage(),
  reducers: {
    handleSave: (state, action: PayloadAction<Partial<Storage>>) => {
      const newStorage = { ...state, ...action.payload }
      saveStorage(newStorage)
      return newStorage
    },
  },
})

export const { handleSave } = storageSlice.actions

export const store = configureStore({
  reducer: { storage: storageSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
