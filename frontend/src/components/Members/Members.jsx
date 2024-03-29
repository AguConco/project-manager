import './Members.css'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { Loading } from "../../components/Loading/Loading"
import { socket } from '../Project/project'

export const Members = ({ code, id }) => {

    const { user } = useContext(AuthContext)

    const [members, setMembers] = useState([])
    const [copy, setCopy] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [optionsVisibles, setOptionsVisibles] = useState(false)


    socket.on('members', (res) => {
        setMembers(() => [
            { userName: user.displayName, userPhoto: user.photoURL, uid: user.uid }
            , ...res.filter(e => e.uid !== user.uid)
        ])
    })

    const copyCode = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setTimeout(() => setCopy(false), 5000)
                setCopy(true)
            })
            .catch((error) => {
                console.error('Error al copiar el código: ', error)
            });
    }

    const optionsInvitation = () => {
        setOptionsVisibles(!optionsVisibles)
        setShowCode(false)
    }

    useEffect(() => {
        setMembers([])
        socket.emit('members', { code, id, uid: user.uid })
    }, [])

    return (
        <div className="container-members">
            <div className="members-invitation-code">
                {optionsVisibles
                    && <div className='container-option-invitation'>
                        <p>
                            <span>
                                {code}
                                <button className='btn-copy-code' onClick={copyCode}>
                                    {copy
                                        ? <>
                                            <i className="fa-solid fa-copy"></i><pre>Copiado</pre>
                                        </>
                                        : <>
                                            <i className="fa-regular fa-copy"></i><pre>Copiar</pre>
                                        </>
                                    }
                                </button>
                            </span>
                        </p>
                        <button className='btn-back-invite' onClick={optionsInvitation}><i className="fa-solid fa-angle-up"></i></button>
                    </div>
                }
                <button className='btn-invite' onClick={optionsInvitation}>Invitar<i className="fa-solid fa-user-plus"></i></button>
            </div>
            <div className="members">
                {members.length !== 0
                    ? members.map(e =>
                        <div className='member' key={e.uid}>
                            <img src={e.userPhoto} alt="" />
                            <pre>{e.uid === user.uid ? 'Tú' : e.userName}</pre>
                        </div>
                    )
                    :
                    <Loading height={20} width={20} />
                }
            </div>
        </div>
    )
}