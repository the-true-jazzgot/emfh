export type EMCategory = "uncategorized" | "q1" | "q2" | "q3" | "q4";

export type TaskType = "habit" | "daily" | "todo" | "reward";

export type Task = {
    id: string, 
    name: string,
    category: EMCategory
}

export type AuthData = {
    id: string,
    apiToken: string,
    username: string
}
