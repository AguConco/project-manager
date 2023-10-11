import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProjectsContext } from "../../context/projectsContext"
import { Stage } from "../Stage/Stage"
import { DataStage } from "../DataStage/DataStage"
import { socket } from "../Project/project"
import { Loading } from "../Loading/Loading"
import { DetailStage } from "../DetailStage/DetailStage"

export const ListStages = () => {

    const { setIdProject } = useContext(ProjectsContext)

    const { id } = useParams()

    const [listStage, setListStage] = useState(null)
    const [newStage, setNewStage] = useState(false)
    const [message, setMessage] = useState('')

    socket.on('listStage', (e) => {
        setListStage(e.data)
    })

    useEffect(() => {
        setIdProject(id)
        socket.emit('listStage', id)
    }, [])

    return (
        <>
            <div className="container-list-stage">
                {newStage && <div className="container-new-stage">
                    <DataStage setNewStage={setNewStage} setMessage={setMessage} />
                    {/* {message !== null && <span className={message.status ? 'message-success' : 'message-error'}>{message.text}</span>} */}
                </div>
                }
                <div className='list-stages'>
                    <button className="create-new-stage" onClick={() => setNewStage(true)}>Crear nueva etapa</button>
                    {listStage !== null
                        ? listStage.map(e => <Stage key={e.id} data={e} />)
                        : <Loading height={25} width={25} />
                    }
                </div>
            </div>
        </>
    )
}