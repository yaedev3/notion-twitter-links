import express from 'express'
import { exportDatabase } from './notion-export'
import { tags } from './tag'

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('Hello World')
  res.send('Hello World')
})

app.get(
  '/export-notion',
  async (req: express.Request, res: express.Response) => {
    try {
      tags.forEach(async (tag) => {
        await exportDatabase(tag)
      })
      res.send('Notion data exported successfully.')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error exporting Notion data.')
    }
  }
)

app.listen(3000)
