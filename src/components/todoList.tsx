import TodoItem  from './todoItem.tsx'; 
import type { Todo } from '../store/todoStore.ts';

type TodoListProps = {
    todos: Array<Todo>
}

function TodoList ({todos}: TodoListProps) {
    return (
        <ul className='list-decimal' >
            {todos.map(todo => (
                <TodoItem todo={todo} key={todo.id}/>
            ))}
        </ul>
    )
}

export default TodoList;