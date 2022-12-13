import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'

const initialState = {
  connected: false,
  connection: null,
  address: null,
  defaultAccount: null,
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setConnected: (state, action) => {
      state.connected = true
      state.address = action.payload
    },
    setConnection: (state, action) => {
      state.connection = action.payload
    },
    disconnected: (state) => {
      state.connected = false
    },
    setAccount: (state, action) => {
      state.defaultAccount = action.payload
    },
  },
})

export const connectState = (state) => state.wallet.connected

export const getConnection = (state) => state.wallet.connection

export const {
  setConnected,
  setConnection,
  disconnected,
  setAccount,
} = walletSlice.actions

export default walletSlice.reducer
