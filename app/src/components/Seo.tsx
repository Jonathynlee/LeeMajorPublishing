import { useEffect } from 'react'

type OpenGraph = {
  title?: string
  description?: string
  url?: string
  siteName?: string
  image?: string
  type?: string
}

type Twitter = {
  card?: 'summary' | 'summary_large_image'
  title?: string
  description?: string
  image?: string
}

type SeoProps = {
  title?: string
  description?: string
  robots?: string
  canonical?: string
  openGraph?: OpenGraph
  twitter?: Twitter
  jsonLd?: object | object[]
}

export default function Seo({
  title,
  description,
  robots = 'index,follow',
  canonical,
  openGraph,
  twitter,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title

    const setMeta = (name: string, content?: string) => {
      if (!content) return
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setProp = (property: string, content?: string) => {
      if (!content) return
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel: string, href?: string) => {
      if (!href) return
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setMeta('description', description)
    setMeta('robots', robots)
    setLink('canonical', canonical)

    if (openGraph) {
      setProp('og:title', openGraph.title ?? title)
      setProp('og:description', openGraph.description ?? description)
      setProp('og:url', openGraph.url ?? canonical)
      setProp('og:site_name', openGraph.siteName)
      setProp('og:type', openGraph.type ?? 'website')
      setProp('og:image', openGraph.image)
    }
    if (twitter) {
      setMeta('twitter:card', twitter.card ?? 'summary_large_image')
      setMeta('twitter:title', twitter.title ?? title)
      setMeta('twitter:description', twitter.description ?? description)
      if (twitter.image) setMeta('twitter:image', twitter.image)
    }

    let jsonLdScript: HTMLScriptElement | null = null
    if (jsonLd) {
      jsonLdScript = document.createElement('script')
      jsonLdScript.type = 'application/ld+json'
      jsonLdScript.text = JSON.stringify(jsonLd)
      document.head.appendChild(jsonLdScript)
    }

    return () => {
      if (title) document.title = prevTitle
      if (jsonLdScript) document.head.removeChild(jsonLdScript)
    }
  }, [title, description, robots, canonical, JSON.stringify(openGraph), JSON.stringify(twitter), JSON.stringify(jsonLd)])

  return null
}


