export const fetchDataWithNewLabel = async () => {
  try {
    const response = await fetch("http://localhost:5000/new", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};
