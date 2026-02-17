import { Client } from '@notionhq/client'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.DATABASE_ID as string

const fetchAllRows = async (tag: string, status: boolean) => {
  let results: any[] = []
  let hasMore = true

  while (hasMore) {
    const response: any = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Downloaded',
            checkbox: { equals: status },
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

  return convertInformation(results)
}

const convertInformation = (notionData: any[]): string[] => {
  const array = notionData.map((data) => data.properties.link.url)
  return uniqueValues(array)
}

const uniqueValues = (array: string[]): string[] => {
  return Array.from(new Set(array))
}

export const exportDatabase = async (tag: string) => {
  const [downloaded, pending] = await Promise.all([
    fetchAllRows(tag, true),
    fetchAllRows(tag, false),
  ])
  const rows = pending.filter((p) => !downloaded.includes(p))
  fs.writeFileSync(`data/${tag}.txt`, rows.join('\n'), 'utf-8')
  console.log(`Exported ${rows.length} rows for tag: ${tag}`)
}
