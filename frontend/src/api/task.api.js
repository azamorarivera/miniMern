import api from "./axios";

export async function getTasks() {
    const { data } = await api.get("/task")
    return data
}

export async function createTask(title) {
    const { data } = await api.post("/task", { title })
    return data
}

export async function updateTask(id, payload) {
    const { data } = await api.put (´/task/${id}´, payload)
    return data
}

export async function deleteTask(id) {
    const { data } = await api.delete(´/task/${id}´)
    return data
}