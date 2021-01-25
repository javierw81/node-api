import dotenv from 'dotenv'

export const result = dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
})

jest.setTimeout(30000)
