import axios from 'axios'
import { SaveNftToDB } from '../../utils/services/actions/nft'

export const upload = async (data) => {
  const form = new FormData()
  form.append('image', data)
  const resp = await SaveNftToDB(form)
  return resp.data
}
export const tatumUpload = async (data) => {
  const form = new FormData()
  form.append('file', data)
  const resp = await fetch(`https://api-eu1.tatum.io/v3/ipfs`, {
    method: 'POST',
    headers: {
      'x-api-key': 'f9cac208-521f-4672-9111-80ea615b9787',
    },
    body: form,
  })
  return await resp.json()
}

export const getDataFromTatum = async (id) => {
  const resp = await fetch(id, {
    method: 'GET',
    headers: {
      'x-api-key': 'f9cac208-521f-4672-9111-80ea615b9787',
    },
  })

  return await resp.text()
}
