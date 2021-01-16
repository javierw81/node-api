import express from 'express'
import HealthController from '../controllers/HealthController'
import { AuthenticationEnum } from '../filters/authenticationFilter'
import { applyFilters } from '../filters/core'

export default express
    .Router()
    .get('/ping', applyFilters(HealthController.ping, AuthenticationEnum.allowAnonymous))  