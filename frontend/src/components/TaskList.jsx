import TaskItem from "./TaskItem.jsx"


export default function TaskList ({ tasks =[], onToggle, onUpdate, onDelete, disabled}){
    if(tasks.length === 0) return <p> No hay tarea </p>

    return(
        <ul style={{
            marginTop: 18, padding: 0, listStyle: "none"
        }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete} 
                    onUpdate={onUpdate}
                    disabled={disabled}
                 
                />
            ))}
        </ul>
    )
}