import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const dbClient = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

export async function getMeals(operator, amount) {
  if (!operator && !amount) return dbClient.select("*").from("meal");
  if (operator && amount) return dbClient("meal").where("price", operator, amount);
}

export async function getFutureMeals(date) {
  dbClient.select("*").from("meal").where("when", ">", date);

  const now = new Date().toISOString();

  return dbClient.select("*").from("meal").where("when", ">", now);
}

export async function getPastMeals(date) {
  if (date) return dbClient.select("*").from("meal").where("when", "<", date);

  const now = new Date().toISOString();

  return dbClient.select("*").from("meal").where("when", "<", now);
}

export async function getMealsByLimit(limit) {
  return dbClient("meal").select("*").limit(limit);
}

export async function getMealsSorted(sortKey, sortDir) {
  return dbClient.select("*").from("meal").orderBy(sortKey, sortDir);
}

export async function getFirstMeal() {
  return dbClient.select("*").from("meal").orderBy("id").first();
}

export async function getLastMeal() {
  return dbClient.select("*").from("meal").orderBy("id", "desc").first();
}

export async function addMeal(meal) {
  return dbClient("meal").insert(meal);
}

export async function getMealById(id) {
  const meals = await dbClient.select("*").from("meal").where("id", id);

  return meals[0];
}

export async function getMealsByIds(ids) {
  if (!ids || ids.length === 0) return [];

  const idsStr = Array.isArray(ids) ? ids.join(",") : ids;

  const sql = `
    SELECT
      meal.*,
      COALESCE(rev_summary.avg_stars, 0) AS average_stars,
      meal.max_reservations - COALESCE(res_summary.total_guests, 0) AS available_reservations,
      res_summary.user_id
    FROM meal
    LEFT JOIN (
      SELECT
        meal_id,
        SUM(number_of_guests) AS total_guests,
        MIN(user) AS user_id
      FROM reservation
      GROUP BY meal_id
    ) AS res_summary ON meal.id = res_summary.meal_id
    LEFT JOIN (
      SELECT
        meal_id,
        AVG(stars) AS avg_stars
      FROM review
      GROUP BY meal_id
    ) AS rev_summary ON meal.id = rev_summary.meal_id
    WHERE meal.id IN (${idsStr});
  `;

  const result = await dbClient.raw(sql);
  return result.rows || result;
}

export async function updateMealById(id, meal) {
  return dbClient("meal").where("id", id).update(meal);
}

export async function deleteMealById(id) {
  return dbClient("meal").where("id", id).del();
}

export async function getMealsForReservation() {
  return dbClient("meal")
    .leftJoin("reservation", "meal.id", "reservation.meal_id")
    .select("meal.*")
    .sum({ total_guests: "reservation.number_of_guests" })
    .groupBy("meal.id")
    .select(dbClient.raw("meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0) as available_reservations"))
    .havingRaw("COALESCE(SUM(reservation.number_of_guests), 0) < meal.max_reservations");
}

export async function getMealDetailsWithAvailabilityById(mealId) {
  const meals = await dbClient("meal")
    .leftJoin("reservation", "meal.id", "reservation.meal_id")
    .select(
      "meal.*",
      dbClient.raw("COALESCE(SUM(reservation.number_of_guests), 0) as total_guests"),
      dbClient.raw("meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0) as available_reservations")
    )
    .where("meal.id", mealId)
    .groupBy("meal.id");

  return meals[0];
}

export async function getTopMeals() {
  const meals = await dbClient("meal")
    .leftJoin("review", "review.meal_id", "meal.id")
    .leftJoin("reservation", "reservation.meal_id", "meal.id")
    .groupBy("meal.id")
    .havingRaw("meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0) > 0")
    .select(
      "meal.id",
      "meal.title",
      "meal.description",
      "meal.location",
      dbClient.raw('meal."when"'),
      "meal.max_reservations",
      "meal.price",
      "meal.created_date",
      dbClient.raw("AVG(review.stars) AS average_stars"),
      dbClient.raw("COALESCE(SUM(reservation.number_of_guests), 0) AS reserved_guests")
    )
    .orderBy("average_stars", "desc")
    .limit(3);

  return meals;
}

export async function getMealsByTitle(title) {
  return dbClient("meal").select("*").where("title", "like", `${title}%`);
}

export async function getMealsFiltered(filters = {}, sortBy = "id", directBy = "asc") {
  const validSortFields = ["id", "price", "title", "when"];
  const validDirections = ["asc", "desc"];

  if (!validSortFields.includes(sortBy)) sortBy = "id";
  if (!validDirections.includes(directBy.toLowerCase())) directBy = "asc";

  const reservationsSubquery = dbClient("reservation").select("meal_id").sum("number_of_guests as total_guests").min("user as user_id").groupBy("meal_id").as("res_summary");

  const reviewsSubquery = dbClient("review").select("meal_id").avg("stars as avg_stars").groupBy("meal_id").as("rev_summary");

  const query = dbClient("meal")
    .leftJoin(reservationsSubquery, "meal.id", "res_summary.meal_id")
    .leftJoin(reviewsSubquery, "meal.id", "rev_summary.meal_id")
    .select(
      "meal.*",
      dbClient.raw("COALESCE(rev_summary.avg_stars, 0) as average_stars"),
      dbClient.raw("meal.max_reservations - COALESCE(res_summary.total_guests, 0) as available_reservations"),
      "res_summary.user_id"
    );

  if (filters.maxPrice) {
    query.where("meal.price", "<=", filters.maxPrice);
  }

  if (filters.minPrice) {
    query.where("meal.price", ">=", filters.minPrice);
  }

  if (filters.search) {
    const searchTerm = `%${filters.search}%`;
    query.where(function () {
      this.whereILike("meal.title", searchTerm).orWhereILike("meal.description", searchTerm).orWhereILike("meal.location", searchTerm);
    });
  }

  if (filters.dateAfter) {
    query.where("meal.when", ">=", filters.dateAfter);
  }

  if (filters.dateBefore) {
    query.where("meal.when", "<=", filters.dateBefore);
  }

  if (filters.availableReservations) {
    query.whereRaw("meal.max_reservations - COALESCE(res_summary.total_guests, 0) > 0");
  }

  query.orderBy(sortBy, directBy);

  if (filters.limit) {
    query.limit(filters.limit);
  }

  return query;
}

export async function getReservations() {
  return dbClient.select("*").from("reservation");
}

export async function addReservation(meal) {
  return dbClient("reservation").insert(meal);
}

export async function getReservationById(id) {
  return dbClient.select("*").from("reservation").where("id", id);
}

export async function getReservationsByUser(id) {
  const rows = await dbClient.select("id", "meal_id").from("reservation").where("user", id);

  return rows;
}

export async function updateReservationById(id, reservation) {
  return dbClient("reservation").where("id", id).update(reservation);
}

export async function deleteReservationById(id) {
  return dbClient("reservation").where("id", id).del();
}

export async function getReviews() {
  return dbClient.select("*").from("review");
}

export async function addReview(review) {
  return dbClient("review").insert(review);
}

export async function getReviewById(id) {
  return dbClient.select("*").from("review").where("meal_id", id).orderBy("created_date", "desc");
}

export async function updateReviewById(id, reservation) {
  return dbClient("review").where("id", id).update(reservation);
}

export async function deleteReviewById(id) {
  return dbClient("review").where("id", id).del();
}
