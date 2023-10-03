import { useEffect } from "react"

export const Members = ({ code, socket }) => {

    useEffect(() => {
        // socket.on('members', (res) => {
        //     console.log(res)
        // })

        // socket.emit('members', code)
    }, [])

    return (
        <div>
            <div className="members">

            </div>
            <div>
                <button>Invitar</button>
                <span>{code}</span>
            </div>
        </div>
    )
}