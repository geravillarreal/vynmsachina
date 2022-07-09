import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Footer from './Footer'
import Nav from './Nav'

interface Props {
  children?: JSX.Element | JSX.Element[],
  title: string,
  description?: string,
  type?: string,
  image?: string
  keywords?: string
}

const Layout = ({ children, title, description = 'Líderes en productos y servicios de empaque y embalaje.', type, image = '/300x300.png', keywords = '' }: Props) => {

  const { asPath } = useRouter()

  return (
    <>
      <Head>
        <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
        <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
        <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
        <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
        <link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png' />
        <link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/apple-icon-144x144.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
        <link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#FFF' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#FFF' />
        <meta name='description' content={description} />
        <meta name="keywords" content={keywords} />
        {/* <meta property='og:url' content={`https://bonitoyquerido.com${asPath}`} /> */}
        <meta property='og:type' content={type} />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={image} />
        <meta property='og:image:alt' content='Logo de Vynmsa China.' />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content='Vynmsa China' />
        <meta property='og:locale' content='es_MX' />
        <title>{`Vynmsa China | ${title}`}</title>
      </Head>
      <Nav />
      <div className='mainContent'>
        {children}
      </div>
      <div className="qr">
        <div className="close">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <Image
          src='/home/qr.jpeg'
          width={100}
          height={100}
          objectFit='cover'
          alt=''
        />
      </div>
      <Footer />
    </>
  )
}

export default Layout
