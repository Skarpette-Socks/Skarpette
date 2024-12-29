export const createNewItem = async (vendorCode: string, itemData: object) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const response = await fetch(`http://185.237.207.177:5000/new/${vendorCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(itemData),
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

export const createHitItem = async (vendorCode: string, itemData: object) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const response = await fetch(`http://185.237.207.177:5000/hit/${vendorCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(itemData),
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