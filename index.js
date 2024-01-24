const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/miBaseDeDatos', { useNewUrlParser: true, useUnifiedTopology: true });



const usuarioSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

app.get('/api/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    console.log('Solicitud POST de usuario recibida:', req.body);
    const { username, password } = req.body;

    try {
        const nuevoUsuario = new Usuario({ username, password });
        await nuevoUsuario.save();
        const usuarios = await Usuario.find();
        console.log('Usuarios en la base de datos:', usuarios);
        res.json(usuarios);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});
