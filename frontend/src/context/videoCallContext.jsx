import { createContext, useRef } from "react";
import { backURL } from "../data/constants";
import { io } from "socket.io-client";

export const VideoCallContext = createContext()

export const VideoCallProvider = ({ children }) => {

    const socket = io(backURL)

    const videoRef = useRef();

    const videoCallFinished = () => socket.disconnect()

    const startVideoCall = () => socket.connect()

    return <VideoCallContext.Provider value={{
        videoRef,
        socket,
        videoCallFinished,
        startVideoCall
    }}>{children}</VideoCallContext.Provider>

}