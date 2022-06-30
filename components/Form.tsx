import React from 'react'
import styles from '../styles/Form.module.scss'
const Form = () => {
  return (
    <div className={styles.form}>
    <h2>联系我们</h2>

    <div className={styles.fields}>
      <div className={styles.group}>
        <input type="text" />
      </div>
      <div className={styles.group}>
        <input type="text" />
      </div>
      <div className={styles.group}>
        <input type="text" />
      </div>
      <div className={styles.group}>
        <select name="" id=""></select>
      </div>
      <div className={styles.group}>
        <textarea name="" id="" ></textarea>
      </div>

      <div className={styles.actions}>
        <button className='btn btn-green'>现在聊天</button>
        <button className='btn btn-green'>联系我们</button>
      </div>
    </div>

  </div>
  )
}

export default Form