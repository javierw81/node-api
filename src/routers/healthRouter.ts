import express from 'express'
import HealthController from '../controllers/HealthController'

export default express
    .Router()
    .get('/ping', HealthController.ping)