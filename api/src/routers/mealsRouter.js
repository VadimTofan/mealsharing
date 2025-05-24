import express from "express";
import {getMeals,
   addMeal, 
   getMealById, 
   updateMealById, 
   deleteMealById} from '../database_client.js';


export const mealsRouter = express.Router();

mealsRouter.get("/api/meals", async (req, res) => {
  res.send(await getMeals())
});

mealsRouter.post("/api/meals", async (req, res) => {
  const meal = req.body;
  const mealError = validateMealData(meal)

  if (mealError) return res.status(400).send({ error: mealError})

  await addMeal(createMealObject(meal))

  res.status(201).json({ message: "Meal added successfully." });
});

mealsRouter.get("/api/meals/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).send({ error: `Id is mandatory`})

  const meal = await getMealById(id);

  if (!meal) return res.status(404).send({ error: `There is no meal with such ID` });

  res.send(meal);
});

mealsRouter.put("/api/meals/:id", async (req, res) => {
  const id = Number(req.params.id);
  const meal = req.body;

  if (!id) return res.status(400).send({ error: `Id is mandatory`});

  const mealError = validateMealData(meal)

  if (mealError) return res.status(400).send({ error: mealError})

  const newMeal = createMealObject(meal)
 
  await updateMealById(id, createMealObject(newMeal));

  res.status(201).send({ message: "Meal updated successfully." });
});

mealsRouter.delete("/api/meals/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!id) return res.status(400).send({ error: `Id is mandatory`})

  const isDeleted = await deleteMealById(id);

  if (isDeleted) return res.send({ message: "Meal deleted successfully." });
  
  res.status(404).send({ error: "Meal not found." });
});


const validateMealData = (meal) => {
  if (!meal) return `Meal data is required.`

  if (!meal.title ||
    !meal.description ||
    !meal.location ||
    !meal.when ||
    !meal.max_reservations ||
    !meal.price ||
    !meal.created_date) return `All fields are required.`
}

const createMealObject = (meal) =>{
  const createMeal = {
    title: meal.title,
    description: meal.description,
    location: meal.location,
    when: meal.when,
    max_reservations: meal.max_reservations,
    price: meal.price,
    created_date: meal.created_date
  };

  return createMeal;
};