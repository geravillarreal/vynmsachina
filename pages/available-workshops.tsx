import Image from 'next/image'
import React, { useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Slider from '../components/Slider'
import { cities, locations, regions } from '../lib/data'
import styles from '../styles/AvailableWorkshops.module.scss'

const AvailableWorkshops = () => {

  const [currentRegion, setCurrentRegion] = useState(regions[0])

  const [currentCity, setCurrentCity] = useState(cities[0])

  const [currentLocation, setCurrentLocation] = useState(locations[0])

  console.log(currentLocation);

  return (
    <Layout title=''>

      <Header
        mobileImage='/available-workshops/header.jpeg'
        webImage='/available-workshops/header.jpeg'
      />

      <div className={styles.content}>
        <h2>秉厦工业园所在位置</h2>

        <div className={styles.tabs}>

          {
            regions.map(region => (
              <div
                key={region.id}
                onClick={() => {
                  setCurrentRegion(region)
                  setCurrentCity(cities.find(city => city.regionId === region.id) as any)
                }}
                className={currentRegion.id === region.id ? `${styles.tab} ${styles.active}` : styles.tab}>
                <span>{region.name}</span>
              </div>
            ))
          }
        </div>

        <div className={styles.cities}>
          {
            cities.filter(city => city.regionId === currentRegion.id).map(city => (
              <div key={city.name} className={styles.city}>
                <div
                  onClick={() => {
                    setCurrentCity(city)
                  }}
                  className={
                    city.id === currentCity.id ? `${styles.green} ${styles.greenActive}` : styles.green
                  }>
                  <span>{city.name}</span>
                </div>
                {
                  currentCity.id === city.id &&
                  <div className={styles.locations}>
                    {
                      locations.filter(loc => loc.cityId === currentCity.id).map(location => (
                        <span
                          onClick={() => {
                            setCurrentLocation(location)
                          }}
                          key={location.name}>{location.name}</span>
                      ))
                    }
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>

      <div className={styles.currentLocation}>
        <div className={styles.map}>
          <div className={styles.mapTitle}>
            <span>{currentLocation.mapTitle}</span>
          </div>
          <Image
            src={currentLocation.mapImage || '/available-workshops/header.jpeg'}
            alt=''
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className={styles.locationContent}>
          <div className={styles.description}>
            {
              currentLocation.description
            }
          </div>
          <div className={styles.slider}>
            <Slider
              style={{
                width: '100%'
              }}
              images={[
                '/about-us/intro/slide-1.jpeg',
                '/about-us/intro/slide-2.jpeg',
              ]}
            />
          </div>
          <div className={styles.title}>
            <h3>{currentLocation.title}</h3>
          </div>
          <div className={styles.items}>
            {
              currentLocation.items?.map(item => (
                <div key={item.title}>
                  <h4>{item.title}</h4>
                  {
                    item.list.map(li => (
                      <span key={li}>{li}</span>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AvailableWorkshops