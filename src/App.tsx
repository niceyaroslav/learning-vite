import { useEffect } from 'react';
import './App.css'
import TodoInput from './components/todoInput.tsx'
import TodoList from './components/todoList.tsx'
import { useTodo } from './store/todoStore.ts';
import type { Todo } from './store/todoStore.ts';
import { fetchTodos } from './api/todos.ts';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from '@tanstack/react-query'


export default function App () {

  const todos = useTodo((state) => state.todos)
  const updateTodos = useTodo((state) => state.updateTodos)

  useEffect (
    () => {
      fetchTodos().then(
        (fetchedTodos) => {
          if (fetchedTodos.length !== 0) {
            updateTodos(fetchedTodos.sort((a: Todo, b: Todo) => {return b.id - a.id}))
          }
        }
      )
    }, []
  )
  return (
    <>
      <main className='min-w-md'>
        <h5>To-Do list app</h5>
        <TodoInput />
        <TodoList todos={todos}/>
      </main>
    </>
  )
}
