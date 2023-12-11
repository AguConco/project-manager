import './NavBar.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Header } from '../Header/Header'
import { ProjectsContext } from '../../context/projectsContext'
import { Link } from 'react-router-dom'
import { UserData } from '../UserData/UserData'

export const NavBar = () => {

    const { user } = useContext(AuthContext)
    const { idProject, getProjects, getProjectsByCode } = useContext(ProjectsContext)

    const [projects, setPojects] = useState([])
    const [pendingProjects, setPendingProjects] = useState([])

    useEffect(() => {
        if (user !== null) {
            Promise.all([getProjects({ admin: user.uid, id: '' }), getProjectsByCode(user.uid)])
                .then(([projectById, projectByCode]) => {
                    return Promise.all([projectById.json(), projectByCode.json()])
                })
                .then(([projectById, projectByCode]) => {
                    setPojects([...projectById, ...projectByCode.filter(e => e.member === 'true')]);
                    setPendingProjects(() => projectByCode.filter(e => e.member === 'pending'))
                })
                .catch(error => {
                    // Manejo de errores
                    console.error('Error:', error);
                })
        }
    }, [user, idProject])

    return (
        user !== null &&
        <div className="nav-bar">
            <Header />
            <div className='container-navs'>
                <nav>
                    <div>
                        <i className="fa-solid fa-diagram-project" style={{ color: "#E25016" }}></i> <span>Proyectos</span>
                    </div>
                    <ul className='project-list'>
                        {projects.map(e => (
                            <li key={e.id}><Link to={'/project/' + e.id}>{e.name}</Link></li>
                        ))}
                    </ul>
                </nav>
                <nav>
                    <div>
                        <i className="fa-solid fa-diagram-project" style={{ color: "#E25016" }}></i> <span>Proyectos pendientes</span>
                    </div>
                    <ul className='project-list'>
                        {pendingProjects.map(e => (
                            <li key={e.id}><Link to={'/project/' + e.id}>{e.name}</Link></li>
                        ))}
                    </ul>
                </nav>
            </div>
            <UserData />
        </div>
    )
}