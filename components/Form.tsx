import axios from 'axios'
import React, { FormEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '../styles/Form.module.scss'

type FormData = {
  nombre: string
  correo: string
  telefono: string
  tipo: string
  comentarios: string
}

const Form = () => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (values: FormData) => {

    return console.log({ values })
    try {
      await axios.post('/api/contact', values)
      alert('Success')
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  return (
    <div className={styles.form}>
      <div className="underlined">
        <h2>联系我们</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.fields}>
        <div className={styles.col1}>
          <div className={styles.group}>
            <label htmlFor="">请输入您的姓名</label>
            <input
              {...register('nombre', {
                required: true
              })}
              placeholder='请输入您的姓名'
              type="text"
            />
            {
              errors.nombre && <span className="error">Required</span>
            }
          </div>
          <div className={styles.group}>
            <label htmlFor="">请输入您的邮箱</label>
            <input
              {...register('correo', {
                required: true
              })}
              placeholder='请输入您的邮箱'
              type="email"
            />
            {
              errors.correo && <span className="error">Required</span>
            }
          </div>
          <div className={styles.group}>
            <label htmlFor="">请输入您的电话</label>
            <input
              {...register('telefono', {
                required: true
              })}
              placeholder='请输入您的电话'
              type="text"
              inputMode='numeric'
            />
            {
              errors.telefono && <span className="error">Required</span>
            }
          </div>
          <div className={styles.group}>
            <label htmlFor="">请选择您的身份</label>
            <select
              {...register('tipo', {
                required: true
              })}
              className='input'>
              <option value="broker">经纪人</option>
              <option value="investor">投资者</option>
              <option value="supplier">供应商</option>
            </select>
            {
              errors.tipo && <span className="error">Required</span>
            }
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.group}>
            <label htmlFor="">我们可以怎样帮助您</label>
            <textarea
              {...register('comentarios', {
                required: true
              })}
              placeholder='我们可以怎样帮助您?'
            />
            {
              errors.comentarios && <span className="error">Required</span>
            }
          </div>
        </div>
        <div className={styles.actions}>
          <button className='btn btn-green'>联系我们</button>
        </div>
      </form>
    </div>
  )
}

export default Form