export async function fetchingPlaces() {
  const places = await fetch("http://localhost:3000/places");
  const data = await places.json();

  if (!places.ok) {
    throw new Error("Fail to Loading. Please try again later!");
  }
  return data.places;
}

export async function fetchingUserPlaces() {
  const places = await fetch("http://localhost:3000/user-places");
  const data = await places.json();

  if (!places.ok) {
    throw new Error("Fail to Loading. Please try again later!");
  }
  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Fail to update Places!");
  }

  const resData = response.json();

  return resData;
}
