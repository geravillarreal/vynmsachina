import Image from 'next/image'
import React from 'react'
import styles from '../styles/Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.qr}>
          <Image
            src='/footer/qr.jpeg'
            width={120}
            height={120}
            alt=''
            objectFit='contain'
          />
          <span>扫码关注微信公众号</span>
        </div>
        <div className={styles.links}>
          <div className={styles.left}>
            <h3>关于我们</h3>
            <div className={styles.list}>
              <span>历史</span>
              <span>目标</span>
              <span>愿景</span>
              <span>价值观</span>
              <span>联系我们</span>
            </div>
          </div>
          <div className={styles.right}>
            <h3>
              我们的服务
            </h3>
            <div className={styles.list}>
              <span>现有厂房租售</span>
              <span>厂房订制</span>
            </div>
          </div>
        </div>
        <div className={styles.social}>
          <div className={styles.icon}>
            <Image alt='' src='/footer/linkedin.png' layout='fill' />
          </div>
          <div className={styles.icon}>
            <Image alt='' src='/footer/facebook.png' layout='fill' />
          </div>
          <div className={styles.icon}>
            <Image alt='' src='/footer/whatsapp.png' layout='fill' />
          </div>
          <div className={styles.icon}>
            <Image alt='' src='/footer/weixin.png' layout='fill' />
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2021 VYNMSA 版权所有隐私政策</span>
        </div>

      </div>

    </footer>
  )
}

export default Footer