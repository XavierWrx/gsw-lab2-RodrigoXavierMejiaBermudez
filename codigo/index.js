const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 9090;
const DB_FILE = path.join(__dirname, 'pedidos.json');

// 1. Ruta de prueba: GET /api/saludo?nombre=X
app.get('/api/saludo', (req, res) => {
  const nombre = req.query.nombre || 'Cliente';
  res.json({
    mensaje: `¡Hola, ${nombre}! Bienvenido a Dulce Hogar.`,
    fecha: new Date().toISOString()
  });
});

// 2. Ruta de pedidos: GET /api/pedido?cliente=X&pastel=Y&fecha=Z
app.get('/api/pedido', (req, res) => {
  const { cliente, pastel, fecha } = req.query;

  // Validación: ninguno puede faltar ni estar vacío
  if (!cliente || !pastel || !fecha) {
    return res.status(400).json({
      error: 'Parámetros incompletos. Se requiere cliente, pastel y fecha.'
    });
  }

  // Generar ID único con prefijo PED- + timestamp
  const pedidoId = `PED-${Date.now()}`;

  const nuevoPedido = {
    pedidoId,
    cliente,
    pastel,
    fecha,
    estado: 'confirmado'
  };

  // Persistir en pedidos.json
  let pedidos = [];
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      pedidos = data.trim() ? JSON.parse(data) : [];
    } catch (e) {
      pedidos = [];
    }
  }

  pedidos.push(nuevoPedido);
  fs.writeFileSync(DB_FILE, JSON.stringify(pedidos, null, 2));

  // Responder JSON confirmado
  res.status(201).json(nuevoPedido);
});

// Poner a escuchar en el puerto 9090
app.listen(PORT, () => {
  console.log(`Express de Dulce Hogar corriendo en http://localhost:${PORT}`);
});