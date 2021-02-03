import express from 'express'
import HealthController from '../controllers/HealthController'
import { AuthenticationEnum } from '../filters/authenticationFilter'
import { applyFilters } from '../filters/core'

export default express
    .Router()
    /**
    * @swagger
    * /ping:
    *   get:            
    *     summary: Health of the application    
    *     tags:
    *     - Health
    *     responses:
    *       200:
    *         description: Health ok    
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/healthResponse'
    *       500:
    *         description: Health warning 
    */
    .get('/ping', applyFilters(HealthController.ping, AuthenticationEnum.allowAnonymous))

/**
* @swagger
* components:
*   schemas:
*     healthResponse:
*       type: object
*       properties:
*         env:
*           type: string
*         appName:
*           type: string
*         appVersion:
*           type: string
*         statusDb:
*           type: string
*         statusKeyValueDb:
*           type: string
*         statusEmail:
*           type: string
*/
