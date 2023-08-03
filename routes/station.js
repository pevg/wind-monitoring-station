const { Router } = require("express");

const { fieldValidator } =  require("../middlewares/validate-fields");

const { stationExistById } =  require("../helpers/db-validators");

const { getStation,
        getStationById, 
        postStation, 
        patchStation, 
        putStation, 
        deleteStation } = require("../controllers/station");

const { check } =  require("express-validator");



const router = Router();

router.get('/', getStation)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( stationExistById ),
    fieldValidator],
    getStationById)

router.post('/', [
    check('title', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('serverIP', 'La IP es obligatoria').not().isEmpty(),
    check('publish_topic', 'El topico de publicación es obligatorio').not().isEmpty(),
    check('subscription_topic', 'El topico de suscripción es obligatorio').not().isEmpty(),
    fieldValidator],
    postStation)

router.patch('/', patchStation)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( stationExistById ),
    fieldValidator], 
    putStation)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( stationExistById ),
    fieldValidator], 
    deleteStation)

module.exports = {
    router
}