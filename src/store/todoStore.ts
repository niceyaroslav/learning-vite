import { create } from 'zustand';
import { fetchTodos, sendTodo, deleteTodo } from '../api/todos.ts';

export type Todo = {
  userId: number
  title: string
  id: number
  completed: boolean
}

type TodoStore = {
    todos: Todo[]
    updateTodos: (newTodos: Todo[]) => void
    removeTodo: (todo: Todo) => void
    addTodo: (todo: string) => void
    toggleTodoCompleteness: (todo: Todo) => void 
}


const getNextId = (useUserIds: boolean, todos: Todo[]) => {

  let ids: number[] = []
  if (!useUserIds) {
      ids = todos.map((td) => td.id)
  }   else {
      ids = todos.map((td) => td.userId)
  }
  let maxId = ids.length > 0 ? Math.max(...ids) : 1
  return maxId + 1 
}

function filterTodos (todo: Todo, todos: Todo[]) {
  let filteredTodos = todos.filter(
    item => (item.title !== todo.title || item.id !== todo.id)
  )
  return filteredTodos ? filteredTodos : []
}

export const useTodo = create<TodoStore>((set) => ({
  todos: [],
  updateTodos: (newTodos: Todo[]) => set({ todos: newTodos }),
  removeTodo: (todo: Todo) => set(
    (state) => {
      deleteTodo(todo.id)
      return {todos: filterTodos(todo, state.todos)}
    }
  ),
  addTodo: (todo: string) => set(
    (state) => {
      let newId = getNextId(false, state.todos)
      let newUserId = getNextId(true, state.todos)
      
      let newTodo = {
          'userId': newUserId,
          'title': todo,
          'id': newId,
          'completed': false
      }
      
      let newTodos = [...state.todos]
      if (todo) {
        if (todo.trim() !== '') {
          sendTodo(JSON.stringify(newTodo), "POST")
          newTodos = [newTodo, ...state.todos]
        }
      }
      return {todos: newTodos}
    }
  ),
  toggleTodoCompleteness: (todo: Todo) => set(
    (state) => {
      let updatedItem
      let newTodos = state.todos.map(
        (item) => {
          if (item.title === todo.title && item.id === todo.id) {
            updatedItem = {...todo}
            updatedItem.completed = !item.completed
            return updatedItem
          }
          return item
        }
      )
      sendTodo(JSON.stringify(updatedItem), 'PUT')
      return {todos: newTodos}
    }
  )
}))
