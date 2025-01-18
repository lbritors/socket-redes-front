export default function createPost() {
  const state = {
    posts: {},
  }

  function setPostagens(newPostagem) {
    Object.assign(state, newPostagem)
  }

  function addPostagem(command) {
    const id = command.id
    const titulo = command.title
    const autor = command.autor
    const conteudo = command.content

    state.posts[id] = {
      title: titulo,
      author: autor,
      content: conteudo,
    }
  }

  return {
    addPostagem,
    state,
    setPostagens,
  }
}
