import React, { useContext, useEffect, useState } from 'react'
import Peer from 'simple-peer'
import { AuthContext } from '../../context/authContext'
import { VideoCallContext } from '../../context/videoCallContext'

export const Webcam = () => {

  const { user } = useContext(AuthContext)
  const { videoRef, socket, videoCallFinished, startVideoCall } = useContext(VideoCallContext)
  const [userName, setUserName] = useState('')
  const [stream, setStream] = useState()

  let peer

  const accessCamera = () => {
    startVideoCall()

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {

        setStream(stream)

        const streamDetails = stream
          ? {
            id: stream.id,
            tracks: stream.getTracks().map((track) => ({ id: track.id, kind: track.kind })),
            options: {
              video: stream.getVideoTracks()[0].getSettings(),
              audio: stream.getAudioTracks()[0].getSettings(),
            },
          }
          : null

        peer = new Peer({ initiator: true, stream });

        peer.on('signal', (data) => {
          socket.emit('stream', { signal: data, streamDetails, user });
        });

        socket.on('stream', (data) => {
          const { signal, streamDetails, user } = data;

          setUserName(user.displayName)

          const remoteStream = new MediaStream();

          streamDetails.tracks.forEach(trackDetails => {
            const trackIndex = stream.getTracks().findIndex(track => track.id === trackDetails.id)
            const track = trackIndex !== -1 ? stream.getTracks()[trackIndex] : null
            // console.log('Track:', track);
            if (track) {
              remoteStream.addTrack(track)
            }
          })

          videoRef.current.srcObject = remoteStream

        });
      }).catch((error) => {
        alert('Sin los permisos de la cámara y el micrófono no puedes unirte a la llamada')
      })
  }

  socket.on('disconnect', () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    setStream(null);
    videoRef.current.srcObject = null
  })

  useEffect(() => {
    videoCallFinished()
  }, [])

  return (
    <div>
      <button onClick={accessCamera}><i className="fa-solid fa-phone"></i></button>
      <button onClick={() => videoCallFinished()}>Cortar</button>
      <video ref={videoRef} width={300} autoPlay playsInline />
      <span>Camera de: {userName}</span>
    </div>
  )
}
