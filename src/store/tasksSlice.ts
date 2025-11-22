import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getList } from '@/utils/getList'
import type { TaskOrAward } from '@/types/TaskOrAwards'

export const getTasks = createAsyncThunk<TaskOrAward[]>(
  'storage/getTasks',
  async () => (await getList('tasks')) as TaskOrAward[],
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as TaskOrAward[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      return action.payload
      console.log(state)
    })
  },
})
