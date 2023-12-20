import { useContext, useEffect, useRef, useState } from 'react';
import './Videocall.css';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Peer from 'simple-peer';
import { backURL } from '../../data/constants'
import { io } from "socket.io-client";
import { StreamReceptor } from './StreamReceptor';

const socket = io(backURL, { path: '/videocall' })

export const Videocall = () => {
    const { user } = useContext(AuthContext);


    const [myStream, setMyStream] = useState();
    const [usersConnected, setUsersConnected] = useState([]);
    const { id } = useParams();
    let peer;

    const accessCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setMyStream(stream);

                const streamDetails = stream
                    ? {
                        id: stream.id,
                        tracks: stream.getTracks().map((track) => ({ id: track.id, kind: track.kind })),
                        options: {
                            video: stream.getVideoTracks()[0].getSettings(),
                            audio: stream.getAudioTracks()[0].getSettings(),
                        },
                    }
                    : null;

                peer = new Peer({ initiator: true, stream });

                peer.on('signal', (data) => {
                    // signal = data
                    socket.emit('video-stream', { streamDetails, user, id });
                });

                socket.on('disconnect', () => {
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                    }
                });
            })
            .catch((error) => {
                alert('Sin los permisos de la cámara y el micrófono no puedes unirte a la llamada');
            });
    };

    const blockCamera = async () => {
        // Detener la transmisión local
        myStream && myStream.getTracks().forEach(track => track.stop());

        // Emitir la desconexión de la transmisión
        socket.emit('video-stream', { streamDetails: null, user, id });

    };

    socket.on('users-online', (users) => {
        setUsersConnected(users)
    })

    const disconnectVideocall = () => socket.emit('user-disconnected', { userId: user?.uid, id });

    window.onbeforeunload = () => {
        disconnectVideocall()
    }

    useEffect(() => {

        if (user) {
            const { displayName, uid, photoURL } = user
            socket.emit('user-connected', { user: { displayName, uid, photoURL }, id })
        }

        return () => disconnectVideocall()

    }, [id, user]);

    return (
        <section className='section-videocall'>
            <section className="section-videocall">
                <div className='container-video'>
                    {usersConnected.map((e) => <StreamReceptor key={e.uid} data={e} socket={socket}/>)}
                </div>
                <ul className='options-videocall'>
                    <li><button onClick={accessCamera}><i className="fa-solid fa-video"></i></button></li>
                    <li><button onClick={blockCamera}><i className="fa-solid fa-video-slash"></i></button></li>
                    <li><Link to={'/project/' + id}><button><i className="fa-solid fa-phone-slash"></i></button></Link></li>
                </ul>
            </section>
        </section>
    );
};
