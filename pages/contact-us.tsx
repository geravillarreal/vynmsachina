import Image from 'next/image'
import React from 'react'
import Form from '../components/Form'
import Header from '../components/Header'
import Layout from '../components/Layout'
import styles from '../styles/Contact.module.scss'

const ContactUs = () => {
  return (
    <Layout title='联系我们'>
      <Header
        mobileImage='/available-workshops/header.jpeg'
        webImage='/available-workshops/header.jpeg'
      />
      <div className={styles.section1}>
        <Form />
        <div
          className={styles.image}
          style={{
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
      </div>

      <div className={styles.quote}>
        <div className={styles.quotation1}>
          <Image alt='' src='/contact-us/quotation-1.png' width={50} height={50} objectFit='contain' />
        </div>
        <div className={styles.top}>
          <span>欢迎您和您的团队随时与我们联系，我们将提供给您最细致的服务</span>
        </div>
        <div className={styles.quotation2}>
          <Image alt='' src='/contact-us/quotation-2.png' width={50} height={50} objectFit='contain' />
        </div>
        <div className={styles.bottom}>
          <span>30年作为顶尖的工业地产开发集团，秉厦33个工业园区分布于墨西哥东北部和中部最具优势的 5个州，为制造、出口、物流、本地贸易企业和希望在墨境内寻找厂房或仓储空间的境外投资者提供最佳位置。</span>
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