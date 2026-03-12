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
}

export const useTodo = create<TodoStore>((set) => ({
  todos: [],
  updateTodos: (newTodos: Array<Todo>) => set({ todos: newTodos }),
}))
