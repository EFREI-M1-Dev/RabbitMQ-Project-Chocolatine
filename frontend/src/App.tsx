import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import HomePage from './pages/home/Home';
import LoginPage from './pages/login/Login';

const App = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const socket = io('http://localhost:5000');
            socket.on('connect', () => {
                socket.emit('request user id');
            });
            socket.on('user id', (id) => {
                localStorage.setItem('userId', id);
                setUserId(id);
                socket.disconnect();
            });
        }
    }, []);

    if (!userId) {
        return <LoginPage onLogin={setUserId} />;
    }

    return <HomePage userId={userId} />;
};

export default App;
