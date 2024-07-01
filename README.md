# RabbitMQ-Project-Chocolatine
Application de Chat avec WebSocket et RabbitMQ

Cette application de chat permet à plusieurs utilisateurs de communiquer en temps réel via WebSocket, en utilisant RabbitMQ comme broker de messages. Chaque utilisateur se voit attribuer un identifiant unique pour participer aux discussions.

Il reste encore beaucoup à faire sur ce projet, mais il fonctionne en partie.
Quand on ouvre le client tout va bien, il peut envoyer et lire les messages.
Quand on ouvre un deuxième client, il se voit attribuer deux queues

## Technologies utilisées
- **Backend** : Node.js, Express.js, TypeScript
- **Frontend** : React, Socket.io, TypeScript
- **Message broker** : RabbitMQ

## Prérequis
- Node.js
- npm
- Docker

