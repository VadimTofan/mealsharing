export async function reviewSubmit(reviewData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error('Review request failed');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
