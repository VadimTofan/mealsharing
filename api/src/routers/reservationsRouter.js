import express from "express";
import * as db from "../database/database_client.js";

export const reservationsRouter = express.Router();

reservationsRouter.get("/api/reservations", async (request, response) => {
  response.status(200).send(await db.getReservations());
});

reservationsRouter.post("/api/reservations", async (request, response) => {
  const reservation = request.body;
  const guestsRequested = parseInt(reservation.number_of_guests, 10);

  const reservationError = reservationDataValidator(reservation);
  if (reservationError) return response.status(400).send({ error: reservationError });

  const mealId = reservation.meal_id;
  try {
    const meal = await db.getMealDetailsWithAvailabilityById(mealId);
    if (!meal) return response.status(404).send({ error: "Meal not found." });

    if (meal.available_reservations < guestsRequested) return response.status(400).send({ error: "Not enough available reservations." });

    await db.addReservation(createReservationObject(reservation));

    response.status(201).json({ message: "Reservation added successfully." });
  } catch (error) {
    console.error(error);

    response.status(500).send({ error: "Something went wrong." });
  }
});

reservationsRouter.get("/api/reservations/:id", async (request, response) => {
  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const reservation = await db.getReservationById(id);
  if (!reservation.length) return response.status(404).send({ error: `There is no reservation with such ID` });

  response.status(200).send(reservation);
});

reservationsRouter.get("/api/reservationsbyuser/:id", async (request, response) => {
  const id = request.params.id;
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const reservation = await db.getReservationsByUser(id);
  if (!reservation.length) return response.status(404).send({ error: `You have no reservations` });

  response.status(200).send(reservation);
});

reservationsRouter.put("/api/reservations/:id", async (request, response) => {
  const reservation = request.body;

  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const reservationError = reservationDataValidator(reservation);
  if (reservationError) return response.status(400).send({ error: reservationError });

  await db.updateReservationById(id, createReservationObject(reservation));

  response.status(201).json({ message: "Reservation updated successfully." });
});

reservationsRouter.delete("/api/reservations/:id", async (request, response) => {
  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const isDeleted = await db.deleteReservationById(id);
  if (isDeleted) return response.status(200).send({ message: "Reservation deleted successfully." });

  response.status(404).json({ error: "Reservation not found." });
});

const reservationDataValidator = (reservation) => {
  if (!reservation) return `Reservation Information is required.`;

  if (!reservation.number_of_guests || !reservation.meal_id || !reservation.created_date || !reservation.contact_phonenumber || !reservation.contact_name || !reservation.contact_email)
    return `All fields are required.`;
};

const createReservationObject = (reservation) => {
  const createReservation = {
    number_of_guests: reservation.number_of_guests,
    meal_id: reservation.meal_id,
    created_date: `${reservation.created_date}`,
    contact_phonenumber: reservation.contact_phonenumber,
    contact_name: reservation.contact_name,
    contact_email: reservation.contact_email,
    user: reservation.user,
  };

  return createReservation;
};
