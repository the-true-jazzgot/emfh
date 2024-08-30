export const enum EMCategory {
    uncategorized = "uncategorized",
    q1 = "Important and urgent",
    q2 = "Not important but urgent",
    q3 = "Important but not urgent",
    q4 = "Not important and not urgent"
}

// export type EMCategory = "uncategorized" | "q1" | "q2" | "q3" | "q4";

export type TaskType = "habit" | "daily" | "todo" | "reward";

export type Task = {
    id: number, 
    name: string,
    category: EMCategory
}

export type AuthData = {
    id: string,
    apiToken: string,
    username: string
}
