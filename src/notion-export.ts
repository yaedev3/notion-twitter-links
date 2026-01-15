import { Client } from '@notionhq/client'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.DATABASE_ID as string

async function fetchAllRows(tag: string) {
  let results: any[] = []
  let hasMore = true

  while (hasMore) {
    const response: any = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Downloaded',
            checkbox: { equals: false },
          },
          {
            property: 'Tag',
            select: { equals: tag },
          },
        ],
      },
    })

    results = results.concat(response.results)
    hasMore = response.has_more
  }

  return results
}

export async function exportDatabase(tag: string) {
  const pages = await fetchAllRows(tag)
  let rows: string[] = []

  for (const page of pages) {
    const row = page.properties.Link.url
    rows.push(row)
  }

  rows = Array.from(new Set(rows))
  fs.writeFileSync(`data/${tag}.txt`, rows.join('\n'), 'utf-8')
  console.log(`Exported ${rows.length} rows for tag: ${tag}`)
}
