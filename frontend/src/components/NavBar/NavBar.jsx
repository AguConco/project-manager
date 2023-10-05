import './NavBar.css'
import notPhoto from '../../assets/img/no_photo.jpg'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Header } from '../Header/Header'
import { ProjectsContext } from '../../context/projectsContext'
import { Link } from 'react-router-dom'

export const NavBar = () => {

    const { user, logOut } = useContext(AuthContext)
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
            <div className="user">
                <div className="container-img-user">
                    <img src={user.photoURL ? user.photoURL : notPhoto} alt="" />
                </div>
                <span className="name-user">{user.displayName}</span>
                <div className="user-options" onClick={logOut}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        </div>
    )
}