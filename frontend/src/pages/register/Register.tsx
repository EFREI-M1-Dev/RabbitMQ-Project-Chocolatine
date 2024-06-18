import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // Logique pour envoyer les données d'inscription à RabbitMQ
        const message = {
            username,
            password
        };

        // Exemple : Envoi du message à RabbitMQ
        await sendMessageToRabbitMQ(message);

        // Réinitialisation des champs après l'inscription
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
