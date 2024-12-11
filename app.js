const express = require('express');
const mqtt = require('mqtt');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MQTT Web API',
      version: '1.0.0',
      description: 'Una API sencilla para MQTT',
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Conexión MQTT
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org'); // Usamos un broker público para prueba

mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');
  mqttClient.subscribe('mqtt/test', (err) => {
    if (err) {
      console.log('Error al suscribirse:', err);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('Mateo Carrasco');
});

/**
 * @swagger
 * /mqtt/message:
 *   get:
 *     description: Publicar un mensaje MQTT
 *     responses:
 *       200:
 *         description: Mensaje enviado
 */
app.get('/mqtt/message', (req, res) => {
  const message = 'Mateo Carrasco';
  mqttClient.publish('mqtt/test', message, () => {
    res.send('Mensaje enviado: ' + message);
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
