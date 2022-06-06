const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5100

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/questions', require('./routes/questionRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/score', require('./routes/scoreRoutes'))
app.use('/api/todo', require('./routes/todoRoutes'))
app.use('/api/character', require('./routes/characterRoutes'))

// production env for heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get('/', (req, res) => res.send('should be in production mode'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))
