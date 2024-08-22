import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/legacy/image"
import Companies from '../components/Companies'
import Form from '../components/Form'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link'


const Home: NextPage = () => {

  const services = [
    {
      name: "工业园区位置",
      image: '/home/service-1.svg',
      path: '/inventory'
    },
    {
      name: "定制厂房解决方案",
      image: '/home/service-2.svg',
      path: '/inventory'
    },
    {
      name: "服务范畴",
      image: '/home/service-3.svg',
      path: '/our-services'
    },
    {
      name: "标准厂房出售",
      image: '/home/service-4.svg',
      path: '/inventory'
    },
    {
      name: "诚招代理",
      image: '/home/service-5.svg',
      path: '/broker-friendly'
    },
    {
      name: "关于我们",
      image: '/home/service-6.svg',
      path: '/contact-us'
    },

  ]

  const swiper = useSwiper()

  return (
    <Layout title='首页'>
      <div className={styles.header}>

        <div className={styles.content}>
          <h1>墨西哥工业房地产</h1>
          <h2>租赁 · 销售 · 定制</h2>
          
          <Link href='/contact-us'>
            <button className='btn btn-green'>联系我们</button>
          </Link>
        </div>

        <Image
          alt=''
          objectFit='cover'
          layout='fill'
          src='/home/home-header.png'
        />

      </div>
      <div className={styles.services}>

        <div className={styles.title}>
          <h2>您对什么感兴趣?</h2>
        </div>

        <div className={styles.grid}>

          {
            services.map(service => (
              (<Link key={service.name} href={service.path} className={styles.item}>

                <div className={styles.image}>
                  <Image width={55} height={55} alt='' objectFit='contain' src={service.image} />
                </div>
                <span>{service.name}</span>

              </Link>)
            ))
          }

        </div>

      </div>
      <div className={styles.wave2}>

      </div>
      <div className="form-container">

        <div className="map">
          <Image
            objectFit='cover'
            src='/home/map.png'
            layout='fill'
            alt=''
          />
        </div>
        <Form />
      </div>
      <div className={styles.sliderWrapper}>

        <div className={styles.sliderOutter}>
          <div className={styles.sliderInner}>
            <div className={styles.sliderInner2}>
              <Swiper
                navigation
                className='home-swiper'
                loop
                autoplay={{
                  disableOnInteraction: false
                }}
                spaceBetween={100}
                slidesPerView={1}
                modules={[Autoplay, Navigation]}
              >
                <SwiperSlide>
                  <div className={styles.image}>
                    <Image
                      objectFit='cover'
                      alt=''
                      layout='fill'
                      src='/home/slider/slide-1.jpeg'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles.image}>
                    <Image
                      objectFit='cover'
                      alt=''
                      layout='fill'
                      src='/home/slider/slide-2.jpeg'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles.image}>
                    <Image
                      objectFit='cover'
                      alt=''
                      layout='fill'
                      src='/home/slider/slide-3.jpeg'
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>


        <div className={styles.content}>
          <div className="underlined">
            <h2>关于我们</h2>
          </div>
          <span>总部位于新莱昂州蒙特雷的VYNMSA (秉厦) 工业建筑开发有限责任公司成立于1994年, 30年以来为全球顶尖客户交付了500多个项目, 在墨西哥建有26多个工业园区, 引领着墨西哥工业房地产行业的发展</span>
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
            <iframe src="//player.bilibili.com/player.html?aid=635245342&bvid=BV1Kb4y1e7wD&cid=471486947&page=1" scrolling="no"> </iframe>
          </div>
        </div>
      </div>
      <Companies />
    </Layout>
  );
}

export default Home
