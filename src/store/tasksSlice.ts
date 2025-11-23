import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getList } from '@/utils/getList'
import type { TasksOrAward } from '@/types/TasksOrAwards'

export const getTasks = createAsyncThunk<TasksOrAward[]>(
  'storage/getTasks',
  async () => (await getList('tasks')) as TasksOrAward[],
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as TasksOrAward[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      return action.payload
      console.log(state)
    })
  },
})
