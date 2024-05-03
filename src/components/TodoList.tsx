import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Todo = {
    id: number;
    text: string;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
    const [inputText, setInputText] = useState<string>('');
    const [idCounter, setIdCounter] = useState<number>(JSON.parse(localStorage.getItem('idCounter') || '1'));
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');

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

    const handleEditTodo = (id: number) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditingTodoId(id);
            setEditText(todoToEdit.text);
        }
    };

    const handleSaveEditTodo = (id: number) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: editText
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditingTodoId(null);
    };

    const handleCancelEdit = () => {
        setEditingTodoId(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, id: number) => {
        if (e.key === 'Enter') {
            handleSaveEditTodo(id);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffcc', borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <TextField
                    label="Add Todo"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTodo();
                        }
                    }}
                    sx={{ width: '300px', marginRight: '1rem', height: '56px', backgroundColor: '#ffffcc' }}
                />
                <Button variant="contained" onClick={handleAddTodo} sx={{ height: '56px' }}>
                    Add
                </Button>
            </Box>
            <List sx={{ backgroundColor: '#ffffcc', borderRadius: '5px', padding: '10px' }}>
                {todos.map(todo => (
                    <ListItem key={todo.id} sx={{ borderBottom: '1px solid #aaa' }}>
                        {editingTodoId === todo.id ? (
                            <>
                                <TextField
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, todo.id)}
                                    sx={{ width: '300px', mr: '1rem', height: '56px', backgroundColor: '#ffffcc' }}
                                />
                                <Button variant='outlined' sx={{ mr: '1rem', height: '56px' }} onClick={() => handleSaveEditTodo(todo.id)}>Save</Button>
                                <Button variant='outlined' sx={{ mr: '1rem', height: '56px' }} onClick={handleCancelEdit}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                <ListItemText primary={todo.text} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={() => handleEditTodo(todo.id)}
                                        sx={{
                                            '&:hover': {
                                                color: 'blue'
                                            }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
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
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;