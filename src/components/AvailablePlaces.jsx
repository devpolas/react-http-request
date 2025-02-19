import Places from "./Places.jsx";
import Err from "./Error.jsx";
import { sortPlacesByDistance } from "./../loc.js";
import { fetchingPlaces } from "../https.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortPlaces() {
  const places = await fetchingPlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}
export default function AvailablePlaces({ onSelectPlace }) {
  const {
    data: availablePlaces,
    isLoading,
    error,
  } = useFetch(fetchSortPlaces, []);

  if (error) {
    return <Err title="Error" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
