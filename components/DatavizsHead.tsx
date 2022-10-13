import Head from "next/head"

interface DatavizsHeadProps {
  pageTitle: string

  description: string

  ogImage: string
}

export const DatavizsHead = ({ pageTitle, description, ogImage }: DatavizsHeadProps) => {
  return (
    <Head>
      <title>{pageTitle} | Datavizs</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags */}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Datavizs" />

      <meta property="og:title" content={`${pageTitle} | Datavizs`} />
      <meta property="og:url" content="https://datavizs.vercel.app" />

      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={description} />

      {/* Twitter Open Graph Meta Tags */}
      <meta name="twitter:site" content="@jfrAziz" />

      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={`${pageTitle} | Datavizs`} />
      <meta name="twitter:description" content={description} />

      {/* Viewport */}
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
  )
}