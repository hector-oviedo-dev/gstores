const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works:');
});

// Get all posts
router.get('/posts', (req, res) => {
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/regist`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/login`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/modifyaccount`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/addaddress`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/removeaddress`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/listprocedures`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/newprocedure`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/procedures`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});


module.exports = router;
