import express from 'express'
import healthRouter from './healthRouter'
import authenticationRouter from './authenticationRouter'

export default express
    .Router()
    .use('/', healthRouter)
    .use('/', authenticationRouter)