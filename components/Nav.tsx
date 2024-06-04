import Image from "next/legacy/image"
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../styles/Nav.module.scss'

const Nav = () => {

  const links = [
    {
      title: '首页',
      path: '/'
    },
    {
      title: '关于我们',
      path: '/about-us'
    },
    {
      title: '我们的服务',
      path: '/our-services'
    },
    {
      title: '诚招代理',
      path: '/broker-friendly'
    },
    {
      title: '可用厂房',
      path: '/inventory'
    },
    {
      title: '博客',
      path: '/blog'
    },
    {
      title: '联系我们',
      path: '/contact-us'
    },
  ]

  const [visible, setVisible] = useState(false)

  const { asPath } = useRouter()

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.nav}>

        <Link href='/' className={styles.logo}>

          <Image
            src='/logo-vynmsa.png'
            layout='fill'
            objectFit='contain'
            alt=''
            quality={100}
          />

        </Link>

        <div className={styles.links}>
          {
            links.map(link => (
              <Link
                /*  */
                href={link.path}
                key={link.title}
                onClick={() => {
                  setVisible(false)
                }}
                style={{
                  color: asPath === link.path ? '#007d64' : undefined
                }}
                className={asPath === link.path ? styles.active : undefined}>
                {link.title}
              </Link>
            ))
          }
        </div>

        <div
          onClick={() => {
            setVisible(!visible)
          }}
          className={styles.menu}>
          {
            !visible ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        </div>
        {
          visible &&
          <div className={styles.menuMobile}>
            {
              links.map(link => (
                <Link
                  /* onClick={() => {
                    setVisible(false)
                  }} */
                  href={link.path}
                  key={link.title}
                  style={{
                    color: asPath === link.path ? '#007d64' : undefined
                  }}>
                  {link.title}
                </Link>
              ))
            }
          </div>
        }
      </div>
    </nav>
  );
}

export default Nav