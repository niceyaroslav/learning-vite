import { Button, Divider, Checkbox } from 'antd';
import type { Todo } from '../store/todoStore.ts';
import  { useTodo } from '../store/todoStore.ts';
import { DeleteOutlined, } from '@ant-design/icons';


type TodoItemProps = {
    todo: Todo
}

function TodoItem ( { todo } : TodoItemProps ) {
    
    const removeTodo = useTodo((state) => state.removeTodo)
    const toggleCompleteness = useTodo((state) => state.toggleTodoCompleteness)

    return (
        <>
            <li className='flex flex-row justify-between'>
                <section className='pr-5'>{todo.title}</section>
                <section>
                    <Checkbox checked={todo.completed} onClick={() => toggleCompleteness(todo)}> </Checkbox>
                    <Button variant="solid" color="danger" size="medium" onClick={()=> removeTodo(todo)} value={todo.title}>
                        <DeleteOutlined />
                    </Button>
                </section>
            </li>
            <Divider></Divider>
        </>
    )
}

export default TodoItem;