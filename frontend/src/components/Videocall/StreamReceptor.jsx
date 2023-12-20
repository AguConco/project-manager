import { useEffect, useRef, useState } from "react";

export const StreamReceptor = ({ data, socket }) => {

    const { stream } = data

    // socket.on('video-stream', (videoData) => {
        console.log(stream)
    // })

    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current && stream) {
            // const { tracks } = data.stream;

            // const mediaStream = new MediaStream();

            // tracks.forEach((trackDetails) => {
            //     const { id } = trackDetails;
            //     const existingTrack = mediaStream.getTracks().find((track) => track.id === id);


            //     if (existingTrack) {
            //         mediaStream.addTrack(existingTrack);
            //     }
            // });

            // const videoOptions = stream.options.video
            // // Información del audio
            // const audioOptions = stream.options.audio

            // navigator.mediaDevices.getUserMedia({
            //     video: videoOptions,
            //     audio: audioOptions
            // }).then((stream) => {
            //     // Asignar el stream al elemento de video
            //     videoRef.current.srcObject = stream;
            // })

        }
    }, [data])

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
