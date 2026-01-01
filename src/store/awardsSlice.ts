import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { TasksOrAward } from '@/types/TasksOrAwards'

export const getAwards = createAsyncThunk<TasksOrAward[]>(
  'storage/getAwards',
  async () => {
    const getList = (await import('@/utils/getList')).getList
    return (await getList('awards')) as TasksOrAward[]
  },
)

export const awardsSlice = createSlice({
  name: 'awards',
  initialState: [] as TasksOrAward[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAwards.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
