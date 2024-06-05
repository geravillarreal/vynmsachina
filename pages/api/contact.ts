import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

type Data = {
  message: string,
  status: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { nombre, correo, telefono, comentarios, tipo } = req.body

  if (req.method === 'POST') {
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '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')
    const msg = {
      personalizations: [
        {
          "to": [
            {
              "email": "lchen@vynmsa.com"
            },
            {
              "email": "nancy@daoheagency.com"
            },
          ],
          "bcc": [
            {
              "email": "gerardovillarreal3a@hotmail.com"
            }
          ]
        }
      ],
      from: 'no-reply@vynmsachina.com',
      subject: 'Nueva solicitud de contacto',
      text:
        `Recibiste una nueva solicitud de contacto \n 
      Nombre: ${nombre}\n 
      Correo electrónico: ${correo}\n
      Tipo: ${tipo}\n
      Telefono: ${telefono}\n
      Mensaje: ${comentarios}\n`,
    }
    return sgMail
      .send(msg)
      .then(() => {
        return res.status(200).json({ status: 'ok', message: 'Email sent' })
      })
      .catch((error: any) => {
        return res.status(500).json({ status: 'error', message: error })
      })
  }
}
