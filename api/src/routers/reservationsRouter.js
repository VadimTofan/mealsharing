import express from "express";
import {getReservations, 
    addReservation, 
    getReservationById, 
    updateReservationById, 
    deleteReservationById} from '../database_client.js';

const reservationsRouter = express.Router();

reservationsRouter.get("/api/reservations", async (req, res) => {
  res.send(await getReservations())
});

reservationsRouter.post("/api/reservations", async (req, res) => {
    const reservation = req.body;
    const reservationError = reservationDataValidator(reservation);

    if (reservationError) return res.status(400).send({ error: reservationError});

    await addReservation(createReservationObject(reservation))
    
    res.status(201).json({ message: "Reservation added successfully." });
  });

reservationsRouter.get("/api/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).send({ error: `Id is mandatory`});

  const reservation = await getReservationById(id);

  if (!reservation.length) return res.status(404).send({ error: `There is no reservation with such ID` });

  res.send(reservation);
});

reservationsRouter.put("/api/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const reservation = req.body;

  if (!id) return res.status(400).send({ error: `Id is mandatory`});

  const reservationError = reservationDataValidator(reservation)

  if (reservationError) return res.status(400).send({ error: reservationError})
 
  await updateReservationById(id, createReservationObject(reservation));

  res.status(201).json({ message: "Reservation updated successfully." });
});

reservationsRouter.delete("/api/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).send({ error: `Id is mandatory`});

  const isDeleted = await deleteReservationById(id);

  if (isDeleted) return res.send({ message: "Reservation deleted successfully." });

  res.status(404).json({ error: "Reservation not found." });
});

const reservationDataValidator = (reservation) => {
    if (!reservation) return `Reservation Information is required.`
  
    if (!reservation.number_of_guests ||
      !reservation.meal_id ||
      !reservation.created_date ||
      !reservation.contact_phonenumber ||
      !reservation.contact_name ||
      !reservation.contact_email) return `All fields are required.`
  }
  
  const createReservationObject = (reservation) =>{

    const createReservation = {
        number_of_guests: reservation.number_of_guests,
        meal_id: reservation.meal_id,
        created_date: `${reservation.created_date}`,
        contact_phonenumber: reservation.contact_phonenumber,
        contact_name: reservation.contact_name,
        contact_email: reservation.contact_email,
    };

    return createReservation;
  };
  

export default reservationsRouter;
