import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { TaskOrAward } from '@/types/TaskOrAwards'
import { getList } from '@/utils/getList'

export const getAwards = createAsyncThunk<TaskOrAward[]>(
  'storage/getAwards',
  async () => (await getList('awards')) as TaskOrAward[],
)

export const awardsSlice = createSlice({
  name: 'awards',
  initialState: [] as TaskOrAward[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAwards.fulfilled, (state, action) => {
      return action.payload
      console.log(state)
    })
  },
})
