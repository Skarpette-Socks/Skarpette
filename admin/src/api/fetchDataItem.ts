export const fetchDataItem = async ( vendor_code: number ) => {
  try {
    const response = await fetch(`http://185.237.207.177:5000/skarpette/search?vendor_code=${vendor_code}`, {
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