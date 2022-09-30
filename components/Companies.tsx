import Image from 'next/image'
import React from 'react'
import styles from '../styles/Companies.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const Companies = () => {

  const images = [
    '/companies/lg.png',
    '/companies/lego.png',
    '/companies/siemens.png',
    '/companies/fontanna.png',
    '/companies/kwang.png',
    '/companies/hanwha.png',
    '/companies/eaton.png',
    '/companies/ishimitsu.png',
    '/companies/loreal.png',
    '/companies/asiaway.png',
    '/companies/hwaseung.png',
    '/companies/gm.png',
    '/companies/dhl.png',
  ]

  return (
    <div className={styles.companiesWrapper}>
      <div className={styles.companiesHeader}>
        <h2>满意的客户</h2>
      </div>
      <div className={styles.companies}>
        <div className={styles.countries}>
          <div className={styles.image}>
            <Image
              objectFit='contain'
              alt=''
              src='/home/countries.png'
              layout='fill'
            />
          </div>
          <div className={styles.imageGreen}>
            <Image
              objectFit='cover'
              alt=''
              src='/home/countries-green.png'
              layout='fill'
            />
          </div>
          <span>向国内外顶级客户成功交付超过450个重大项目</span>
        </div>
        <div className={styles.companiesSlider}>
          <Swiper
            loop
            autoplay={{
              disableOnInteraction: false
            }}
            spaceBetween={50}
            slidesPerView={3}
            modules={[Autoplay]}
          >
            {
              images.map(image => (
                <SwiperSlide key={image}>
                  <div className={styles.image}>
                    <Image
                      priority
                      objectFit='contain'
                      alt=''
                      layout='fill'
                      src={image}

                    />
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Companies