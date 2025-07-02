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
  const maxPrice = request.query.maxPrice;
  const minPrice = request.query.minPrice;
  const availableReservations = request.query.availableReservations;
  const title = request.query.title;
  const dateAfter = request.query.dateAfter;
  const dateBefore = request.query.dateBefore;
  const limit = request.query.limit;
  const sort = request.query.sortKey;
  const safeSort = ["when", "max_reservations", "price"];
  const safeDirection = ["asc", "desc"];
  let sortBy = "id";
  let directBy = "asc";

  if (maxPrice) return response.send(await db.getMeals("<", maxPrice));
  if (minPrice) return response.send(await db.getMeals(">", minPrice));
  if (availableReservations && availableReservations !== "true") return response.status(404).send({ error: `Can't find such dishes` });
  if (availableReservations === "true") return response.send(await db.getMealsForReservation());
  if (title) return response.send(await db.getMealsByTitle(title));
  if (dateAfter) return response.send(await db.getFutureMeals(dateAfter));
  if (dateBefore) return response.send(await db.getPastMeals(dateBefore));
  if (limit) return response.send(await db.getMealsByLimit(limit));
  if (sort) {
    for (let i = 0; i < safeSort.length; i++) {
      if (sort.includes(safeSort[i])) {
        sortBy = safeSort[i] || "id";
        break;
      }
    }
    for (let i = 0; i < safeDirection.length; i++) {
      if (sort.includes(safeDirection[i])) {
        directBy = safeDirection[i] || "asc";
        break;
      }
    }
    return response.send(await db.getMealsSorted(sortBy, directBy));
  }
  response.send(await db.getMeals());
});

mealsRouter.post("/api/meals", async (request, response) => {
  const meal = request.body;
  const mealError = validateMealData(meal);

  if (mealError) return response.status(400).send({ error: mealError });

  await db.addMeal(createMealObject(meal));

  response.status(201).json({ message: "Meal added successfully." });
});

mealsRouter.get("/api/meals/:id", async (request, response) => {
  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const meal = await db.getMealById(id);

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
