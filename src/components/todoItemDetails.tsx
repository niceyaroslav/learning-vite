import { Modal } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { Todo } from "../store/todoStore";

type TodoItemDetailProps = {
    todo: Todo
    open: boolean
    handleCancel: () => void
}

export default function TodoItemDetails ({todo, open, handleCancel}: TodoItemDetailProps) {

    return (
        <>
            <Modal
                title="Todo Item details"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <p>ID: {todo.id}</p>
                <p>User ID: {todo.userId}</p>
                <p>Title: {todo.title}</p>
                <p>Completed: {todo.completed ? <CheckCircleOutlined/>: <CloseCircleOutlined/>}</p>
            </Modal>
        </>
    )
}