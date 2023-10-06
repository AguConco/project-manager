import { useEffect, useState } from "react"
import './Notifications.css'
import io from 'socket.io-client'
import { backURL } from "../../data/constants"

export const Notifications = ({ code, id }) => {

    const [notifications, setNotification] = useState([])
    const [notificationsVisible, setNotificationVisble] = useState(false)

    const socket = io(backURL)

    socket.on('notifications', (res) => {
        setNotification(res)
    })

    const acceptRequest = () => {
    }

    const rejectRequest = () => {
    }

    useEffect(() => {
        socket.emit('notifications', { code, id })
    }, [])

    return (

        <div className="container-notifications">
            {notifications.length !== 0 && <div className="notification-icon"></div>}
            <button onClick={() => setNotificationVisble(e => !e)}>
                <i className="fa-regular fa-bell"></i>
            </button>
            {notificationsVisible &&
                <ul className="notifications">
                    {notifications.length !== 0
                        ? notifications.map(e => (
                            <li key={(e) => e} className="notification" >
                                <div className="container-img"><img src={e.userPhoto} /></div>
                                <p><span>{e.userName}</span> quiere unirse al proyecto</p>
                                <div className="options-notification">
                                    <button onClick={acceptRequest}>
                                        <i className="fa-solid fa-check"></i>
                                        <span>Aceptar</span>
                                    </button>
                                    <button onClick={rejectRequest}>
                                        <i className="fa-solid fa-times"></i>
                                        <span>Rechazar</span>
                                    </button>
                                </div>
                            </li>
                        ))
                        : <span className="not-notifications">No hay notificaciones</span>
                    }
                </ul>

            }
        </div>
    )
}