import { getStorage } from './getStorage'
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { saveStorage } from './saveStorage'
import type { Storage } from '@/types/Storage'
import { getEmptyStorage } from './getTemplStorage'

export const initialState = createAsyncThunk<Storage>(
  'storage/initialState',
  async () => await getStorage(),
)

const storageSlice = createSlice({
  name: 'storage',
  initialState: getEmptyStorage(),
  reducers: {
    handleSave: (state: Storage, action: PayloadAction<Partial<Storage>>) => {
      const newStorage = { ...state, ...action.payload }
      saveStorage(newStorage)
      return newStorage
    },
  },
  extraReducers(builder) {
    builder.addCase(initialState.fulfilled, (state, action) => {
      state = action.payload
      console.log(state)
    })
  },
})

export const { handleSave } = storageSlice.actions

export const store = configureStore({
  reducer: { storage: storageSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
