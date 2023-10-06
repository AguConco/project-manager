import { Link, useParams } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useContext, useEffect, useState } from "react"
import './Project.css'
import { ListStages } from "../ListStages/ListStages"
import { Loading } from "../Loading/Loading"
import { Members } from "../Members/Members"
import { Notifications } from "../Notifications/Notifications"
import { ProjectsContext } from "../../context/projectsContext"

export const Project = () => {

    const { user } = useContext(AuthContext)
    const { getProjects } = useContext(ProjectsContext)
    const { id } = useParams()

    const [project, setPoject] = useState(null)
    const [foundProject, setFoundProject] = useState(true)

    useEffect(() => {

        setPoject(null)
        setFoundProject(true)

        user !== null
            && getProjects({ admin: user.uid, id })
                .then(e => e.json())
                .then(e => {
                    e.length === 0 ? setFoundProject(false) : setPoject(e[0])
                    // document.title = e[0].name
                })
                .finally(()=> {
                    setFoundProject(false)
                })

        // socket.on('selectProject', (e) => {
        //     e.length === 0 ? setFoundProject(false) : setPoject(e[0])
        // })

        // user !== null
        //     ? socket.emit('selectProject', { admin: user.uid, id })
        //     : setPoject(null)

    }, [id, user])



    return (
        <section>
            {project !== null
                ? <>
                    <header className="header-project">
                        <h1 className="name-project">{project.name}</h1>
                        <div className="option-project">
                            <Notifications code={project.code} id={id} />
                            <span>Ajustes</span>
                        </div>
                    </header>
                    <nav className='nav-project'>
                        <Members code={project.code} id={id} />
                        <div className="progress-project">
                            <div className='progress-completed' style={{ width: (parseInt(project.progress) * 180) / 100 }}></div>
                            <div className='progress-total'></div>
                            <span>{project.progress}%</span>
                        </div>
                    </nav>
                    <ListStages />
                </>
                : foundProject
                    ? <Loading />
                    : <div className="project-not-found"><p>No se encontró el proyecto <Link to={'/project'}>Volver al inicio</Link></p></div>
            }
        </section>

    )
}