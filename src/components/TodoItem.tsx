/**
 * @module TodoItem
 */

import React from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TodoItemProps } from '../utils/types';
import styles from '../styles/TodoItem.module.css';

/**
 * Componente TodoItem
 * 
 * Rappresenta un singolo todo nella lista. Permette all'utente di visualizzare, modificare e eliminare il todo.
 * 
 * @component
 * @param {TodoItemProps} props - Props per il componente TodoItem
 */

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    editing,
    editText,
    onEdit,
    onDelete,
    onSaveEdit,
    onCancelEdit,
    onTextChange,
    onKeyPress
}) => (
    // Wrapper del componente TodoItem
    <Box className={styles.todoItemContainer}>
        {/* Controlla se il todo è in modalità di modifica */}
        {editing ? (
            // Se il todo è in modalità di modifica, visualizza un campo di testo per modificare il testo del todo
            <>
                <Box className={styles.textInputContainer}>
                    <TextField
                        value={editText}
                        onChange={(e) => onTextChange(e.target.value)}
                        onKeyPress={(e) => onKeyPress(e, todo.id)}
                        className={styles.textInput}
                    />
                </Box>
                {/* Pulsanti per salvare o annullare le modifiche al todo */}
                <Box>
                    <Button variant='outlined' className={styles.buttonEdit} onClick={() => onSaveEdit(todo.id)}>Save</Button>
                    <Button variant='outlined' className={styles.buttonEdit} onClick={onCancelEdit}>Cancel</Button>
                </Box>
            </>
        ) : (
            // Se il todo non è in modalità di modifica, visualizza il testo del todo e pulsanti per modificarlo o eliminarlo
            <>
                <Box className={styles.textContainer}>{todo.text}</Box>
                <Box>
                    <IconButton onClick={() => onEdit(todo.id)}>
                        <EditIcon className={styles.editButton} />
                    </IconButton>
                    <IconButton onClick={() => onDelete(todo.id)}>
                        <DeleteIcon className={styles.deleteButton} />
                    </IconButton>
                </Box>
            </>
        )}
    </Box>
);

export default TodoItem;