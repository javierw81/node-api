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
    *     tags:
    *     - authentication 
    *     requestBody:
    *       description: parameter to sign in
    *       required: true
    *       content:
    *         application/json:
    *           schema:            
    *             $ref: '#/components/schemas/signInRequest'     
    *             required:
    *             - username
    *             - password
    *           examples:
    *             success: 
    *               value: 
    *                 username: test
    *                 password: test00              
    *               summary: success example
    *             fail: 
    *               value: 
    *                 username: test
    *                 password: "123456"              
    *               summary: fail example
    *     responses:
    *       200:
    *         description: Successfully Sign in
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/authorizedResponse'
    *       400:
    *         description: Request incorrect
    *       401:
    *         description: Unauthorize, password or username incorrect 
    */
    .post('/signin', applyFilters(AuthenticationController.signIn, AuthenticationEnum.allowAnonymous))
    /**
    * @swagger
    * /signup:
    *   post:            
    *     summary: sign up the application  
    *     tags:
    *     - authentication 
    *     requestBody:
    *       description: parameter to sign up
    *       required: true
    *       content:
    *         application/json:
    *           schema:        
    *             $ref: '#/components/schemas/newUserRequest'    
    *             type: object
    *             properties:
    *               username:
    *                 type: string
    *               password:
    *                 type: string    
    *               name:
    *                 type: string     
    *               surname:
    *                 type: string        
    *               email:
    *                 type: string            
    *             required:
    *             - username
    *             - password
    *             - name
    *             - surname
    *             - email  
    *           examples:
    *             success: 
    *               value: 
    *                 username: test
    *                 password: test00
    *                 name: Alberto
    *                 surname: Tester
    *                 email: tester@test.com                   
    *               summary: success example
    *             fail: 
    *               value: 
    *                 username: test
    *                 password: test00
    *                 name: Alberto
    *                 surname: Tester                                     
    *               summary: fail example
    *     responses:
    *       201:
    *         description: Created
    *       400:
    *         description: Request incorrect
    */
    .post('/signup', applyFilters(AuthenticationController.signUp, AuthenticationEnum.allowAnonymous))
    /**
    * @swagger
    * /signout:
    *   post:
    *     security:              
    *     - ApiKeyAuth: []     
    *     summary: signout of the application  
    *     description: This endpoint remove refresh token form de application
    *     tags:
    *     - authentication 
    *     requestBody:
    *       description: parameter to sign out
    *       required: true
    *       content:
    *         application/json:
    *           schema:            
    *             type: object
    *             properties:             
    *               refreshToken:
    *                 type: string                       
    *             required:
    *             - refreshToken
    *           examples:
    *             sample: 
    *               value:
    *                 refreshToken: sdafkja-sdhflkjsd-ahfsdlk-jfhsd
    *               summary: Invalid data
    *     responses:
    *       200:
    *         description: Sign out correct
    *       400:
    *         description: Request incorrect
    */
    .post('/signout', applyFilters(AuthenticationController.signOut))
    /**
    * @swagger
    * /refresh:
    *   post:            
    *     summary: refresh token of the application  
    *     tags:
    *     - authentication 
    *     requestBody:
    *       description: parameter to refresh token
    *       required: true
    *       content:
    *         application/json:
    *           schema:            
    *             $ref: '#/components/schemas/refreshRequest'                   
    *             required:
    *             - username
    *             - refreshToken
    *           examples:
    *             sample: 
    *               value: 
    *                 username: test
    *                 refreshToken: sdafkja-sdhflkjsd-ahfsdlk-jfhsd
    *               summary: Invalid data
    *     responses:
    *       200:
    *         description: Refresh token
    *       400:
    *         description: Request incorrect
    */
    .post('/refresh', applyFilters(AuthenticationController.refresh, AuthenticationEnum.allowAnonymous))
    /**
    * @swagger
    * /verify/{username}/{verifyToken}:
    *   get:            
    *     summary: refresh token of the application  
    *     tags:
    *     - authentication 
    *     parameters:
    *     - in: path
    *       name: username
    *       schema:
    *         type: string
    *       required: true
    *       description: Username of the user to verify
    *     - in: path
    *       name: verifyToken
    *       schema:
    *         type: string
    *       required: true
    *       description: Valid token of the user to verify
    *     responses:
    *       200:
    *         description: Verify ok  
    *       400:
    *         description: Request incorrect or invalid token
    */
    .get('/verify/:username/:verifyToken', applyFilters(AuthenticationController.verify, AuthenticationEnum.allowAnonymous))


/**
* @swagger
* components:
*   schemas:
*     signInRequest:
*       type: object
*       properties:
*         username:
*           type: string
*         password:
*           type: string
*     authorizedResponse:
*       type: object
*       properties:
*         username:
*           type: string
*         token:
*           type: string
*         refreshToken:
*           type: string
*     refreshRequest:
*       type: object
*       properties:
*         username:
*           type: string
*         refreshToken:
*           type: string
*     newUserRequest:
*       type: object
*       properties:
*         username:
*           type: string
*         password:
*           type: string
*         name:
*           type: string
*         surname:
*           type: string
*         email:
*           type: string
*/