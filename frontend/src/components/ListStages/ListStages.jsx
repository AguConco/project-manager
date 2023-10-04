import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ProjectsContext } from "../../context/projectsContext"
import { AuthContext } from "../../context/authContext"
import { Stage } from "../Stage/Stage"
import { DataStage } from "../DataStage/DataStage"

export const ListStages = () => {

    const { user } = useContext(AuthContext)
    const { getStage, setIdProject } = useContext(ProjectsContext)

    const { id } = useParams()

    const [listStage, setListStage] = useState([])
    const [newStage, setNewStage] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setIdProject(id)

        user !== null
            && getStage(id)
                .then(e => e.json())
                .then(e => setListStage(e.data))
    }, [user, id])

    return (
        <div className='list-stages'>
            {newStage
                ? <DataStage setNewStage={setNewStage} setMessage={setMessage} />
                : <button className="create-new-stage" onClick={() => setNewStage(true)}>Crear nueva etapa</button>
            }
            {listStage.map(e => <Stage data={e} />)}
        </div>
    )
}