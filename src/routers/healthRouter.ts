import express from 'express'
import HealthController from '../controllers/HealthController'
import { applyFilters } from '../filters/core'

export default express
    .Router()
    .get('/ping', applyFilters(HealthController.ping))