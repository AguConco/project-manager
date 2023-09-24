import './NavBar.css'
import notPhoto from '../../assets/img/no_photo.jpg'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { Header } from '../Header/Header'

export const NavBar = () => {

    const { user, logOut } = useContext(AuthContext)

    return (
        user !== null &&
        <div className="nav-bar">
            <Header />
            <nav>
                <div>
                    <i className="fa-solid fa-diagram-project" style={{ color: "#E25016" }}></i> <span>Proyectos</span>
                </div>
                <ul>
                    {/* obtener todos los proyectos */}
                </ul>
            </nav>
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