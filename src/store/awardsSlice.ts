import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { TasksOrAward } from '@/types/TasksOrAwards'
import { getList } from '@/utils/getList'

export const getAwards = createAsyncThunk<TasksOrAward[]>(
  'storage/getAwards',
  async () => (await getList('awards')) as TasksOrAward[],
)

export const awardsSlice = createSlice({
  name: 'awards',
  initialState: [] as TasksOrAward[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAwards.fulfilled, (state, action) => {
      return action.payload
      console.log(state)
    })
  },
})
