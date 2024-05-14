/**
 * @module TodoList
 */

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Reorder } from "framer-motion";
import TodoItem from './TodoItem';
import { Todo } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/TodoList.module.css';

/**
 * Componente TodoList
 * 
 * Gestisce una lista di todo, permettendo all'utente di aggiungere, eliminare e modificare i todo.
 * 
 * @component
 */
const TodoList: React.FC = () => {
    // State per gestire la lista di todo
    const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
    // State per gestire il testo dell'input per aggiungere un nuovo todo
    const [inputText, setInputText] = useState<string>('');
    // State per gestire l'ID del todo che si sta modificando
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    // State per gestire il testo del todo che si sta modificando
    const [editText, setEditText] = useState<string>('');

    // Effetto per salvare la lista di todo nel localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Gestisce la pressione del tasto "Invio" per aggiungere un nuovo todo
    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
        if (e.key === 'Enter') {
            handleSaveEditTodo(id);
        }
    };

    // Aggiunge un nuovo todo alla lista
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

    // Elimina un todo dalla lista
    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    // Inizia la modifica di un todo
    const handleEditTodo = (id: string) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditingTodoId(id);
            setEditText(todoToEdit.text);
        }
    };

    // Salva le modifiche apportate a un todo
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

    // Annulla la modifica di un todo
    const handleCancelEdit = () => {
        setEditingTodoId(null);
    };

    return (
        // Wrapper del componente TodoList
        <Box className={styles.todoListContainer} >
            {/* Input per aggiungere un nuovo todo */}
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
                {/* Pulsante per aggiungere un nuovo todo */}
                <Button variant="contained" onClick={handleAddTodo} className={styles.todoListButton}>
                    Add
                </Button>
            </Box>
            {/* Lista di todo */}
            <Reorder.Group values={todos} onReorder={setTodos} axis="y" className={styles.todoListReorderGroup}>
                {todos.map(todo => (
                    <Reorder.Item key={todo.id} id={todo.id} value={todo} className={styles.todoListReorderItem}>
                        {/* Componente TodoItem per visualizzare e modificare un todo */}
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