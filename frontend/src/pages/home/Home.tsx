import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styles from "../home/_Home.module.scss";

const HomePage = ({ userId }: { userId: string }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem('userId'); // Supprimer l'userId du localStorage
        };

        const socket = io('http://localhost:5000', {
            query: { userId },
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('chat message', (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        setSocket(socket);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            socket.disconnect();
        };
    }, [userId]);

    const sendMessage = () => {
        if (message.trim() !== '' && socket) {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatContainer}>
                <h2>Chats</h2>
                {/* Display chat list */}
            </div>
            <div className={styles.messageContainer}>
                    <h2>Messages</h2>
                    <div className={styles.messageList}>
                        {messages.map((msg, index) => (
                            <div key={index} className={styles.message}>
                                <p>{msg}</p>
                            </div>
                        ))}
                    </div>
                <div className={styles.messageInput}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Votre message"
                    />
                    <button onClick={sendMessage}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
