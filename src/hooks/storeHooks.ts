import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { type RootState, type AppDispatch } from '../store/store'
import type { TasksOrAward } from '@/types/TasksOrAwards'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useGetTasks: () => TasksOrAward[] = () =>
  useAppSelector(state => state.tasks)
export const useGetAwards: () => TasksOrAward[] = () =>
  useAppSelector(state => state.awards)
export const useGetBalance: () => number = () =>
  useAppSelector(state => state.balance.data)
