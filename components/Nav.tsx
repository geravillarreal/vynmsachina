import Image from 'next/image'
import React from 'react'
import styles from '../styles/Nav.module.scss'

const Nav = () => {
  return (
    <nav className={styles.navWrapper}>
      <div className={styles.nav}>

        <div className={styles.logo}>

          <Image src='/logo-vynmsa.png' width={100} height={60} objectFit='contain' />

        </div>

        <div className={styles.links}>

        </div>

        <div className={styles.menu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

      </div>

    </nav>
  )
}

export default Nav