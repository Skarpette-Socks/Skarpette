type Item = {
  vendor_code: number,
  size: string,
}

export const checkAvailability = async (items: Item[]) => {
  try {
    const response = await fetch('http://185.237.207.177:5000/order/checkAvailability', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error ('check availability error:', error);
    return [];
  }
}