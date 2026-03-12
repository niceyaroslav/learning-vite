import { Input, Button, Space } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useTodo } from '../store/todoStore.ts';

function TodoInput () {

    const todos = useTodo((state) => state.todos)
    const updateTodos = useTodo((state) => state.updateTodos)
    const [appendable, setAppendable] = useState('')

    const getNextId = (useUserIds: boolean) => {
        let ids: Array<number> = []
        if (!useUserIds) {
            ids = todos.map((td) => td.id)
        }   else {
            ids = todos.map((td) => td.userId)
        }
        let maxId = ids.length > 0 ? Math.max(...ids) : 1
        return maxId + 1 
    }
    
    const addTodo = (todo: string) => {
        let newId = getNextId(false)
        let newUserId = getNextId(true)

        let newTodo = {
            'userId': newUserId,
            'title': todo,
            'id': newId,
            'completed': false
        }
        if (todo !== '') {
            updateTodos([newTodo, ...todos])
        }
        setAppendable('')
        
    }
    return (
        <div id='todo-input' className="pb-5 object-center sticky">
            <Space.Compact style={{ width: '100%' }}>
                <Input 
                    variant="outlined" 
                    placeholder='Enter text to add a to-do item'
                    onChange={e => setAppendable(e.target.value)}
                    value={appendable}
                />
                <Button type="primary" onClick={() => addTodo(appendable)}><PlusOutlined/></Button>
            </Space.Compact>
        </div>
    )
}

export default TodoInput;