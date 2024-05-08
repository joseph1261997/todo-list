import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { Reorder } from "framer-motion";
import '../style/todoList.css';

type Todo = {
    id: string;
    text: string;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
    const [inputText, setInputText] = useState<string>('');
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
        if (e.key === 'Enter') {
            handleSaveEditTodo(id);
        }
    };

    const handleAddTodo = () => {
        if (inputText.trim() !== '') {
            const newTodo: Todo = {
                id: uuidv4(),
                text: inputText,
            };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    };

    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (id: string) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditingTodoId(id);
            setEditText(todoToEdit.text);
        }
    };

    const handleSaveEditTodo = (id: string) => {
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

    return (
        <Box sx={{ textAlign: 'center', padding: '20px', borderRadius: '10px' }} >
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
                    sx={{ width: '300px', marginRight: '1rem', height: '56px' }}
                />
                <Button variant="contained" onClick={handleAddTodo} sx={{ height: '56px' }}>
                    Add
                </Button>
            </Box>
            <Reorder.Group values={todos} onReorder={setTodos} axis="y">
                {todos.map(todo => (
                    <Reorder.Item key={todo.id} id={todo.id} value={todo} >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >

                            {editingTodoId === todo.id ? (
                                <>
                                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                                        <TextField
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onKeyPress={(e) => handleKeyPress(e, todo.id)}
                                            sx={{ width: '300px', mr: '1rem', height: '56px' }}
                                        />
                                    </Box>
                                    <Box>
                                        <Button variant='outlined' sx={{ mr: '1rem', height: '56px' }} onClick={() => handleSaveEditTodo(todo.id)}>Save</Button>
                                        <Button variant='outlined' sx={{ mr: '1rem', height: '56px' }} onClick={handleCancelEdit}>Cancel</Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box sx={{ flex: 1, textAlign: 'left' }}>{todo.text}</Box>
                                    <Box>
                                        <IconButton onClick={() => handleEditTodo(todo.id)}>
                                            <EditIcon sx={{ '&:hover': { color: 'blue' } }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                                            <DeleteIcon sx={{ '&:hover': { color: 'red' } }} />
                                        </IconButton>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </Box>
    );
};

export default TodoList;




