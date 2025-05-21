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
    const importReservation = req.body;
    const reservationError = reservationImportTroubleShooter(importReservation);

    if (reservationError) return res.status(400).send({ error: reservationError});

    await addReservation(reservationCreator(importReservation))
    
    res.status(201).json({ message: "Reservation added successfully." });
  });

reservationsRouter.get("/api/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const reservation = await getReservationById(id);

  if (!reservation.length) return res.status(404).send({ error: `There is no reservation with such ID` });

  res.send(reservation);
});

reservationsRouter.put("/api/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const importReservation = req.body;

  if (!id || !importReservation) return res.status(400).send({ error: `Id and body is mandatory`});

  const reservationError = reservationImportTroubleShooter(importReservation)

  if (reservationError) return res.status(400).send({ error: reservationError})
 
  await updateReservationById(id, reservationCreator(importReservation));

  res.status(201).json({ message: "Reservation updated successfully." });
});

reservationsRouter.delete("/api/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await deleteReservationById(id);

  if (deleted) return res.send({ message: "Reservation deleted successfully." });

  res.status(404).json({ error: "Reservation not found." });
});

const reservationImportTroubleShooter = (importReservation) => {
    if (!importReservation) return `Reservation Information is required.`
  
    if (!importReservation.number_of_guests ||
      !importReservation.meal_id ||
      !importReservation.created_date ||
      !importReservation.contact_phonenumber ||
      !importReservation.contact_name ||
      !importReservation.contact_email) return `All fields are required.`
  }
  
  const reservationCreator = (importReservation) =>{

    const createReservation = {
        number_of_guests: importReservation.number_of_guests,
        meal_id: importReservation.meal_id,
        created_date: `${importReservation.created_date}`,
        contact_phonenumber: importReservation.contact_phonenumber,
        contact_name: importReservation.contact_name,
        contact_email: importReservation.contact_email,
    };

    return createReservation;
  };
  

export default reservationsRouter;
