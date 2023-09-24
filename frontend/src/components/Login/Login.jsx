import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './Login.css'
import facebook from '../../assets/img/facebook.png'
import google from '../../assets/img/google.png'

export function Login() {
    const { user, loginWhitGoogle, loginWhitFacebook } = useContext(AuthContext)
    const [error, setError] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        user !== null && navigate('/project/empty')
    }, [user])

    return (
        <section className='login'>
            <h1>Ingresa a la aplicación</h1>
            <div>
                <button className='btn-auth' onClick={() => loginWhitGoogle(setError)}><img src={google} /> Ingresar con Google</button>
                <button className='btn-auth' onClick={() => loginWhitFacebook(setError)}><img src={facebook} /> Ingresar con Facebook</button>
            </div>
            {error && <span className='error'> {error} </span>}
        </section>
    )
}