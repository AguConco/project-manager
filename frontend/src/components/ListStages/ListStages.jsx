import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProjectsContext } from "../../context/projectsContext"
import { Stage } from "../Stage/Stage"
import { socket } from "../Project/project"
import { Loading } from "../Loading/Loading"
import { NewTask } from "../NewTask/NewTask"

export const ListStages = () => {

    const { setIdProject, newTask } = useContext(ProjectsContext)

    const { id } = useParams()

    const [listStage, setListStage] = useState(null)

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
                <ul className='list-stages'>
                    {listStage !== null
                        ? listStage.map(e => <Stage key={e.id} data={e} />)
                        : <Loading height={25} width={25} />
                    }
                </ul>
            </div>
            {(newTask !== null && newTask.comes === "list") && <NewTask />}
        </>
    )
}