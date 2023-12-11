import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import notPhoto from '../../assets/img/no_photo.jpg'
import './UserData.css'

export const UserData = () => {
    const { user, logOut } = useContext(AuthContext)
    const [stateMenu, setStateMenu] = useState()

    return (
        <div className="account-options">
            <div className="container-img-user">
                <img src={user.photoURL ? user.photoURL : notPhoto} alt="" />
            </div>
            <span className="name-user">{user.displayName}</span>
            <div className="icon-account-options" onClick={() => setStateMenu(!stateMenu)}>
                <i className="fa-solid fa-angle-up"></i>
            </div>
            {stateMenu && <div className="account-menu">
                <ul>
                    <li><button onClick={logOut}> <i className="fa-solid fa-arrow-right-from-bracket"></i> Salir</button></li>
                </ul>
                <div className="user-data">
                    <div className="container-img-user">
                        <img src={user.photoURL ? user.photoURL : notPhoto} alt="" />
                    </div>
                    <pre>
                        <span className="name-user">{user.displayName}</span>
                        <span className="email-user">{user.email}</span>
                    </pre>
                    <div className="icon-account-options" onClick={() => setStateMenu(!stateMenu)}>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                </div>
            </div>}
        </div>
    )
}