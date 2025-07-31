import { useState, useEffect, useCallback } from "react";
import "./TripList.css";
export default function TripList() {
  const [url, setUrl] = useState("http://localhost:3000/trips");
  const [trips, setTrips] = useState([]);

  const fetchTrips = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setTrips(json);
  }, [url]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  console.log(trips);

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      {trips.map((trip) => (
        <li key={trip.id}>
          <h3>{trip.title}</h3>
          <p>{trip.price}</p>
        </li>
      ))}

      <div className="filters">
        <button
          onClick={() => setUrl("http://localhost:3000/trips?location=europe")}
        >
          European Trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
}
