import '../styles/Globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return  (
    <>
      <Script
        id="baidu-code"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: "var _hmt = _hmt || [];(function() {var hm = document.createElement('script');hm.src = 'https://hm.baidu.com/hm.js?bfc45a44f08bab60dd873830e65f1b4a';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);})();",
        }}
      />
      <Script
        id="google-analytics-code"
        src='https://www.googletagmanager.com/gtag/js?id=UA-106577678-2'
        strategy="beforeInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-106577678-2');",
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp