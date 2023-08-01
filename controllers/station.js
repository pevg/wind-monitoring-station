import { response } from "express";

const getStation = (req, res = response) => {
    res.json({
        message: 'GET Station from controller'
    })
}

const postStation = (req, res = response) => {
    res.json({
        message: 'POST Station from controller'
    })
}
const patchStation = (req, res = response) => {
    res.json({
        message: 'PATCH Station from controller'
    })
}

const putStation = (req, res = response) => {
    res.json({
        message: 'PUT Station from controller'
    })
}

const deleteStation = (req, res = response) => {
    res.json({
        message: 'DELETE Station from controller'
    })
}


export {
    getStation,
    postStation,
    patchStation,
    putStation,
    deleteStation
}