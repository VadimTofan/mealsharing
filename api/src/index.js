import express from 'express'
import {
  getFirstMeal,
  getFutureMeals,
  getLastMeal,
  getMeals,
  getPastMeals,
} from './database_client.js'
import mealsRouter from './routers/mealsRouter.js'
import reservationsRouter from './routers/reservationsRouter.js'

const app = express()
app.use(express.json())
app.get('/', (request, response) => {
  response.send('Welcome to Meal Sharing')
})

app.get('/all-meals', async (request, response) => {
  response.send(await getMeals())
})

app.get('/future-meals', async (request, response) => {
  response.send(await getFutureMeals())
})

app.get('/past-meals', async (request, response) => {
  response.send(await getPastMeals())
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

app.use(mealsRouter)
app.use(reservationsRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})