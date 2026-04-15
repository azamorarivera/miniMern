import  {useEffect, useState} from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "../api/task.api.js";

export default function TaskPage(){
    const [tasks, setTask] = useState([])
    const [Loading, setLoading] = useState(true)
    const [busy, setBusy] = useState(false)
    const [Error, setError] = useState("")

    async function load() {
    try{ 
        setError ("")
        setLoading(true)
        const data = await getTasks()
        setTask(data)
    }catch (e){
        setError(e?.message || "Error cargando tareas")
    }finally{
        setLoading(false)
    }
    }
useEffect(() =>{
    load()
}, [])

async function handleCreate(title){
    try{
        setError("")
        setBusy(true)
        await createTask (title)
        await load()
    }catch (e){
        setError(e?.response?.data?.message || e?.message || "Error creando tareas")
    }finally{
        setBusy(false)
    }
}
    async function handleToggle(task){
        try{
            setBusy(true)
            await updateTask(task._id, { done: !task.done})
            await load()
        }catch (e){
            setError(e?.message || "Error actualizando tareas")
        }finally{
            setBusy(false)
        }

    }
    
    async function handleUpdate(id, title) {
            try{
                setBusy(true)
                await updateTask(id, { title })
                await load()
            }catch (e){
                setError("Error actualizando tareas")
            }finally{
                setBusy(false)
            }
        }

    async function handleDelete(id){
        try{
        setError("")
        setBusy(true)
        await deleteTask(id)
        await load()
    }catch (e){
        setError(e?.message || "Error eliminando tareas")

    }finally{
        setBusy(false)
    }
}
    return(
        <div style={{
            maxwidth : 520, margin: "40px auto", fontFamily: "System-ui"}}>
                <h1> Mini Mern - Tareas</h1>
                <TaskForm onCreate={handleCreate} disabled={busy}/>
                {Error ?(
                    <p style= {{ marginTop:12, color:"crimson"}}>{Error}</p>

                ): null}
                {Loading ? (
                    <p> cargando... </p>
                ):(
                    <TaskList tasks = {tasks} 
                    onToggle={handleToggle} 
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    disabled={busy}/>
                )}
            </div>
             
        
    )
}