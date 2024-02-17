# ChatHub Messenger

Welcome to ChatHub Messenger - where instant connections come to life! Engage in real-time, one-day chat sessions with strangers effortlessly, fostering a dynamic and ephemeral chat environment. Here are the key features that make ChatHub Messenger stand out:

## Features

- **Instant Connections:** Seamlessly connect with strangers in real-time, engaging in one-day chat sessions that add an element of excitement to every conversation.
- **Anonymous Entry:** Begin chatting with just a username, ensuring privacy and allowing users to enjoy the chat experience without sharing personal details.
- **Ephemeral Messaging:** Embrace the ephemeral nature of ChatHub Messenger, where accounts automatically vanish after 24 hours. This ensures a fresh and dynamic chat environment, promoting spontaneous and lively conversations.
- **Live Chat:** Engage in real-time conversations with other users through the live chat feature.
- **Responsive Dark Theme UI:** Enjoy a visually appealing and responsive dark theme UI that enhances the overall chat experience, making it easy on the eyes and suitable for different devices.
- **Active Users in the Same Timeframe:** Connect with users who are active within the same 24-hour timeframe, creating a lively and engaging chat community.

## Tools and Technologies

### Client-Side Libraries

- **React.js:** A JavaScript library for building user interfaces.
- **Redux.js:** A predictable state container for JavaScript apps.
- **TailwindCSS:** A utility-first CSS framework for rapidly building custom designs.
- **Ant Design:** A design system for enterprise-level products.

**HTTP Client:**

- **Axios:** A promise-based HTTP client for making requests to APIs. Axios is used to interact with the server-side API.

### Server-Side Technologies

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A minimal and flexible Node.js web application framework.
- **Socket.io:** Real-time bidirectional event-based communication.
- **MongoDB (Mongoose):** A NoSQL database used to store and retrieve data.
- **JWT Token:** JSON Web Token for user authentication.

## Access the live project

The live project can be accessed at [https://chathubmessenger.vercel.app](https://chathubmessenger.vercel.app)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mhdafs/chathub-messenger.git
   ```

2. **Set up environment variables:**

    Create a `.env` file in the root directory or rename the current `.env.sample` file and configure necessary variables for client and server sides.

    **Client ENV**

   ```bash
   VITE_GOOGLE_ID = google-auth-id
   VITE_USER_URL = user-backend-url
   VITE_ADMIN_URL = admin-base-url
   ```

    **Server ENV**

   ```bash
   MONGO_URL =  mongo-atlas-url
   CLIENT_URL = react-frontend-url
   JWT_SECRET = jwt-secret-code
   ```

3. **Navigate to the client directory:**

    Open a terminal in Visual Studio Code and split it into two terminals. In the first terminal, navigate to the client directory:

    ```bash
    cd client
    ```

4. **Install client side dependencies:**

    ```bash
    npm install
    ```

5. **Start the client-side application:**

    ```bash
    npm start
    ```

    The client-side application will be running on [http://localhost:3000](http://localhost:3000)

6. **Navigate to the server directory:**

    In the second terminal, navigate to the server directory:

    ```bash
    cd server
    ```

7. **Install server side dependencies:**

    ```bash
    npm install
    ```

8. **Start the server:**

    ```bash
    npm start
    ```

    The server will be running on [http://localhost:5000](http://localhost:5000)

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.
