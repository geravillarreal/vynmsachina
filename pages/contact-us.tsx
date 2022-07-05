import Image from 'next/image'
import React from 'react'
import Form from '../components/Form'
import Layout from '../components/Layout'
import styles from '../styles/Contact.module.scss'

const ContactUs = () => {
  return (
    <Layout title='Contact us'>

      <div className='header'>
        <Image
          objectFit='cover'
          layout='fill'
          alt=''
          src='/contact-us/contact-header.jpeg' />
        <div className="wave1"></div>
      </div>
      <Form />
      <div style={{
        padding: 20
      }}>
        <div

          className="green-border-bottom-right">
          <Image
            alt=''
            objectFit='cover'
            layout='fill'
            src='/contact-us/image-1.jpeg' />
        </div>
      </div>

      <div className={styles.quote}>
        <div className={styles.top}>
          <span>您可以与我们联系并获得VYNMSA公司的详细信息，您将了解为什么我们是您在墨西哥业务运营的最佳选择。</span>
          <span>联系我们，我们将超越您的期望!</span>
        </div>
        <div className={styles.bottom}>
          <span>30年作为顶尖的工业地产开发集团，秉厦23个工业园区分布于墨西哥东北部和中部最具优势的 5个州，为制造、出口、物流、本地贸易企业和希望在墨境内寻找厂房或仓储空间的境外投资者提供最佳位置。</span>
        </div>
        <div className="green-border-top-left">
          <Image
            alt=''
            objectFit='cover'
            layout='fill'
            src='/contact-us/image-2.jpeg' />
        </div>
      </div>

    </Layout>
  )
}

export default ContactUs