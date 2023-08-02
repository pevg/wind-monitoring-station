import { Router } from "express";
import { 
    getStation,
    getStationById, 
    postStation, 
    patchStation, 
    putStation, 
    deleteStation 
} from "../controllers/station.js";
import { check } from "express-validator";
import fieldValidator from "../middlewares/validate-fields.js";
import { stationExistById } from "../helpers/db-validators.js";

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

export default router