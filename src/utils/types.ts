export type Todo = {
    id: string;
    text: string;
};

export interface TodoItemProps {
    todo: Todo;
    editing: boolean;
    editText: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onSaveEdit: (id: string) => void;
    onCancelEdit: () => void;
    onTextChange: (text: string) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>, id: string) => void;
}
