import Image from "next/legacy/image"
import React, { FC } from 'react'

interface Props {
  webImage: string
  mobileImage: string
}

const Header: FC<Props> = ({ webImage, mobileImage }) => {
  return (
    <div
      className='header'>
      <div className="imageWeb">
        <Image
          alt=''
          objectFit='cover'
          layout='fill'
          src={webImage}
        />
      </div>
      <div className="imageMobile">
        <Image
          alt=''
          objectFit='cover'
          layout='fill'
          src={mobileImage}
        />
      </div>

      <div className="wave1"></div>

    </div>
  )
}

export default Header