import express from "express";
import {getMeals,
   addMeal, 
   getMealById, 
   updateMealById, 
   deleteMealById} from '../database_client.js';


const mealsRouter = express.Router();

mealsRouter.get("/api/meals", async (req, res) => {
  res.send(await getMeals())
});

mealsRouter.post("/api/meals", async (req, res) => {
  const importMeal = req.body;
  const mealError = mealImportTroubleShooter(importMeal)

  if (mealError) return res.status(400).send({ error: mealError})

  await addMeal(mealCreator(importMeal))

  res.status(201).json({ message: "Meal added successfully." });
});

mealsRouter.get("/api/meals/:id", async (req, res) => {
  const id = Number(req.params.id);
  const meal = await getMealById(id);

  if (!meal.length) return res.status(404).send({ error: `There is no meal with such ID` });

  res.send(meal);
});

mealsRouter.put("/api/meals/:id", async (req, res) => {
  const id = Number(req.params.id);
  const importMeal = req.body;

  if (!id || !importMeal) return res.status(400).send({ error: `Id and body is mandatory`});

  const mealError = mealImportTroubleShooter(importMeal)

  if (mealError) return res.status(400).send({ error: mealError})
 
  await updateMealById(id, mealCreator(importMeal));

  res.status(201).send({ message: "Meal updated successfully." });
});

mealsRouter.delete("/api/meals/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await deleteMealById(id);

  if (deleted) return res.send({ message: "Meal deleted successfully." });
  
  res.status(404).send({ error: "Meal not found." });
});


const mealImportTroubleShooter = (importMeal) => {
  if (!importMeal) return `Meal data is required.`

  if (!importMeal.title ||
    !importMeal.description ||
    !importMeal.location ||
    !importMeal.when ||
    !importMeal.max_reservations ||
    !importMeal.price ||
    !importMeal.created_date) return `All fields are required.`
}

const mealCreator = (importMeal) =>{
  const createMeal = {
    title: importMeal.title,
    description: importMeal.description,
    location: importMeal.location,
    when: importMeal.when,
    max_reservations: importMeal.max_reservations,
    price: importMeal.price,
    created_date: importMeal.created_date
  };

  return createMeal;
};

export default mealsRouter;
