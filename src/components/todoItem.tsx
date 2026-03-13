import { Button, Divider, Checkbox } from 'antd';
import type { Todo } from '../store/todoStore.ts';
import  { useTodo } from '../store/todoStore.ts';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TodoItemDetails from './todoItemDetails.tsx';

type TodoItemProps = {
    todo: Todo
}

function TodoItem ( { todo } : TodoItemProps ) {
    
    const removeTodo = useTodo((state) => state.removeTodo)
    const toggleCompleteness = useTodo((state) => state.toggleTodoCompleteness)

    const [todoDetailsOpen, setTodoDetailsOpen] = useState(false);
    
    const showDetails = () => {
        setTodoDetailsOpen(true);
    };
   
    const handleCancel = () => {
        setTodoDetailsOpen(false);
    };

    return (
        <>
            <li className='flex flex-row justify-between'>
                <section className='pr-5'>{todo.title}</section>
                <section>
                    <Checkbox checked={todo.completed} onClick={() => toggleCompleteness(todo)}> </Checkbox>
                    <Button variant="filled" color="default" size="medium" onClick={()=> showDetails()} className='mr-3'>
                        <InfoCircleOutlined />
                    </Button>
                    <TodoItemDetails todo={todo} open={todoDetailsOpen} handleCancel={handleCancel}/>
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