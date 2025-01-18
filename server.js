import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import createPost from './src/backend/postagem.js'

const app = express()
const server = createServer(app)
const io = new Server(server)

const bancoPosts = createPost

app.use(express.static('public'))

io.on('message', (postagem) => {
  bancoPosts.addPostagem({
    id: postagem.id,
    title: postagem.title,
    autor: postagem.autor,
    content: postagem.editor,
  })

  io.emit('setup', postagem.state)
})

server.listen(9000, () => {
  console.log('Server is running on port 9000')
})
