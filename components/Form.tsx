import axios from 'axios'
import React, { FormEvent, useRef, useState } from 'react'
import styles from '../styles/Form.module.scss'
const Form = () => {

  const formRef = useRef<any>()

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    comentarios: ''
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await axios.post('/api/contact', form)
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
      <form ref={formRef} onSubmit={handleSubmit} className={styles.fields}>
        <div className={styles.col1}>
          <div className={styles.group}>
            <input onChange={(e) => {
              setForm({
                ...form,
                nombre: e.target.value
              })
            }} value={form.nombre} name='nombre' placeholder='请输入您的姓名' type="text" />
          </div>
          <div className={styles.group}>
            <input onChange={(e) => {
              setForm({
                ...form,
                correo: e.target.value
              })
            }} value={form.correo} name='correo' placeholder='请输入您的电话' type="email" />
          </div>
          <div className={styles.group}>
            <input onChange={(e) => {
              setForm({
                ...form,
                telefono: e.target.value
              })
            }} value={form.telefono} name='telefono' placeholder='请输入您的电话' type="text" />
          </div>
          <div className={styles.group}>
            <select className='input' defaultValue='0' name="" id="">
              <option disabled value="0">请选择您的身份</option>
              <option value="1">经纪人</option>
              <option value="2">投资者</option>
              <option value="4">供应商</option>
            </select>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.group}>
            <textarea onChange={(e) => {
              setForm({
                ...form,
                comentarios: e.target.value
              })
            }} value={form.comentarios} placeholder='我们可以怎样帮助您?' name="comentarios" id="" ></textarea>
          </div>
        </div>
        <div className={styles.actions}>
          <button type='button' className='btn btn-green'>现在聊天</button>
          <button className='btn btn-green'>联系我们</button>
        </div>
      </form>
    </div>
  )
}

export default Form