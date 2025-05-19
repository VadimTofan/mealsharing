import express from 'express'
import {
  getFirstMeal,
  getFutureMeals,
  getLastMeal,
  getMeals,
  getPastMeals,
} from './database_client.js'

const app = express()

app.get('/', (request, response) => {
  response.send('Welcome to Meal Sharing')
})

app.get('/all-meals', async (request, response) => {
  const meals = await getMeals('meals')

  response.send(meals)
})

app.get('/future-meals', async (request, response) => {
  const meals = await getFutureMeals()

  response.send(meals)
})

app.get('/past-meals', async (request, response) => {
  const meals = await getPastMeals()

  response.send(meals)
})

app.get('/first-meal', async (request, response) => {
  const meal = await getFirstMeal()

  if (!meal || Object.keys(meal).length === 0)
    return response.send('There are no meals for your request!')

  response.send(meal)
})

app.get('/last-meal', async (request, response) => {
  const meal = await getLastMeal()

  if (!meal || Object.keys(meal).length === 0)
    return response.send('There are no meals for your request!')

  response.send(meal)
})

const port = 8000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})