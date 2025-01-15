export default function createPost() {
  const plataforma = {
    posts:{}
  }



  function setPlataforma(newPlataforma){
    Object.assign(plataforma, newPlataforma)
  }

  function addPost(command){
    const postTitulo = command.titulo
    const postAutor = command.autor
    const post = command.post

    plataforma.posts[postAutor] = {
      titulo: postTitulo,
      postagem: post
    }

  }

  return{
    addPost,
    plataforma,
    setPlataforma
  }
}
