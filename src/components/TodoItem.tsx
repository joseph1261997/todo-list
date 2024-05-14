import React from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TodoItemProps } from '../utils/types';
import styles from '../styles/TodoItem.module.css';

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
    <Box className={styles.todoItemContainer}>
        {editing ? (
            <>
                <Box className={styles.textInputContainer}>
                    <TextField
                        value={editText}
                        onChange={(e) => onTextChange(e.target.value)}
                        onKeyPress={(e) => onKeyPress(e, todo.id)}
                        className={styles.textInput}
                    />
                </Box>
                <Box>
                    <Button variant='outlined' className={styles.buttonEdit} onClick={() => onSaveEdit(todo.id)}>Save</Button>
                    <Button variant='outlined' className={styles.buttonEdit} onClick={onCancelEdit}>Cancel</Button>
                </Box>
            </>
        ) : (
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