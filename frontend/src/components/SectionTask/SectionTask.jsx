import { useEffect, useState } from "react"
import { socket } from "../Project/project"
import { Task } from "../Task/Task"
import { Loading } from "../Loading/Loading"

export const SectionTask = ({ state, idProject, idStage }) => {
    const [tasks, setTasks] = useState(null)

    socket.on('tasks', (e) => setTasks(e.data))

    useEffect(() => {
        setTasks(null)
        socket.emit('tasks', { idProject, idStage, state })
    }, [state])

    return (
        tasks !== null
            ? tasks.length !== 0
                ? <div className="task-list">
                    {tasks.map((e) => <Task task={e} />)}
                </div>
                : <div>
                    {state === ''
                        ? 'No hay tareas'
                        : state === 'process'
                            ? 'No hay tareas en proceso'
                            : 'No hay tareas completadas'}
                </div>
            : <Loading />
    )
}