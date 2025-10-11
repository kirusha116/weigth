import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { type RootState, type AppDispatch } from '../store/store'
import type { Storage } from '@/types/Storage'

export const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useGetStorage: () => Storage = () =>
  useAppSelector(state => state.storage)
