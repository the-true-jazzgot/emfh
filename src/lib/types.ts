export type EMCategory = "uncategorized" | "q1" | "q2" | "q3" | "q4";

export type TaskType = "habit" | "daily" | "todo" | "reward";

export type Task = {
    id: string, 
    name: string,
    type: TaskType,
    date?: Date,
    l_category: EMCategory,
    l_validated: boolean,
    l_validationDate?: Date
}

export type UserCredentials = {
    username: string,
    password: string
  };

export type AuthData = {
    id: string,
    apiToken: string,
    username: string
}
