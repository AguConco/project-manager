import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ProjectsContext } from "../../context/projectsContext"
import { AuthContext } from "../../context/authContext"
import { Stage } from "../Stage/Stage"

export const ListStages = () => {

    const { user } = useContext(AuthContext)
    const { getStage } = useContext(ProjectsContext)

    const { id } = useParams()

    const [listStage, setListStage] = useState([])

    useEffect(() => {
        user !== null
            && getStage(id)
                .then(e => e.json())
                .then(e => setListStage(e.data))
    }, [user, id])

    return (
        <div className='list-stages'>
            <Link className="create-new-stage">Crear nueva etapa</Link>
            {listStage.map(e => <Stage data={e} />)}
        </div>
    )
}