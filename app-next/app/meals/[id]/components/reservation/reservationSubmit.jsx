export async function ReservationSubmit(reservationData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) throw new Error("Reservation request failed");
    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
