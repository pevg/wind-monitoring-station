import Station from "../models/station.js";

const stationExistById = async(id) => {
    
    const existStation = Station.findById(id);
    if(!existStation) {
        throw new Error(`La estación con el id ${id} no existe`);
    }
}

export {
    stationExistById
}