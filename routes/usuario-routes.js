const express = require("express");

const router = express.Router();

const {
    lista
} = require ('../controllers/usuario-controller');



router.get('/lista-usuarios', lista );





module.exports = router;