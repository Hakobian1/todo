import * as axios from 'axios'

const keyApi = 'SamvelHakobyan'

const instance = axios.create({
  baseURL: `https://todo.eachbase.com/api/${keyApi}`,
})

export const todos = {
  getTodos() {
    return instance.get('/todos').catch(error => {
      console.error(error);
      return []
    })
  },
  createTodos(data) {
    return instance.post('/todos', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error)
        return false
      })
  },
  updateTodo(id, data) {
    return instance.patch(`/todos/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      return null;
    })
  },

  async getTodoWithId(id) {
    try {
      const response = await instance.get(`/todos/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`get product with id ${error}`)
    }
  },

  deleteById(id) {
    return instance.delete(`/todos/${id}`)
      .then(() => id)
      .catch(error => {
        console.error(error);
        return false;
      })
  },
}
