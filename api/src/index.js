import express from "express";
import * as db from "./database/database_client.js";
import { mealsRouter } from "./routers/mealsRouter.js";
import { reservationsRouter } from "./routers/reservationsRouter.js";
import { reviewsRouter } from "./routers/reviewsRouter.js";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-netlify-site.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (request, response) => {
  response.send("Welcome to Meal Sharing");
});

app.get("/all-meals", async (request, response) => {
  response.send(await db.getMeals());
});

app.get("/future-meals", async (request, response) => {
  response.send(await db.getFutureMeals());
});

app.get("/past-meals", async (request, response) => {
  response.send(await db.getPastMeals());
});

app.get("/first-meal", async (request, response) => {
  const meal = await db.getFirstMeal();

  if (!meal) return response.send("There are no meals for your request!");

  response.send(meal);
});

app.get("/last-meal", async (request, response) => {
  const meal = await db.getLastMeal();
  console.log(meal);
  if (!meal) return response.send("There are no meals for your request!");

  response.send(meal);
});

app.use(mealsRouter);
app.use(reservationsRouter);
app.use(reviewsRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
