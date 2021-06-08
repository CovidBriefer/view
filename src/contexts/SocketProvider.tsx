import React, { useContext, useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

const SocketContext = React.createContext<Socket | null>(null)

export function useSocket() {
    return useContext(SocketContext)
}

export const SocketProvider: React.FC = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const newSocket = io("http://localhost:7233", {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 10,
            transports: ["websocket"]
        })
        newSocket.on("connect", () => {
            setSocket(newSocket)
        })

        return () => {
            console.log("Closing socket!")
            newSocket.close()
        }
    }, [])

    return <SocketContext.Provider value={socket ?? null}>{children}</SocketContext.Provider>
}
