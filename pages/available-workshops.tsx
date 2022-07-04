import React, { useState } from 'react'
import Layout from '../components/Layout'
import { locations } from '../lib/locations'
import styles from '../styles/AvailableWorkshops.module.scss'

const AvailableWorkshops = () => {

  const [current, setCurrent] = useState('巴希奥地区')

  const [currentCity, setCurrentCity] = useState('瓜纳华托')

  console.log(currentCity);

  return (
    <Layout title=''>

      <div className='header'>
        <div className="wave1"></div>
      </div>

      <div className={styles.content}>
        <h2>秉厦工业园所在位置</h2>

        <div className={styles.tabs}>
          <div
            onClick={() => {
              setCurrent('巴希奥地区')
              setCurrentCity('瓜纳华托')
            }}
            className={current === '巴希奥地区' ? `${styles.tab} ${styles.active}` : styles.tab}>
            <span>{locations.巴希奥地区.name}</span>
          </div>
          <div
            onClick={() => {
              setCurrent('蒙特雷大都市区')
              setCurrentCity('新莱昂州')
            }}
            className={current === '蒙特雷大都市区' ? `${styles.tab} ${styles.active}` : styles.tab}>
            <span>{locations.蒙特雷大都市区.name}</span>
          </div>
        </div>

        <div className={styles.cities}>
          {
            current === '巴希奥地区' ?

              locations['巴希奥地区'].cities.map(city => (
                <div key={city.name} className={styles.city}>

                  <div
                    onClick={() => {
                      setCurrentCity(city.name)
                    }}
                    className={styles.green}>
                    <span>{city.name}</span>
                  </div>
                  {
                    city.name === currentCity &&
                    <div className={styles.locations}>
                      {
                        city.locations.map(location => (
                          <span key={location.name}>{location.name}</span>
                        ))
                      }
                    </div>
                  }
                </div>
              ))
              :
              locations['蒙特雷大都市区'].cities.map(city => (
                <div key={city.name} className={styles.city}>
                  <div
                    onClick={() => {
                      setCurrentCity(city.name)
                    }}
                    className={styles.green}>
                    <span>{city.name}</span>
                  </div>
                  {
                    city.name === currentCity &&
                    <div className={styles.locations}>
                      {
                        city.locations.map(location => (
                          <span key={location.name}>{location.name}</span>
                        ))
                      }
                    </div>
                  }
                </div>
              ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default AvailableWorkshops