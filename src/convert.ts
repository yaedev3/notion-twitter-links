import * as fs from 'fs'
import { Notion, NotionConvertedRow } from './convert.interface'

const DATABASE_FILE = 'data/database.json'
const CONVERTED_DATABASE_FILE = 'data/cv-database.json'
const CLEAN_DATABASE_FILE = 'data/cl-database.json'

const readFile = <T>(path: string): T[] => {
  const data = fs.readFileSync(path, 'utf-8')
  return JSON.parse(data)
}

const writeFile = (path: string, data: any): void => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

const convertFile = (): NotionConvertedRow[] => {
  const data = readFile<Notion>(DATABASE_FILE)
  return data.map((element) => {
    return {
      link: element.properties.Link.url,
      downloaded: element.properties.Downloaded.checkbox,
      tag: element.properties.Tag.select.name,
      date: element.properties['Created time'].created_time,
    }
  })
}

export const exportConvertedFile = () => {
  const data = convertFile()
  writeFile(CONVERTED_DATABASE_FILE, data)
  console.log('Database converted successfully')
}

const getCleanData = (data: NotionConvertedRow[]): NotionConvertedRow[] => {
  data.sort((a, b) => {
    const t1 = new Date(a.date).getTime()
    const t2 = new Date(b.date).getTime()
    return t1 - t2
  })

  const newData: NotionConvertedRow[] = []
  const uniques: string[] = []

  for (const element of data) {
    if (!uniques.includes(element.link)) {
      uniques.push(element.link)
      newData.push(element)
    }
  }

  return newData
}

export const cleanFile = () => {
  const data = readFile<NotionConvertedRow>(CONVERTED_DATABASE_FILE)
  const cleanData = getCleanData(data)

  writeFile(CLEAN_DATABASE_FILE, cleanData)
  console.log(`Data length before cleaning ${data.length}`)
  console.log(`Data length after cleaning ${cleanData.length}`)
}

export const packageTags = () => {
  const data = readFile<NotionConvertedRow>(CLEAN_DATABASE_FILE)
  const tags = new Set([...data.map((d) => d.tag)])

  for (const tag of tags) {
    const links: NotionConvertedRow[] = data.filter((d) => d.tag === tag)
    const pending: string[] = links
      .filter((l) => !l.downloaded)
      .map((l) => l.link)
    console.log(
      `${tag} has ${pending.length} of ${links.length} links to download`,
    )
    fs.writeFileSync(`data/${tag}.txt`, pending.join('\n'), 'utf-8')
  }
}
