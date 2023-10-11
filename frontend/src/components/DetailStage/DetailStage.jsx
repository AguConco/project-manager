import { useEffect, useState } from 'react'
import './DetailStage.css'
import { socket } from '../Project/project'
import { useParams } from 'react-router-dom'

export const DetailStage = ({ id }) => {


    const [expanded, setExpanded] = useState(false)
    const [stage, setStage] = useState(null)

    const { idStage } = useParams()

    socket.on('stage', (e) => {
        setStage(e.data[0])
    })

    useEffect(() => {
        setStage(null)
        socket.emit('stage', { idStage: idStage, idProject: id })
    }, [idStage])

    return (
        stage !== null &&
        <section className='section-detail-stage'>
            <header>
                <div>
                    <h2>{stage.name} <span>{stage.task_completed}/{stage.task_quantity}</span></h2>
                    <button className='btn-new-task'>Nueva tarea</button>
                </div>
                <p
                    className='description-stage'
                    style={expanded ? { display: 'block' } : { display: '-webkit-box' }}
                    onClick={() => setExpanded(!expanded)}>
                    {stage.description}
                </p>
            </header>

        </section>
    )
}