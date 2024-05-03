import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Todo = {
    id: number;
    text: string;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
    const [inputText, setInputText] = useState<string>('');
    const [idCounter, setIdCounter] = useState<number>(JSON.parse(localStorage.getItem('idCounter') || '1'));

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('idCounter', JSON.stringify(idCounter));
    }, [todos, idCounter]);

    const handleAddTodo = () => {
        if (inputText.trim() !== '') {
            const newTodo: Todo = {
                id: idCounter,
                text: inputText,
            };
            setTodos([...todos, newTodo]);
            setInputText('');
            setIdCounter(idCounter + 1); // Increment ID counter
        }
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffcc', borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <TextField
                    label="Add Todo"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ width: '200px', marginRight: '1rem', height: '56px', backgroundColor: '#ffffcc' }}
                />
                <Button variant="contained" onClick={handleAddTodo} sx={{ height: '56px' }}>
                    Add
                </Button>
            </Box>
            <List sx={{ backgroundColor: '#ffffcc', borderRadius: '5px', padding: '10px' }}>
                {todos.map(todo => (
                    <ListItem key={todo.id} sx={{ borderBottom: '1px solid #aaa' }}>
                        <ListItemText primary={todo.text} />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => handleDeleteTodo(todo.id)}
                                sx={{
                                    '&:hover': {
                                        color: 'red'
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;