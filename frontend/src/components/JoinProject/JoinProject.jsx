import { Link } from 'react-router-dom'
import './JoinProject.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import io from 'socket.io-client'
import { backURL } from '../../data/constants'

export const JoinProject = () => {

    const { user } = useContext(AuthContext)

    const [code, setCode] = useState('')
    const [message, setMessage] = useState(null)

    const socket = io(backURL)

    const submitInvitationCode = (e) => {
        e.preventDefault()

        socket.emit('memberRequests', { code, uid: user.uid, userName: user.displayName, userPhoto: user.photoURL })

        socket.on('memberRequests', (e) => {
            setMessage({ text: e.message, status: e.status })
            socket.emit('members', code)
        })
    }

    const pasteCode = () => {
        navigator.clipboard.readText()
            .then((text) => {
                setCode(text);
            })
            .catch((error) => {
                console.error('Error al leer el portapapeles: ', error);
            });
    };

    return (
        <section className="section-join-project">
            <div>
                <h1>Ingresa el código del proyecto que te quieres unir</h1>
                <form onSubmit={submitInvitationCode} className='form-invitation-code'>
                    <div >
                        <input type="text" placeholder='Código de invitación' onChange={({ target }) => setCode(target.value)} value={code} />
                        <div></div>
                        <button type='button' onClick={pasteCode}>
                            <i className="fa-regular fa-paste"></i>
                            <pre>Pegar código</pre>
                        </button>
                    </div>
                    {message !== null && <span className={message.status ? 'message-success' : 'message-error'}>{message.text}</span>}
                    <div className='container-btn'>
                        <Link to={'/project'} className='btn-cancel'>Cancelar</Link>
                        <button className='btn-join-project' type="submit">Unirse</button>
                    </div>
                </form>
            </div>
        </section>
    )
}