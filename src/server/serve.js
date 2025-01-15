import express from 'express'
import http from 'http'
import createPost from './backend'
import socketio from 'socket.io'
import { Socket } from 'socket.io-client'

const app  = express()
const server = http.createServer()
const sockets = socketio(server)

app.use(express.static('public'))

const post = createPost()
post.addPost({autor: 'Rafael', titulo: 'teste1', post: 'Esse é um primeiro teste da plataforma'})
post.addPost({autor: 'Leticia', titulo: 'teste2', post: 'Esse é um segundo teste da plataforma'})
post.addPost({autor: 'Jovi', titulo: 'teste3', post: 'Esse é um terceiro teste da plataforma'})
post.addPost({autor: 'Vitoria', titulo: 'teste4', post: 'Esse é um quarto teste da plataforma'})

console.log(game.plataforma)

sockets.on('connection', (socket) =>{
  const userId = socket.id
  console.log('> User connected on Server with id: ${userId}')


  socket.emit('setup', post.plataforma)
})

server.listen(9000, () =>{
    console.log('> Server listening on port: 9000')
})
