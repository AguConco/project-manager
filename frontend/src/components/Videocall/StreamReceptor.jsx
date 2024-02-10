import { useRef } from "react"

export const StreamReceptor = ({ data }) => {

    const videoRef = useRef(null)

    return (
        <div className="video">
            <video ref={videoRef} autoPlay playsInline height="100%" width="100%"></video>
            <div className={'container-img'}>
                <img src={data.photoURL} alt={data.displayName} />
                <span>{data.displayName}</span>
            </div>
        </div>
    )
}
