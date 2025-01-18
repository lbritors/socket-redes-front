import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import createPost from './src/backend/postagem.js'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
  },
})

const bancoPosts = createPost

app.use(cors({ origin: 'http://localhost:9000' }))

io.on('connect', () => {
  bancoPosts.setPostagem()

  io.emit('setup', bancoPosts.state)
})

io.on('message', (postagem) => {
  bancoPosts.addPostagem({
    id: postagem.id,
    title: postagem.title,
    autor: postagem.autor,
    content: postagem.editor,
  })

  bancoPosts.setPostagem()

  io.emit('setup', bancoPosts.state)
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
