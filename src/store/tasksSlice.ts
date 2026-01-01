import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { TasksOrAward } from '@/types/TasksOrAwards'

export const getTasks = createAsyncThunk<TasksOrAward[]>(
  'storage/getTasks',
  async () => {
    const getList = (await import('@/utils/getList')).getList
    return (await getList('tasks')) as TasksOrAward[]
  },
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as TasksOrAward[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
