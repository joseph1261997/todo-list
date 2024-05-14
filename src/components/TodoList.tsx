import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Reorder } from "framer-motion";
import TodoItem from './TodoItem';
import { Todo } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/TodoList.module.css';

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
        <Box className={styles.todoListContainer} >
            <Box className={styles.todoListInputContainer}>
                <TextField
                    label="Add Todo"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTodo();
                        }
                    }}
                    className={styles.todoListInput}
                />
                <Button variant="contained" onClick={handleAddTodo} className={styles.todoListButton}>
                    Add
                </Button>
            </Box>
            <Reorder.Group values={todos} onReorder={setTodos} axis="y" className={styles.todoListReorderGroup}>
                {todos.map(todo => (
                    <Reorder.Item key={todo.id} id={todo.id} value={todo} className={styles.todoListReorderItem}>
                        <TodoItem
                            todo={todo}
                            editing={editingTodoId === todo.id}
                            editText={editText}
                            onEdit={handleEditTodo}
                            onDelete={handleDeleteTodo}
                            onSaveEdit={handleSaveEditTodo}
                            onCancelEdit={handleCancelEdit}
                            onTextChange={setEditText}
                            onKeyPress={handleKeyPress}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </Box>
    );
};

export default TodoList;