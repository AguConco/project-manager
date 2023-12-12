import { Link, Route, Routes, useParams } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useContext, useEffect, useState } from "react"
import './Project.css'
import { ListStages } from "../ListStages/ListStages"
import { Loading } from "../Loading/Loading"
import { Members } from "../Members/Members"
import { Notifications } from "../Notifications/Notifications"
import { ProjectsContext } from "../../context/projectsContext"
import { io } from "socket.io-client"
import { backURL } from "../../data/constants"
import { DetailStage } from "../DetailStage/DetailStage"
import { Webcam } from "../Webcam/Webcam"

export const socket = io(backURL)

export const Project = () => {

    const { user } = useContext(AuthContext)
    const { getProjects } = useContext(ProjectsContext)

    const { id } = useParams()

    const [project, setProject] = useState(null)
    const [foundProject, setFoundProject] = useState(true)

    useEffect(() => {
        setProject(null)
        setFoundProject(true)

        user !== null
            && getProjects({ admin: user.uid, id })
                .then(e => e.json())
                .then(e => {
                    e.length === 0 ? setFoundProject(false) : setProject(e[0])
                    document.title = e[0]?.name || 'Proyecto no encontrado'
                })
                .finally(() => {
                    setFoundProject(false)
                })
    }, [id, user])

    return (
        <section>
            {project !== null
                ? <>
                    <header className="header-project">
                        <h1 className="name-project">{project.name}</h1>
                        <div className="option-project">
                            {project.admin === user.uid && <Notifications project={project} id={id} admin={user.uid} />}
                            <span>Ajustes</span>
                        </div>
                    </header>
                    <nav className='nav-project'>
                        <div>
                            <Members code={project.code} id={id} />
                        </div>
                        <div className="progress-project">
                            <div className='progress-completed' style={{ width: (parseInt(project.progress) * 180) / 100 }}></div>
                            <div className='progress-total'></div>
                            <span>{project.progress}%</span>
                        </div>
                    </nav>
                    <ListStages />
                    <Routes>
                        <Route path={'/:idStage'} element={<DetailStage id={id} />} />
                    </Routes>
                    <Webcam />
                </>
                : foundProject
                    ? <Loading />
                    : <div className="project-not-found"><p>No se encontró el proyecto <Link to={'/project'}>Volver al inicio</Link></p></div>
            }
        </section>

    )
}