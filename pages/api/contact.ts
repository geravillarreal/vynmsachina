import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'

type Data = {
  ok: boolean
  message: string,
  status: string
}

var form = new FormData();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { nombre, correo, telefono, comentarios } = req.body
  form.append('nombre', nombre)
  form.append('telefono', telefono)
  form.append('correo', correo)
  form.append('comentarios', comentarios)


  if (req.method === 'POST') {
    try {
      await axios.post('http://www.vynmsachina.com/', form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      return res.json({
        ok: true,
        message: 'Sucesfully posted to form',
        status: 'Success'
      })

    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Failed to post form' + error,
        status: 'Error'
      })
    }

  }
}