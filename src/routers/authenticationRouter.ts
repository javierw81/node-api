import express from 'express'
import AuthenticationController from '../controllers/AuthenticationController'
import { AuthenticationEnum } from '../filters/authenticationFilter'
import { applyFilters } from '../filters/core'

export default express
    .Router()
    .post('/signin', applyFilters(AuthenticationController.signIn, AuthenticationEnum.allowAnonymous))
    .post('/signup', applyFilters(AuthenticationController.signUp, AuthenticationEnum.allowAnonymous))
    .post('/signout', applyFilters(AuthenticationController.signOut))
    .post('/refresh', applyFilters(AuthenticationController.refresh, AuthenticationEnum.allowAnonymous))