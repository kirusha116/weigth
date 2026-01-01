import { auth, db } from '@/firebase'
import { getDate } from '@/utils/getDate'
import getLast from '@/utils/getLast'
import successToast from '@/utils/successToast'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { doc, setDoc } from 'firebase/firestore'

export type BalanceType = { data: number; timestamp: number }

const updateBalance = (state: BalanceType, action: PayloadAction<number>) => {
  const prev = state as BalanceType
  const updatedBalance: BalanceType = {
    timestamp: Date.now(),
    data: prev.data + action.payload,
  }
  upload(updatedBalance)
  return updatedBalance
}

export const getBalance = createAsyncThunk<BalanceType>(
  'storage/getBalance',
  async () => {
    const responce = (await getLast('balance')) as BalanceType
    if (responce === undefined)
      return updateBalance(
        { data: 0 } as BalanceType,
        { payload: 0 } as PayloadAction<number>,
      )
    return responce
  },
)

const upload = async (updatedBalance: BalanceType) => {
  if (auth.currentUser)
    await setDoc(
      doc(
        db,
        `${auth.currentUser.uid}_new/balance/balance`,
        getDate(updatedBalance.timestamp),
      ),
      updatedBalance,
    )
}

export const balanceSlice = createSlice({
  name: 'balance',
  initialState: {} as BalanceType,
  reducers: {
    updateBalance: (state: BalanceType, action: PayloadAction<number>) => {
      updateBalance(state, action)
      if (action.payload > 0) successToast(`Молодец +${action.payload}`)
    },
  },
  extraReducers(builder) {
    builder.addCase(getBalance.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
