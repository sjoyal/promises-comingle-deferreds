const express = require('express')
const path = require('path')
const port = 3000
const app = express()

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'), err => {
    if (err) {
      console.log(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
