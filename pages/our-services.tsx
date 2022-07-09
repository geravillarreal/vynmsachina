import Image from 'next/image'
import React from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Slider from '../components/Slider'
import styles from '../styles/OurServices.module.scss'

const OurServices = () => {

  const icons = [
    {
      image: '/our-services/icons/icon-1.png',
      text: '运输'
    },
    {
      image: '/our-services/icons/icon-2.png',
      text: '自动化 '
    },
    {
      image: '/our-services/icons/icon-3.png',
      text: '会计'
    },
    {
      image: '/our-services/icons/icon-4.png',
      text: '员工住宿'
    },
    {
      image: '/our-services/icons/icon-5.png',
      text: '招聘'
    },
    {
      image: '/our-services/icons/icon-6.png',
      text: '安保服务'
    },
    {
      image: '/our-services/icons/icon-7.png',
      text: '进出口'
    },
    {
      image: '/our-services/icons/icon-8.png',
      text: '货运服务 '
    },
    {
      image: '/our-services/icons/icon-9.png',
      text: '法律咨询 '
    },
    {
      image: '/our-services/icons/icon-10.png',
      text: '项目管理'
    },
    {
      image: '/our-services/icons/icon-11.png',
      text: '人力资源'
    },
    {
      image: '/our-services/icons/icon-12.png',
      text: '企业管理'
    },
  ]

  return (
    <Layout title='Our Services'>
      <Header
        mobileImage='/our-services/header-mobile.jpeg'
        webImage='/our-services/header-web.jpeg'
      />


      <div className={styles.intro}>
        <div className={styles.content}>
          <span>
            作为墨西哥工业房地产专业的建筑开发商，VYNMSA(秉厦)承载着30年的丰富经验，并始终初心如一，不断进取，根据每一位客户的需求提供最优质的的个性化服务。
          </span>
        </div>
        <Slider
          images={[
            '/our-services/1.jpeg',
            '/our-services/2.jpeg',
            '/our-services/3.jpeg'
          ]}

        />
      </div>
      <div className={`${styles.section} ${styles.section1}`}>
        <div className={styles.content}>
          <div className="underlined">
            <h2>现有厂房</h2>
          </div>
          <span>多个5000平米以上的国际AAA级高标准厂房，可平面改造或扩建，欢迎企业立即进驻。</span>
        </div>

        <div className={styles.image}>
          <div className="green-border-bottom-left">
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/our-services/4.jpeg' />
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.section2}`}>
        <div className={styles.content}>
          <div className="underlined">
            <h2>厂房订制</h2>
          </div>
          <span>
            秉厦作为一流的工业地产开发商和建造商，可视客户具体需求优质、准时、按预算建造和交付厂房。
          </span>
        </div>

        <div className={styles.image}>
          <div className="green-border-top-left">
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/our-services/5.jpeg' />
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <Image
          alt=''
          objectFit='cover'
          layout='fill'
          src='/our-services/bg.png' />
        <div className={styles.content}>
          <h3>标准厂房租售</h3>
          <span>
            无论客户在墨投资计划长短，我们都能根据其具体需求提供最适合的厂房出租或销售选择，相较其他工业园更具优势。
          </span>
          <button className='btn'>厂房清单查询</button>
        </div>
      </div>
      <div className={styles.icons}>
        <div className={styles.content}>
          <span>此外，我们还可进一步为跨国企业工业项目落地墨西哥提供支持</span>
          <div className={styles.grid}>
            {
              icons.map(icon => (
                <div className={styles.icon} key={icon.text}>
                  <div className={styles.image}>
                    <Image
                      alt=''
                      objectFit='cover'
                      layout='fill'
                      src={icon.image} />
                  </div>
                  <span>{icon.text}</span>
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.image}>
          <div className="green-border-bottom-left">
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/our-services/8.jpeg' />
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.section3}`}>
        <div className={styles.content}>
          <div className="underlined">
            <h2>在墨西哥拥有工业厂房的优势</h2>
          </div>
          <span>
            更快更好地进入本土和北美、南美的庞大市场。众多跨国企业不仅青睐于墨西哥战略性的地理位置，还因其贸易开放程度高、人口红利、劳动力优质、制造实力强大、产业齐全、生产率高、税费负担小、基础设施完备、财政框架稳定而在此投资经。
          </span>
        </div>

        <div className={styles.image}>
          <div className="green-border-top-left">
            <Image
              alt=''
              objectFit='cover'
              layout='fill'
              src='/our-services/9.jpeg' />
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <h3>联系VYNMSA, 我们将超出您的期望!</h3>
        <button className='btn btn-green'>联系我们</button>
      </div>
    </Layout>
  )
}

export default OurServices