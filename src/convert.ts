import * as fs from 'fs'
import { Notion, NotionConvertedRow } from './convert.interface'

const DATABASE_FILE = 'data/database.json'

const readDatabaseFile = (): Notion[] => {
  const data = fs.readFileSync(DATABASE_FILE, 'utf-8')
  return JSON.parse(data)
}

const convertFile = (): NotionConvertedRow[] => {
  const data = readDatabaseFile()
  return data.map((element) => {
    return {
      link: element.properties.Link.url,
      downloaded: element.properties.Downloaded.checkbox,
      tag: element.properties.Tag.select.name,
    }
  })
}

export const exportConvertedFile = () => {
  const data = convertFile()
  fs.writeFileSync(
    'data/converted-database.json',
    JSON.stringify(data, null, 2),
  )
  console.log('Database converted successfully')
}
