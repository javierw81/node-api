import express from 'express'
import AuthenticationController from '../controllers/AuthenticationController'
import { applyFilters } from '../filters/core'

export default express
    .Router()
    .post('/signin', applyFilters(AuthenticationController.signIn))
    .post('/signout', applyFilters(AuthenticationController.signOut))
    .post('/signUp', applyFilters(AuthenticationController.signUp))