import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s | DappID',
  defaultTitle: 'DappID',
  description: 'Create your personalized Profile Picture from your ENS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
}

export default config
