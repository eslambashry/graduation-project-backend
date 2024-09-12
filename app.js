import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectionDB } from './DB/connection.js';
import userRoutes from './src/modules/user/user.routes.js';
import cors from 'cors';
import doctorRoutes from './src/modules/doctors/doctor.routes.js';
import appointmentRoutes from './src/modules/appointments/appointment.routes.js';

const app = express();
const port = 5000;

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

connectionDB;
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

});
export { io };

server.listen(port, () => console.log(`Server running on port ${port} 🧬`));
