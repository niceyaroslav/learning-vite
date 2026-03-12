import { Button, Divider, Checkbox } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';
import type { Todo } from '../store/todoStore.ts';
import  { useTodo } from '../store/todoStore.ts';
import { MinusOutlined } from '@ant-design/icons';


const useStyles = createStyles(({ token, css }) => ({
  root: css`
    border-radius: ${token.borderRadius}px;
    background-color: ${token.colorBgContainer};
  `,
  icon: css`
    border-color: ${token.colorSuccess};
  `,
  label: css`
    color: ${token.colorTextDisabled};
    font-weight: bold;
  `,
  iconChecked: css`
    background-color: ${token.colorSuccess};
  `,
  labelChecked: css`
    color: ${token.colorSuccess};
  `,
}));

// Object style
const styles = {
  icon: {
    borderRadius: 6,
  },
  label: {
    color: 'blue',
  },
};

type ClassNamesInfo = {
  props: {
    checked?: boolean;
  };
};

type TodoItemProps = {
    todo: Todo
}

function TodoItem ( { todo } : TodoItemProps ) {

    const todos = useTodo((state) => state.todos)
    const updateTodos = useTodo((state) => state.updateTodos)

    const { styles: classNamesStyles } = useStyles();
    // Function classNames - dynamically adjust based on checked state
    const classNamesFn = (info: ClassNamesInfo)  => {
        if (info.props.checked) {
        return {
            root: clsx(classNamesStyles.root),
            icon: clsx(classNamesStyles.icon, classNamesStyles.iconChecked),
            label: clsx(classNamesStyles.label, classNamesStyles.labelChecked),
        };
        }
        return {
            root: classNamesStyles.root,
            icon: classNamesStyles.icon,
            label: classNamesStyles.label,
        };
    };

    const removeTodo  = (todo: Todo) => {
        updateTodos(
            todos.filter(
                item => (item.title !== todo.title || item.id !== todo.id)
            )
        )
    }
    return (
        <>
            <li className='flex flex-row justify-between'>
                <section className='pr-5'>{todo.title}</section>
                <section>
                    <Checkbox classNames={classNamesFn}>
                        Completed
                    </Checkbox>
                    <Button type="primary" size="small" onClick={()=> removeTodo(todo)} value={todo.title}><MinusOutlined/></Button>
                </section>
            </li>
            <Divider></Divider>
        </>
    )
}

export default TodoItem;