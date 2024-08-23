import Image from "next/legacy/image"
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerTriangle}></div>
      <div className={styles.footer}>
        <div className={styles.qr}>
          <Image
            src='/footer/logo-vynmsa.png'
            width={197}
            height={47}
            alt=''
            objectFit='contain'
          />
          <Image
            src='/footer/qr-footer.png'
            width={150}
            height={150}
            alt=''
            objectFit='contain'
          />
        </div>
        <div className={styles.links}>
          <div className={styles.left}>
            <h3>关于我们</h3>
            <div className={styles.list}>
              <Link href='/about-us'>历史</Link>
              <Link href='/about-us'>目标</Link>
              <Link href='/about-us'>愿景</Link>
              <Link href='/about-us'>价值观</Link>
              <Link href='/contact-us'>联系我们</Link>
            </div>
          </div>
          <div className={styles.center}>
            <h3>
              我们的服务
            </h3>
            <div className={styles.list}>
              <Link href='/our-services'>现有厂房租售</Link>
              <Link href='/our-services'>厂房订制</Link>
            </div>
          </div>
          <div className={styles.right}>
            <h3>
              跟着我们
            </h3>
            <div className={styles.social}>
              <a href='https://www.linkedin.com/company/vynmsa/' rel='noreferrer noopener' target='_blank' className={styles.icon}>
                <Image alt='' src='/footer/linkedin.png' layout='fill' />
              </a>
              <a href='https://api.whatsapp.com/send?phone=528122028599' rel='noreferrer noopener' target='_blank' className={styles.icon}>
                <Image alt='' src='/footer/whatsapp.png' layout='fill' />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} VYNMSA 版权所有 <a target='_blank' href="/privacy-policy.pdf">隐私政策</a> REIT PROPIEDADES INDUSTRIALES, S-DE R.L. DE C.V.</span>
      </div>
    </footer>
  );
}

export default Footer