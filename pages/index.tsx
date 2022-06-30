import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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

      </div>
      <div className={styles.services}>

        <h2>您对什么感兴趣?</h2>

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
            <button>现在聊天</button>
            <button>联系我们</button>
          </div>
        </div>

      </div>
      <div className={styles.sliderWrapper}>

        <div className={styles.slider}>

        </div>

        <div className={styles.content}>
          <h2>关于我们</h2>
          <span>总部位于新莱昂州蒙特雷的VYNMSA (秉厦) 工业建筑开发有限责任公司成立于1994年, 27年以来为全球顶尖客户交付了400多个项目, 在墨西哥建有23多个工业园区, 引领着墨西哥工业房地产行业的发展。</span>
        </div>

      </div>

      <div className={styles.videoWrapper}>

        <Image
          objectFit='cover'
          src='/home/video-bg.jpeg'
          layout='fill'
        />

        <div className={styles.content}>
          <span>VYNMSA始终视工业房地产市场最高标准为目标, 为客户建设超出其预期和需求的3A工业设施</span>

          <video src=""></video>
        </div>

      </div>

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
    </Layout>
  )
}

export default Home
