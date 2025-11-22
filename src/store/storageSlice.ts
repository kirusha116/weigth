import type { Storage } from '@/types/Storage'
import { getStorage } from '@/utils/getStorage'
import { emptyStorage } from '@/utils/getTemplStorage'
import { saveStorage } from '@/utils/saveStorage'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const initialState = createAsyncThunk<Storage>(
  'storage/initialState',
  async () => (await getStorage()) as Storage,
)

export const storageSlice = createSlice({
  name: 'storage',
  initialState: emptyStorage,
  reducers: {
    handleSave: (state: Storage, action: PayloadAction<Partial<Storage>>) => {
      const newStorage = { ...state, ...action.payload }
      saveStorage(newStorage)
      return newStorage
    },
  },
  extraReducers(builder) {
    builder.addCase(initialState.fulfilled, (state, action) => {
      return action.payload
      console.log(state)
    })
  },
})
