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
  let cursor = undefined

  do {
    const response: any = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
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
    cursor = response.next_cursor
  } while (cursor)

  return convertInformation(results)
}

const fetchAllDatabase = async () => {
  let results: any[] = []
  let cursor = undefined

  do {
    const response: any = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
    })

    results = results.concat(response.results)
    cursor = response.next_cursor
    console.log('Fetching... ', results.length)
  } while (cursor)

  console.log('Fetched all ', results.length)
  return results
}

const convertInformation = (notionData: any[]): string[] => {
  const array = notionData.map((data) => data.properties.link.url)
  return uniqueValues(array)
}

const uniqueValues = (array: string[]): string[] => {
  return Array.from(new Set(array))
}

export const exportFileFromDatabase = async (tag: string) => {
  const [downloaded, pending] = await Promise.all([
    fetchAllRows(tag, true),
    fetchAllRows(tag, false),
  ])
  const rows = pending.filter((p) => !downloaded.includes(p))
  fs.writeFileSync(`data/${tag}.txt`, rows.join('\n'), 'utf-8')
  console.log(`Exported ${rows.length} rows for tag: ${tag}`)
}

export const exportAllDataBase = async () => {
  const database = await fetchAllDatabase()
  fs.writeFileSync('data/database.json', JSON.stringify(database, null, 2))
  console.log(`Database exported ${database.length}`)
}
