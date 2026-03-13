import { Input, Button, Space } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useTodo } from '../store/todoStore.ts';

function TodoInput () {

    const [appendable, setAppendable] = useState('')
    const addTodo = useTodo((state) => state.addTodo)

    const addTodoWithSideEffects = (todo: string) => {
        addTodo(todo)
        setAppendable('')
    }

    return (
        <div id='todo-input' className="pb-5 object-center sticky">
            <Space.Compact style={{ width: '100%' }}>
                <Input 
                    variant="outlined" 
                    placeholder='Enter text to add a to-do item'
                    onChange={e => setAppendable(e.target.value)}
                    onPressEnter={() => addTodoWithSideEffects(appendable)}
                    value={appendable}
                />
                <Button type="primary" onClick={() => addTodoWithSideEffects(appendable)}><PlusOutlined/></Button>
            </Space.Compact>
        </div>
    )
}

export default TodoInput;