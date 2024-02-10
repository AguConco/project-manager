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
    const videoRef = useRef(null)
    const { id } = useParams();

    let mediaRecorder
    let interval;

    const accessCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {

                mediaRecorder = new MediaRecorder(stream);

                let chunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const videoURL = URL.createObjectURL(blob);

                    videoRef.current.src = videoURL;
                    videoRef.current.play();

                    chunks = [];
                    mediaRecorder.start();
                };

                interval = setInterval(() => {
                    mediaRecorder.stop();
                }, 5000);

                mediaRecorder.start()

            })
            .catch((error) => {
                alert('Sin los permisos de la cámara y el micrófono no puedes unirte a la llamada');
            })
    }

    const disconnectVideocall = () => socket.emit('user-disconnected', { userId: user?.uid, id });

    window.onbeforeunload = () => {
        disconnectVideocall()
        if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
        clearInterval(interval);
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
                    <video ref={videoRef} height={300} width={400} autoPlay ></video>
                </div>
                <ul className='options-videocall'>
                    <li><button onClick={accessCamera}><i className="fa-solid fa-video"></i></button></li>
                    <li><button onClick={() => mediaRecorder.stop()}><i className="fa-solid fa-video-slash"></i></button></li>
                    <li><Link to={'/project/' + id}><button><i className="fa-solid fa-phone-slash"></i></button></Link></li>
                </ul>
            </section>
        </section>
    );


};



