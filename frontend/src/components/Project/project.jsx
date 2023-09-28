import { Link, useParams } from "react-router-dom"
import { ProjectsContext } from "../../context/projectsContext"
import { AuthContext } from "../../context/authContext"
import { useContext, useEffect, useState } from "react"
import './Project.css'
import { ListStages } from "../ListStages/ListStages"
import { Loading } from "../Loading/Loading"

export const Project = () => {

    const { user } = useContext(AuthContext)
    const { getProjects } = useContext(ProjectsContext)
    const { id } = useParams()

    const [project, setPoject] = useState(null)

    useEffect(() => {
        setPoject(null)
        user !== null
            && getProjects({ admin: user.uid, id })
                .then(e => e.json())
                .then(e => setPoject(e[0]))
    }, [id, user])

    return (
        <section>
            {project !== null
                ? <>
                    <header className="header-project">
                        <h1 className="name-project">{project.name}</h1>
                        <span>Ajustes</span>
                    </header>
                    <nav className='nav-project'>
                        <div>
                            <Link to={"/members/" + project.code} className="members">
                                Miembros del grupo
                            </Link>
                            <button>Invitar</button>
                        </div>
                        <div className="progress-project">
                            <div className='progress-completed' style={{ width: (parseInt(project.progress) * 180) / 100 }}></div>
                            <div className='progress-total'></div>
                            <span>{project.progress}%</span>
                        </div>
                    </nav>
                    <ListStages />
                </>
                : <Loading />
            }
        </section>

    )
}