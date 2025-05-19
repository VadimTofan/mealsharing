import dotenv from 'dotenv'
import knex from 'knex'

dotenv.config()

const dbClient = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
})

export async function getMeals() {
  return dbClient.select('*').from('meal')
}

export async function getFutureMeals() {
  const now = new Date().toISOString()

  return dbClient.select('*').from('meal').where('when', '>', now)
}

export async function getPastMeals() {
  const now = new Date().toISOString()

  return dbClient.select('*').from('meal').where('when', '<', now)
}

export async function getFirstMeal() {
  return dbClient.select('*').from('meal').orderBy('id').first()
}

export async function getLastMeal() {
  return dbClient.select('*').from('meal').orderBy('id', 'desc').first()
}