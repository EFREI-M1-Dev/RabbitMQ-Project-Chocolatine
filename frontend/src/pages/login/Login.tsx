import { useState } from 'react';
import styles from "../login/_Login.module.scss";

const LoginPage = ({ onLogin }: { onLogin: (userId: string) => void }) => {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        const userId = username || `user_${Date.now()}`;
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        onLogin(userId);
    };

    return (
        <div className={styles.container}>
            <h1>Entrer un pseudonyme</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
            />
            <button onClick={handleLogin}>Rejoindre la discussion</button>
        </div>
    );
};

export default LoginPage;
