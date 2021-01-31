import express from 'express'
import AuthenticationController from '../controllers/AuthenticationController'
import { AuthenticationEnum } from '../filters/authenticationFilter'
import { applyFilters } from '../filters/core'

export default express
    .Router()
    /**
    * @swagger
    * /signin:
    *   post:            
    *     summary: sign in the application     
    *     requestBody:
    *       description: parameter to sign in
    *       required: true
    *       content:
    *         application/json:
    *           schema:            
    *             type: object
    *             properties:
    *               username:
    *                 type: string
    *               password:
    *                 type: string            
    *             required:
    *             - username
    *             - password
    *           examples:
    *             success: 
    *               value: 
    *                 username: chavotest
    *                 password: chimoltrufia              
    *               summary: success example
    *             fail: 
    *               value: 
    *                 username: javierw81
    *                 password: "123456"              
    *               summary: fail example
    *     responses:
    *       200:
    *         description: Successfully Sign in
    */
    .post('/signin', applyFilters(AuthenticationController.signIn, AuthenticationEnum.allowAnonymous))
    .post('/signup', applyFilters(AuthenticationController.signUp, AuthenticationEnum.allowAnonymous))
    .post('/signout', applyFilters(AuthenticationController.signOut))
    .post('/refresh', applyFilters(AuthenticationController.refresh, AuthenticationEnum.allowAnonymous))
    .get('/verify/:username/:verifyToken', applyFilters(AuthenticationController.verify, AuthenticationEnum.allowAnonymous))