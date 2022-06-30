import Image from 'next/image'
import React from 'react'
import styles from '../styles/Companies.module.scss'

const Companies = () => {
  return (
    <div className={styles.companies}>
      <div className={styles.companiesHeader}>
        <h2>满意的客户</h2>
      </div>
      <div className={styles.countries}>
        <div className={styles.image}>
          <Image
            objectFit='contain'
            alt=''
            src='/home/countries.png'
            layout='fill'
          />
        </div>
        <span>向国内外顶级客户成功交付超过400个重大项目</span>
      </div>
      <div className={styles.companiesSlider}>
      </div>
    </div>
  )
}

export default Companies