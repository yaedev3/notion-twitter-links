import express from 'express'
import { exportAllDataBase, exportFileFromDatabase } from './notion-export'
import { tags } from './tag'
import { cleanFile, exportConvertedFile, packageTags } from './convert'

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('Hello World')
  res.send('Hello World')
})

app.get(
  '/export-notion',
  async (req: express.Request, res: express.Response) => {
    try {
      const promises = tags.map((tag) => exportFileFromDatabase(tag))
      await Promise.all(promises)
      res.send('Notion data exported successfully.')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error exporting Notion data.')
    }
  },
)

app.get(
  '/export-database',
  async (req: express.Request, res: express.Response) => {
    try {
      await exportAllDataBase()
      res.send('Notion database exported successfully.')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error exporting Notion data.')
    }
  },
)

app.get(
  '/convert-database',
  async (req: express.Request, res: express.Response) => {
    try {
      exportConvertedFile()
      res.send('Notion database converted successfully.')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error exporting Notion data.')
    }
  },
)

app.get('/clean-file', async (req: express.Request, res: express.Response) => {
  try {
    cleanFile()
    res.send('Database file cleaned successfully.')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error exporting Notion data.')
  }
})

app.get('/package-tag', async (req: express.Request, res: express.Response) => {
  try {
    packageTags()
    res.send('Tag files generated successfully.')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error exporting Notion data.')
  }
})

app.listen(3000)
