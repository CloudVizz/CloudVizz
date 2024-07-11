const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose schema and model
const roleSchema = new mongoose.Schema({
  service_name: String,
  role_arn: String,
  external_id: String,
});

const Role = mongoose.model('Role', roleSchema);

// Endpoint to receive and store role information
app.post('/create_role', async (req, res) => {
  const { service_name, role_arn, external_id } = req.body;
  const role = new Role({ service_name, role_arn, external_id });

  try {
    await role.save();
    res.status(200).send({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).send({ message: 'Error creating role', error });
  }
});

// Endpoint to retrieve roles (for demonstration purposes)
app.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving roles', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
