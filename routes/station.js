import { Router } from "express";
import { 
    getStation, 
    postStation, 
    patchStation, 
    putStation, 
    deleteStation 
} from "../controllers/station.js";

const router = Router();

router.get('/', getStation )

router.post('/', postStation)

router.patch('/', patchStation)

router.put('/', putStation)

router.delete('/', deleteStation)

export default router