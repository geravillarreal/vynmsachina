import Image from 'next/legacy/image';
import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import Header from '../components/Header';
import Layout from '../components/Layout';
import Slider from '../components/Slider';
import styles from '../styles/AvailableWorkshops.module.scss';

// Importa el store directamente (no usamos el API aquí)
import { readInventory } from '../lib/inventory.store';

// Tipos mínimos (si ya tienes tipos, usa los tuyos)
type Region = { id: string; name: string };
type City = { id: string; name: string; regionId: string };
type LocationItemSection = { title: string; list: string[] };
type Location = {
  id: string;
  name: string;
  cityId: string;
  title?: string;
  mapTitle?: string;
  description?: string;
  notes?: string;
  image?: string;
  mapImage?: string;
  sliderImages?: string[];
  brochure?: string; // '/uploads/pdf/archivo.pdf' o solo 'archivo.pdf'
  items?: LocationItemSection[];
};
type InventoryData = { regions: Region[]; cities: City[]; locations: Location[] };

export const getServerSideProps: GetServerSideProps<{ inventory: InventoryData }> = async () => {
  try {
    const inventory = readInventory(); // lee lib/inventory.json
    return { props: { inventory } };
  } catch {
    return { props: { inventory: { regions: [], cities: [], locations: [] } } };
  }
};

function resolveInitialCity(cities: City[], regionId?: string): City | undefined {
  if (!cities.length) return undefined;
  if (regionId) {
    const firstInRegion = cities.find((c) => c.regionId === regionId);
    if (firstInRegion) return firstInRegion;
  }
  return cities[0];
}

function resolveInitialLocation(locations: Location[], cityId?: string): Location | undefined {
  if (!locations.length) return undefined;
  if (cityId) {
    const firstInCity = locations.find((l) => l.cityId === cityId);
    if (firstInCity) return firstInCity;
  }
  return locations[0];
}

export default function AvailableWorkshops(
  { inventory }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { regions, cities, locations } = inventory;

  const initialRegion = regions[0];
  const initialCity = resolveInitialCity(cities, initialRegion?.id);
  const initialLocation = resolveInitialLocation(locations, initialCity?.id);

  const [currentRegion, setCurrentRegion] = useState<Region | undefined>(initialRegion);
  const [currentCity, setCurrentCity] = useState<City | undefined>(initialCity);
  const [currentLocation, setCurrentLocation] = useState<Location | undefined>(initialLocation);

  const citiesOfRegion = useMemo(
    () => cities.filter((c) => (currentRegion ? c.regionId === currentRegion.id : true)),
    [cities, currentRegion]
  );
  const locationsOfCity = useMemo(
    () => locations.filter((l) => (currentCity ? l.cityId === currentCity.id : true)),
    [locations, currentCity]
  );

  const headerImage = currentLocation?.image ?? '/available-workshops/header.jpeg';
  const brochureHref = currentLocation?.brochure
    ? (currentLocation.brochure.startsWith('/') ? currentLocation.brochure : `/pdf/${currentLocation.brochure}`)
    : undefined;

  return (
    <Layout title="可用厂房">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      {currentLocation ? (
        <Header mobileImage={headerImage} webImage={headerImage} />
      ) : <></>}

      <div className={styles.content}>
        <h2>秉厦工业园所在位置</h2>

        {/* Tabs de regiones */}
        <div className={styles.tabs}>
          {regions.map((region) => (
            <div
              key={region.id}
              onClick={() => {
                setCurrentRegion(region);
                const nextCity = resolveInitialCity(cities, region.id);
                setCurrentCity(nextCity);
                const nextLoc = resolveInitialLocation(locations, nextCity?.id);
                setCurrentLocation(nextLoc);
              }}
              className={currentRegion?.id === region.id ? `${styles.tab} ${styles.active}` : styles.tab}
            >
              <span>{region.name}</span>
            </div>
          ))}
        </div>

        {/* Ciudades por región */}
        <div className={styles.cities}>
          {citiesOfRegion.map((city) => (
            <div key={city.id} className={styles.city}>
              <div
                onClick={() => {
                  setCurrentCity(city);
                  const nextLoc = resolveInitialLocation(locations, city.id);
                  setCurrentLocation(nextLoc);
                }}
                className={city.id === currentCity?.id ? `${styles.green} ${styles.greenActive}` : styles.green}
              >
                <span>{city.name}</span>
              </div>

              {currentCity?.id === city.id ? (
                <div className={styles.locations}>
                  {locations
                    .filter((loc) => loc.cityId === currentCity.id)
                    .map((location) => (
                      <span
                        onClick={() => setCurrentLocation(location)}
                        key={location.id || location.name}
                      >
                        {location.name}
                      </span>
                    ))}
                </div>
              ) : <></>}
            </div>
          ))}
        </div>

        {/* Lista web de locations (misma ciudad) */}
        {currentCity?.id ? (
          <div className={styles.locationsWeb}>
            {locationsOfCity.map((location) => (
              <span
                onClick={() => setCurrentLocation(location)}
                key={location.id || location.name}
              >
                {location.name}
              </span>
            ))}
          </div>
        ) : <></>}
      </div>

      {/* Panel de ubicación actual */}
      {currentLocation ? (
        <div className={styles.currentLocation}>
          <div className={styles.map}>
            <div className={styles.mapTitle}>
              <span>{currentLocation.mapTitle}</span>
            </div>
            <Image
              src={currentLocation.mapImage || '/available-workshops/header.jpeg'}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className={styles.locationContent}>
            <div className={styles.description}>
              {currentLocation.description}
            </div>

            <div className={styles.slider}>
              <Slider
                style={{ width: '100%' }}
                images={currentLocation.sliderImages || []}
              />
            </div>

            <div className={styles.title}>
              <h3>{currentLocation.title}</h3>
            </div>

            <div className={styles.items}>
              {currentLocation.items?.map((item) => (
                <div key={item.title}>
                  <h4>{item.title}</h4>
                  <ul>
                    {item.list.map((li) => (
                      <li key={li}><span>{li}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {brochureHref ? (
            <div className={styles.brochure}>
              <a target="_blank" rel="noreferrer" href={brochureHref}>
                <div className={styles.pdfIcon}>
                  <Image
                    src="/pdf/pdf icon.png"
                    alt="PDF ICON"
                    width={35}
                    height={30}
                  />
                  <span>下载PDF, 了解更多信息</span>
                </div>
              </a>
            </div>
          ) : <></>}

          {currentLocation.notes ? (
            <div className={styles.notes}>
              <span>{currentLocation.notes}</span>
            </div>
          ) : <></>}
        </div>
      ) : <></>}
    </Layout>
  );
}
