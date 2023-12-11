import { useEffect, useState } from "react"
import './Notifications.css'
import { socket } from "../Project/project"
import { requestsToServer } from "../../data/functions"

export const Notifications = ({ project, id, admin }) => {

    const [notifications, setNotification] = useState([])
    const [notificationsVisible, setNotificationVisble] = useState(false)

    const { code, id: idProject } = project

    socket.on('notifications', (res) => {
        setNotification(res)
        res.length === 0 && setNotificationVisble(false)
    })

    socket.on('acceptRequest', () => {

    })

    const acceptRequest = (e) => {
        const route = '/project/accept'
        const method = 'PUT'
        const data = { code, uid: e.uid, admin }

        requestsToServer({ route, method, data })
            .then(e => e.json())
            .then(e => {
                console.log(e)
                socket.emit('notifications', { code, id: idProject })
                socket.emit('members', { code, id: idProject, uid: admin })
            })
    }

    const rejectRequest = (e) => {
        const route = '/project/reject'
        const method = 'DELETE'
        const data = { code, uid: e.uid, admin }

        requestsToServer({ route, method, data })
            .then(e => e.json())
            .then(e => {
                console.log(e)
                socket.emit('notifications', { code, id: idProject })
                socket.emit('members', { code, id: idProject, uid: admin })
            })
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
                            <li key={e.id} className="notification" >
                                <div className="container-img"><img src={e.userPhoto} /></div>
                                <p><span>{e.userName}</span> quiere unirse al proyecto</p>
                                <div className="options-notification">
                                    <button onClick={() => acceptRequest(e)}>
                                        <i className="fa-solid fa-check"></i>
                                        <span>Aceptar</span>
                                    </button>
                                    <button onClick={() => rejectRequest(e)}>
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