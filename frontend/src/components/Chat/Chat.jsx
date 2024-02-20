import { useParams } from 'react-router-dom'
import { backURL } from '../../data/constants'
import './Chat.css'
import { io } from 'socket.io-client'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'

const socket = io(backURL, { path: '/chat' })

export const Chat = () => {

    const { user } = useContext(AuthContext);

    const { id } = useParams()

    const [message, setMessage] = useState()

    const disconnectVideocall = () => socket.emit('user-disconnected', { userId: user?.uid, id });

    socket.on('users-online', (e) => {})

    socket.on('receive-message', (e)=> {
        setMessage(e)
        console.log()
    })

    useEffect(() => {

        if (user) {
            const { displayName, uid, photoURL } = user
            socket.emit('user-connected', { user: { displayName, uid, photoURL }, id })
        }

        return () => disconnectVideocall()

    }, [id, user]);

    return (
        <div>
            <input type="text" placeholder='Escribir un mensaje' onKeyUp={(e) => setMessage(e.target.value)}/>
            <button type="button" onClick={() => { socket.emit('send-message', {message, id}) }}>enviar</button>
            {message}
        </div>
    )
}