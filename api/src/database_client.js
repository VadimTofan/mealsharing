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
    database: process.env.DB_NAME,
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

export async function addMeal(meal) {
  return dbClient('meal').insert(meal);
}

export async function getMealById(id) {
  return dbClient.select('*').from('meal').where('id', id)
}

export async function updateMealById(id, meal) {
  return dbClient('meal').where('id', id).update(meal)
}

export async function deleteMealById(id) {
  return dbClient('meal').where('id', id).del();
}

export async function getReservations() {
  return dbClient.select('*').from('reservation')
}

export async function addReservation(meal) {
  return dbClient('reservation').insert(meal);
}

export async function getReservationById(id) {
  return dbClient.select('*').from('reservation').where('id', id)
}

export async function updateReservationById(id, meal) {
  return dbClient('reservation').where('id', id).update(meal)
}

export async function deleteReservationById(id) {
  return dbClient('reservation').where('id', id).del();
}