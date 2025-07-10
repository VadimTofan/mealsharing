import express from "express";
import * as db from "../database/database_client.js";

export const mealsRouter = express.Router();

mealsRouter.get("/api/selectedmeal/:id", async (request, response) => {
  const id = request.params.id;

  if (!id) {
    return response.status(400).send({ error: "Id is mandatory" });
  }

  try {
    const meal = await db.getMealDetailsWithAvailabilityById(id);

    if (!meal) return response.status(404).send({ error: `There is no meal with such ID` });

    response.send(meal);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Something went wrong" });
  }
});

mealsRouter.get("/api/top-meals", async (req, res) => {
  try {
    const meals = await db.getTopMeals();

    if (meals.length === 1) return res.send(meals[0]);
    res.send(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get("/api/meals", async (request, response) => {
  const filter = request.query;

  try {
    const { maxPrice, minPrice, availableReservations, title, dateAfter, dateBefore, limit, sortKey } = filter;

    let filters = {};
    let sortBy = "id";
    let directBy = "asc";

    if (maxPrice) filters.maxPrice = maxPrice;
    if (minPrice) filters.minPrice = minPrice;
    if (title) filters.search = title;
    if (dateAfter) filters.dateAfter = dateAfter;
    if (dateBefore) filters.dateBefore = dateBefore;
    if (limit) filters.limit = limit;

    if (availableReservations === "true") {
      filters.availableReservations = true;
    }

    const safeSort = ["when", "max_reservations", "price", "id", "title"];
    const safeDirection = ["asc", "desc"];

    if (sortKey) {
      const [key, dir] = sortKey.split("_");

      if (safeSort.includes(key)) {
        sortBy = key;
      }

      if (safeDirection.includes(dir)) {
        directBy = dir;
      }
    }

    const meals = await db.getMealsFiltered(filters, sortBy, directBy);
    if (meals.length === 1) return response.send(meals[0]);

    response.send(meals);
  } catch (error) {
    console.error("Error in GET /api/meals:", error);
    response.status(500).send({ error: "Internal server error" });
  }
});

mealsRouter.post("/api/meals", async (request, response) => {
  const meal = request.body;
  const mealError = validateMealData(meal);

  if (mealError) return response.status(400).send({ error: mealError });

  await db.addMeal(createMealObject(meal));

  response.status(201).json({ message: "Meal added successfully." });
});

mealsRouter.get("/api/selectedmeals/:ids", async (request, response) => {
  const ids = request.params.ids;
  if (!ids) return response.status(400).send({ error: `Ids are mandatory` });

  const meals = await db.getMealsByIds(ids);

  if (!meals) return response.status(404).send({ error: `There are no meal with such ID` });

  response.send(meals);
});

mealsRouter.get("/api/meals/:id", async (request, response) => {
  const ids = Number(request.query);
  if (!ids) return response.status(400).send({ error: `No meals here` });

  const meal = await db.getMealByIds(ids);

  if (!meal) return response.status(404).send({ error: `There is no meal with such ID` });

  response.send(meal);
});

mealsRouter.put("/api/meals/:id", async (request, response) => {
  const id = Number(request.params.id);
  const meal = request.body;

  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const mealError = validateMealData(meal);

  if (mealError) return response.status(400).send({ error: mealError });

  const newMeal = createMealObject(meal);

  await db.updateMealById(id, createMealObject(newMeal));

  response.status(201).send({ message: "Meal updated successfully." });
});

mealsRouter.delete("/api/meals/:id", async (request, response) => {
  const id = Number(request.params.id);

  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const isDeleted = await db.deleteMealById(id);

  if (isDeleted) return response.send({ message: "Meal deleted successfully." });

  response.status(404).send({ error: "Meal not found." });
});

const validateMealData = (meal) => {
  if (!meal) return `Meal data is required.`;

  if (!meal.title || !meal.description || !meal.location || !meal.when || !meal.max_reservations || !meal.price || !meal.created_date) return `All fields are required.`;
};

const createMealObject = (meal) => {
  const createMeal = {
    title: meal.title,
    description: meal.description,
    location: meal.location,
    when: meal.when,
    max_reservations: meal.max_reservations,
    price: meal.price,
    created_date: meal.created_date,
  };

  return createMeal;
};
