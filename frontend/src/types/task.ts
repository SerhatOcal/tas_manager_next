export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'completed';
    user_id: number;
    assigned_to?: number | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
    can_manage: boolean;
    status_badge: string;
    status_text: string;
    user: {
        id: number;
        name: string;
    };
    assignee?: {
        id: number;
        name: string;
    };
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    assigned_to?: number;
    due_date?: string;
}

export interface UpdateTaskData {
    title: string;
    description?: string;
    status?: 'completed' | 'pending';
    assigned_to?: number | null;
    due_date?: string;
} 