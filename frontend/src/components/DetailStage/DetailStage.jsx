import { useContext, useEffect, useState } from 'react'
import './DetailStage.css'
import { socket } from '../Project/project'
import { useParams } from 'react-router-dom'
import { NewTask } from '../NewTask/NewTask'
import { ProjectsContext } from '../../context/projectsContext'
import { Loading } from '../Loading/Loading'
import { SectionTask } from '../SectionTask/SectionTask'

export const DetailStage = ({ id }) => {

    const { newTask, setNewTask } = useContext(ProjectsContext)

    const [expanded, setExpanded] = useState(false)
    const [stage, setStage] = useState(null)
    const [taskState, setTaskState] = useState('')

    const { idStage } = useParams()

    socket.on('stage', (e) => setStage(e.data[0]))


    useEffect(() => {
        setStage(null)
        setNewTask(null)
        setTaskState('')
        socket.emit('stage', { idStage: idStage, idProject: id })
    }, [idStage])


    return (
        stage !== null
            ? <section className='section-detail-stage'>
                <header>
                    <div>
                        <h2>{stage.name} <span>{stage.task_completed}/{stage.task_quantity}</span></h2>
                        <button className='btn-new-task' onClick={() => setNewTask({ stageName: stage.name, id: stage.id, comes: 'stage', idProject: id })}>Nueva tarea</button>
                    </div>
                    <p
                        className='description-stage'
                        style={expanded ? { display: 'block' } : { display: '-webkit-box' }}
                        onClick={() => setExpanded(!expanded)}>
                        {stage.description}
                    </p>
                </header>
                <nav className='nav-task-status'>
                    <ul>
                        <li><button className={taskState === '' ? 'task-state-selected' : ''} onClick={() => setTaskState('')}>Tareas</button></li>
                        <li><button className={taskState === 'process' ? 'task-state-selected' : ''} onClick={() => setTaskState('process')}>En proceso</button></li>
                        <li><button className={taskState === 'completed' ? 'task-state-selected' : ''} onClick={() => setTaskState('completed')}>Completadas</button></li>
                    </ul>
                </nav>
                <SectionTask state={taskState} idStage={stage.id} idProject={stage.id_project} />
                {(newTask !== null && newTask.comes === "stage") && <NewTask />}
            </section>
            : <Loading height={30} width={30} />
    )
}