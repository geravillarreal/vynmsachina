import Image from 'next/image'
import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../styles/Slider.module.scss'
import 'swiper/css/scrollbar';
import 'swiper/css';
import { Scrollbar } from 'swiper';

interface Props {
  images: string[]
}


const Slider: FC<Props> = ({ images }) => {
  return (
    <div className={styles.slider}>
      <Swiper
        scrollbar
        modules={[Scrollbar]}
        slidesPerView='auto'
        className='about-us-slider'
      >

        {
          images.map(image => (
            <SwiperSlide key={image}>
              <div className={styles.slide}>
                <Image
                  alt=''
                  objectFit='cover'
                  layout='fill'
                  src={image} />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default Slider