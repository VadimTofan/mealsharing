import express from "express";
import * as db from "../database/database_client.js";

export const reviewsRouter = express.Router();

reviewsRouter.get("/api/reviews", async (request, response) => {
  response.send(await db.getReviews());
});

reviewsRouter.post("/api/reviews", async (request, response) => {
  const review = request.body;
  const reviewError = reviewDataValidator(review);

  if (reviewError) return response.status(400).send({ error: reviewError });

  await db.addReview(createReviewObject(review));

  response.status(201).json({ message: "review added successfully." });
});

reviewsRouter.get("/api/reviews/:id", async (request, response) => {
  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const review = await db.getReviewById(id);
  const [reviewObj] = review;
  if (!review.length) return response.status(404).send({ error: `There is no review with such ID` });
  if (review.length === 1) return response.send(reviewObj);
  response.send(review);
});

reviewsRouter.put("/api/reviews/:id", async (request, response) => {
  const id = Number(request.params.id);
  const review = request.body;

  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const reviewError = reviewDataValidator(review);

  if (reviewError) return response.status(400).send({ error: reviewError });

  await db.updateReviewById(id, createReviewObject(review));

  response.status(201).json({ message: "Review updated successfully." });
});

reviewsRouter.delete("/api/reviews/:id", async (request, response) => {
  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const isDeleted = await db.deleteReviewById(id);

  if (isDeleted) return response.send({ message: "Review deleted successfully." });

  response.status(404).json({ error: "Review not found." });
});

const reviewDataValidator = (review) => {
  if (!review) return `Review Information is required.`;

  if (!review.title || !review.description || !review.meal_id || !review.stars || !review.created_date) return `All fields are required.`;
};

const createReviewObject = (review) => {
  const createReview = {
    title: review.title,
    description: review.description,
    meal_id: review.meal_id,
    stars: review.stars,
    created_date: review.created_date,
  };

  return createReview;
};
