import express from "express";
import * as db from "./database/database_client.js";
import { mealsRouter } from "./routers/mealsRouter.js";
import { reservationsRouter } from "./routers/reservationsRouter.js";
import { reviewsRouter } from "./routers/reviewsRouter.js";

import cors from "cors";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());
app.get("/", (request, response) => {
  response.status(200).send("Welcome to Meal Sharing");
});

app.get("/all-meals", async (request, response) => {
  response.status(200).send(await db.getMeals());
});

app.get("/future-meals", async (request, response) => {
  response.status(200).send(await db.getFutureMeals());
});

app.get("/past-meals", async (request, response) => {
  response.status(200).send(await db.getPastMeals());
});

app.get("/first-meal", async (request, response) => {
  const meal = await db.getFirstMeal();
  if (!meal) return response.status(404).send("There are no meals for your request!");

  response.status(200).send(meal);
});

app.get("/last-meal", async (request, response) => {
  const meal = await db.getLastMeal();
  if (!meal) return response.status(404).send("There are no meals for your request!");

  response.status(200).send(meal);
});

app.use(mealsRouter);
app.use(reservationsRouter);
app.use(reviewsRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
