import { LoaderFunction } from '@remix-run/node'
import React from 'react'
import { config } from '~/lib/lib'

export const loader: LoaderFunction = async () => {
  const baseUrl = config.BASE_URL

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
    <sitemap>
      <loc>${baseUrl}/sitemap-main.xml</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </sitemap>  

    <sitemap>
      <loc>${baseUrl}/sitemap-categories.xml</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </sitemap>

    <sitemap>
      <loc>${baseUrl}/sitemap-categories-cities.xml</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </sitemap>
  </sitemapindex>`

  return new Response(sitemapContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
