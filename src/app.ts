import express from 'express'

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('Hello World')
  res.send('Hello World')
})

app.listen(3000)
