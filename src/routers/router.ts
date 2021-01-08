import express from 'express'
import healthRouter from './healthRouter'

export default express
    .Router()
    .use('/', healthRouter)