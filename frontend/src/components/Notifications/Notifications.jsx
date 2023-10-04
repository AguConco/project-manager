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
                            <li key={(e) => e}>
                                <div><img src={e.userPhoto} /></div>
                                <span>{e.userName}</span>
                            </li>
                        ))
                        : <span className="not-notifications">No hay notificaciones</span>
                    }
                </ul>

            }
        </div>
    )
}