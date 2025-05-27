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

export async function getMeals(operator, amount) {
  if (!operator && !amount) return dbClient.select('*').from('meal')
  if (operator && amount) return dbClient('meal').where('price', operator, amount)
}

export async function getFutureMeals(date) {
  dbClient.select('*').from('meal').where('when', '>', date)

  const now = new Date().toISOString()

  return dbClient.select('*').from('meal').where('when', '>', now)
}

export async function getPastMeals(date) {
  if (date) return dbClient.select('*').from('meal').where('when', '<', date)

  const now = new Date().toISOString()

  return dbClient.select('*').from('meal').where('when', '<', now)
}

export async function getMealsByLimit(limit) {
  return dbClient('meal').select('*').limit(limit);
}

export async function getMealsSorted(sortKey, sortDir) {
  return dbClient.select("*").from("meal").orderBy(sortKey, sortDir)
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
  const meals = await dbClient.select('*').from('meal').where('id', id);
  
  return meals[0];
}

export async function updateMealById(id, meal) {
  return dbClient('meal').where('id', id).update(meal)
}

export async function deleteMealById(id) {
  return dbClient('meal').where('id', id).del();
}

export async function getMealsForReservation() {
  return dbClient('meal')
  .leftJoin('reservation', 'meal.id', 'reservation.meal_id')
  .select('meal.*')
  .sum({ total_guests: 'reservation.number_of_guests' })
  .groupBy('meal.id')
  .havingRaw('SUM(reservation.number_of_guests) < meal.max_reservations OR SUM(reservation.number_of_guests) IS NULL');
}

export async function getMealsByTitle(title) {
  return dbClient('meal')
    .select('*')
    .where('title', 'like', `${title}%`);
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

export async function updateReservationById(id, reservation) {
  return dbClient('reservation').where('id', id).update(reservation)
}

export async function deleteReservationById(id) {
  return dbClient('reservation').where('id', id).del();
}

export async function getReviews() {
  return dbClient.select('*').from('review')
}

export async function addReview(meal) {
  return dbClient('review').insert(meal);
}

export async function getReviewById(id) {
  return dbClient.select('*').from('review').where('id', id)
}

export async function updateReviewById(id, reservation) {
  return dbClient('review').where('id', id).update(reservation)
}

export async function deleteReviewById(id) {
  return dbClient('review').where('id', id).del();
}