import { useEffect, useState } from "react"
import { socket } from "../Project/project"
import { Task } from "../Task/Task"

export const SectionTask = ({ state, idProject, idStage }) => {
    const [tasks, setTasks] = useState([])

    socket.on('tasks', (e) => setTasks(e.data))

    useEffect(() => {
        socket.emit('tasks', { idProject, idStage, state })
    }, [state])

    return (
        tasks.length !== 0
            ? <div className="task-list">
                {tasks.map((e) => <Task task={e} />)}
            </div>
            : <div>
                no hay tareas {state === 'process' ? 'en proceso' : 'completadas'}
            </div>
    )
}