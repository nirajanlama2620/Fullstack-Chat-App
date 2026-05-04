<div align="center">

<h1>💬 Full Stack Chat Application</h1>

<p>
A real-time chat application built using MERN stack with Socket.io for instant messaging and JWT authentication for secure login.
</p>

<p>
<strong>🚀 Live Demo:</strong><br>
<a href="https://fullstack-chat-app-0sy4.onrender.com" target="_blank">
https://fullstack-chat-app-0sy4.onrender.com
</a>
</p>

</div>

---

<h2>📌 Overview</h2>
<p>
This is a full-stack real-time chat application that allows users to register, log in, and communicate instantly.
It uses Socket.io for real-time communication, MongoDB for data storage, and JWT for authentication.
</p>

---

<h2>✨ Features</h2>

<ul>
  <li>🔐 User Authentication (Signup / Login with JWT)</li>
  <li>💬 Real-time one-to-one messaging</li>
  <li>🟢 Online / offline user status</li>
  <li>📜 Persistent chat history stored in MongoDB</li>
  <li>⚡ Instant message delivery using Socket.io</li>
  <li>👤 Active user list</li>
  <li>📱 Fully responsive UI (mobile + desktop)</li>
  <li>🔄 Real-time updates without refresh</li>
</ul>

---

<h2>🛠️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React.js</li>
  <li>Axios</li>
  <li>Socket.io-client</li>
  <li>CSS / Tailwind CSS</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>Socket.io</li>
  <li>JWT Authentication</li>
  <li>bcrypt.js</li>
</ul>

<h3>Database</h3>
<ul>
  <li>MongoDB (Mongoose)</li>
</ul>

<h3>Deployment</h3>
<ul>
  <li>Render</li>
</ul>

---

<h2>📁 Project Structure</h2>

<pre>
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── socket/
 └── server.js

frontend/
 ├── components/
 ├── pages/
 ├── services/
 └── App.jsx
</pre>

---

<h2>⚙️ Setup Instructions</h2>

<h3>1. Clone Repository</h3>

<pre>
git clone https://github.com/nirajanlama2620
cd chat-app
</pre>

---

<h3>2. Backend Setup</h3>

<pre>
cd backend
npm install
npm start
</pre>

<p>Create <code>.env</code> file:</p>

<pre>
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
</pre>

---

<h3>3. Frontend Setup</h3>

<pre>
cd frontend
npm install
npm run dev
</pre>

---

<h2>🔌 How It Works</h2>

<ul>
  <li>User logs in using JWT authentication</li>
  <li>Socket connection is established after login</li>
  <li>Messages are sent and received instantly using Socket.io</li>
  <li>Chat history is stored in MongoDB</li>
  <li>Online users tracked via socket connections</li>
</ul>

---

<h2>🚀 Future Improvements</h2>

<ul>
  <li>Group chat support</li>
  <li>Message read receipts (seen/unseen)</li>
  <li>Typing indicators</li>
  <li>File / image sharing</li>
  <li>Push notifications</li>
</ul>

---

<h2>👨‍💻 Author</h2>

<p>
<strong>Nirajan Lama</strong><br>
GitHub: <a href="https://github.com/nirajanlama2620" target="_blank">
https://github.com/nirajanlama2620
</a>
</p>

---

<div align="center">

<p>⭐ If you like this project, consider giving it a star!</p>

</div>
