import './ErrorDatabase.css'

export const ErrorDatabase = () => {

    const exit = () => {
        window.close()
    }

    return (
        <div className='error-database'>
            <p>Error al conectar a la base de datos <br /> <span>Vuelve a probar dentro de un tiempo</span></p>
            <button onClick={exit}>Salir</button>
        </div>
    )
}