import { create } from 'zustand'

export type Todo = {
  userId: number
  title: string
  id: number
  completed: boolean
}

type TodoStore = {
    todos: Array<Todo>
    updateTodos: (newTodos: Array<Todo>) => void
    removeTodo: (todo: Todo) => void
    addTodo: (todo: string) => void
    toggleTodoCompleteness: (todo: Todo) => void 
}


const getNextId = (useUserIds: boolean, todos: Array<Todo>) => {

  let ids: Array<number> = []
  if (!useUserIds) {
      ids = todos.map((td) => td.id)
  }   else {
      ids = todos.map((td) => td.userId)
  }
  let maxId = ids.length > 0 ? Math.max(...ids) : 1
  return maxId + 1 
}

function filterTodos (todo: Todo, todos: Array<Todo>) {
  let filteredTodos = todos.filter(
    item => (item.title !== todo.title || item.id !== todo.id)
  )
  return filteredTodos ? filteredTodos : []
}

export const useTodo = create<TodoStore>((set) => ({
  todos: [],
  updateTodos: (newTodos: Array<Todo>) => set({ todos: newTodos }),
  removeTodo: (todo: Todo) => set(
    (state) => {
      return {todos: filterTodos(todo, state.todos)}
    }
  ),
  addTodo: (todo: string) => set(
    (state) => {
      let newId = getNextId(false, state.todos)
      let newUserId = getNextId(true, state.todos)
      
      let newTodos
      let newTodo = {
          'userId': newUserId,
          'title': todo,
          'id': newId,
          'completed': false
      }
      if (todo !== '') {
        newTodos = [newTodo, ...state.todos]
      }
      return {todos: newTodos}
    }
  ),
  toggleTodoCompleteness: (todo: Todo) => set(
    (state) => {
      let newTodos = state.todos.map(
        (item) => {
          if (item.title === todo.title && item.id === todo.id) {
            item.completed = !item.completed
          }
          return item
        }
      )
      return {todos: newTodos}
    }
  )
}))
