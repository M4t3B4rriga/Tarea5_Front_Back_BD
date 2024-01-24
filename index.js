const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/miBaseDeDatos', { useNewUrlParser: true, useUnifiedTopology: true });

/* Definir un modelo simple
const Schema = mongoose.Schema;
const ejemploSchema = new Schema({
    mensaje: String,
});*/

//const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

/* Rutas
app.get('/api/usuarios', async (req, res) => {
    const usuarios = await Ejemplo.find();
    res.json(usuarios);
});*/

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});

const cors = require('cors');

app.use(cors());

const usuarioSchema = new Schema({
    username: String,
    password: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

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


/* Ruta para crear un nuevo mensaje
app.post('/api/mensajes', async (req, res) => {
    const { mensaje } = req.body;

    try {
        const nuevoMensaje = new Ejemplo({ mensaje });
        await nuevoMensaje.save();
        res.json({ mensaje: 'Mensaje creado con éxito' });
    } catch (error) {
        console.error('Error al crear mensaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});*/