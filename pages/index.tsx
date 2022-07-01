import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Companies from '../components/Companies'
import Form from '../components/Form'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {

  const services = [
    {
      name: "工业园区位置",
      image: '/home/service-1.png'
    },
    {
      name: "定制厂房解决方案",
      image: '/home/service-2.png'
    },
    {
      name: "服务范畴",
      image: '/home/service-3.png'
    },
    {
      name: "标准厂房出售",
      image: '/home/service-4.png'
    },
    {
      name: "诚招代理",
      image: '/home/service-5.png'
    },
    {
      name: "关于我们",
      image: '/home/service-6.png'
    },

  ]

  return (
    <Layout title=''>
      <div className={styles.header}>

        <div className={styles.content}>
          <h1>墨西哥工业房地产</h1>
          <h2>租赁 · 销售 · 定制</h2>
          <span>联系我们</span>
        </div>

        <Image
          alt=''
          objectFit='cover'
          layout='fill'
          src='/home/home-header.jpeg'
        />

        <div className={styles.wave1}>

        </div>

      </div>
      <div className={styles.services}>

        <div className='underlined'>
          <h2>您对什么感兴趣?</h2>
        </div>

        <div className={styles.grid}>

          {
            services.map(service => (
              <div key={service.name} className={styles.item}>
                <Image width={80} height={80} alt='' objectFit='contain' src={service.image} />
                <span>{service.name}</span>
              </div>
            ))
          }

        </div>

      </div>
      <div className={styles.wave2}>
        
      </div>
      <Form />
      <div className={styles.sliderWrapper}>

        <div className={styles.slider}>

        </div>

        <div className={styles.content}>
          <div className="underlined">
            <h2>关于我们</h2>
          </div>
          <span>总部位于新莱昂州蒙特雷的VYNMSA (秉厦) 工业建筑开发有限责任公司成立于1994年, 27年以来为全球顶尖客户交付了400多个项目, 在墨西哥建有23多个工业园区, 引领着墨西哥工业房地产行业的发展。</span>
        </div>
      </div>

      <div className={styles.videoWrapper}>
        <Image
          objectFit='cover'
          src='/home/video-bg.jpeg'
          layout='fill'
          alt=''
        />
        <div className={styles.content}>
          <span>VYNMSA始终视工业房地产市场最高标准为目标, 为客户建设超出其预期和需求的3A工业设施</span>
          <div className={styles.video}>
            <video autoPlay loop playsInline muted src="/home/video1.mp4"></video>
          </div>
        </div>
      </div>
      <Companies />
    </Layout>
  )
}

export default Home
