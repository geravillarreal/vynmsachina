import React from 'react'
import styles from '../styles/Form.module.scss'
const Form = () => {
  return (
    <div className={styles.form}>
      <div className="underlined">
        <h2>联系我们</h2>
      </div>

      <div className={styles.fields}>
        <div className={styles.group}>
          <input placeholder='请输入您的姓名' type="text" />
        </div>
        <div className={styles.group}>
          <input placeholder='请输入您的电话' type="text" />
        </div>
        <div className={styles.group}>
          <input placeholder='请输入您的电话' type="text" />
        </div>
        <div className={styles.group}>
          <select name="" id=""></select>
        </div>
        <div className={styles.group}>
          <textarea placeholder='我们可以怎样帮助您?' name="" id="" ></textarea>
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