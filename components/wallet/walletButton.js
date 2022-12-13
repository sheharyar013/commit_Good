import { Connection, clusterApiUrl } from '@solana/web3.js'
import React, { useCallback } from 'react'
import {
  connectState,
  disconnected,
  setConnected,
  setConnection,
} from './walletSlice'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { PhantomIcon } from '../../utils/images'

export default function WalletButton() {
  const connected = useSelector(connectState)
  const dispatch = useDispatch()

  const connectWallet = useCallback(
    async (e) => {
      e.preventDefault()
      if (connected) {
        return
      }

      if (!Object.prototype.hasOwnProperty.call(window, 'solana')) {
        toast.error('Please install Phantom wallet extension')
        return
      }
      // if (!window.solana.isSolflare) {
      //   return;
      // }

      const wallet = window.solana

      wallet.on('connect', (address) => {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        dispatch(setConnection(connection))

        setTimeout(() => {
          dispatch(setConnected(address.toString()))
          toast.success('Wallet Connected', {
            hideProgressBar: true,
          })
        }, 150)
      })

      wallet.on('disconnect', () => {
        dispatch(disconnected())
      })

      await wallet.connect()
    },
    [connected, dispatch],
  )

  return (
    <button type="button" onClick={connectWallet}>
      <span>{connected ? 'Connected' : 'Phantom'}</span>
      <span>
        <img src={PhantomIcon} alt="" />
      </span>
    </button>
  )
}
