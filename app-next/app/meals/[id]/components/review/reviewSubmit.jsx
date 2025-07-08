export default async function reviewSubmit(reviewData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Review request failed");
    }

    const data = await response.json();
    console.log("Review success:", data.message);
    return { success: true, data };
  } catch (err) {
    console.error("Review error:", err.message);
    return { success: false, error: err.message };
  }
}
