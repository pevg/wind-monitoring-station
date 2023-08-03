const { request, response } = require("express");
const { Station } = require("../models/station");

const getStation = async(req = request, res = response) => {
    const stations = await Station.find();
    res.json(
        stations
    )
}

const getStationById = async(req = request, res = response) => {
    const id = req.params.id;
    const station = await Station.findById(id);
    res.json(
        station
    )
}

const postStation = async (req = request, res = response) => {
    const { title, ...resto } = req.body;
    const station = new Station({
        title,
        status: false, 
        created_at: Date.now(), 
        updated_at: Date.now(), 
        deleted_at: null,
        ...resto
    });
    const existTitle = await Station.findOne({ title });
    if (existTitle) {
        return res.status(400).json({
            message: 'Ya existe una estación con ese nombre'
        })
    }
    station.save();
    res.json(
        station
    )
}
const patchStation = (req = request, res = response) => {
    res.json({
        message: 'PATCH Station from controller'
    })
}

const putStation = async (req = request, res = response) => {
    const idToBeUpdated = req.params.id;
    const {id, updated_at,...resto } = req.body;
    resto.updated_at = Date.now();
    const station = await Station.findByIdAndUpdate(idToBeUpdated, resto);
    station.save();
    res.json(
        station
    )    
}

const deleteStation = async (req = request, res = response) => {
    const id = req.params.id;
    const updated_at = Date.now();
    const deleted_at = Date.now();
    const station = await Station.findByIdAndUpdate(id, { status: false , updated_at, deleted_at });
    res.json(
        station
    )
}

module.exports = {
    getStation,
    getStationById,
    postStation,
    patchStation,
    putStation,
    deleteStation
}