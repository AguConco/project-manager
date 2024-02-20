import { useContext, useEffect, useState } from 'react'
import './Stage.css'
import { ProjectsContext } from '../../context/projectsContext'
import { socket } from '../Project/project'
import { Loading } from '../Loading/Loading'
import { Task } from '../Task/Task'

export const Stage = ({ data }) => {

    const { name, description, id, id_project, task_completed, task_quantity, color } = data

    const { setNewTask } = useContext(ProjectsContext)

    const [tasks, setTasks] = useState([])

    socket.on('tasks', (e) => setTasks(e.data))

    useEffect(() => {
        socket.emit('tasks', { idStage: id, idProject: id_project })
    }, [])

    return (
        <li className='stage' >
            <div>
                <div>
                    <h2 style={{color, borderColor: color}}>{name}</h2>
                    <span>{task_completed}/{task_quantity}</span>
                </div>
                <div className='options-stage'>
                    <button onClick={() => setNewTask({ stageName: name, id, comes: 'list', idProject: id_project })}><i className="fa-solid fa-plus"></i></button>
                    <button><i className="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
            <p>{description}
            </p>
            <div>
                {tasks.length !== 0
                    ? <div className="task-list">
                        {tasks.map((e) => e.id_stage === id && <Task task={e} key={e.id} />)}
                    </div>
                    : <Loading height={30} width={30} />
                }
            </div>
        </li>
    )
}