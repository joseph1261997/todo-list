import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Todo = {
    id: number;
    text: string;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');

    const handleAddTodo = () => {
        if (inputText.trim() !== '') {
            const newTodo: Todo = {
                id: todos.length + 1,
                text: inputText,
            };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <TextField
                label="Add Todo"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddTodo}>Add</Button>
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id}>
                        <ListItemText primary={todo.text} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TodoList;