import TripList from "./components/TripList";

import "./App.css";
import { useState } from "react";

function App() {
  const [showTrips, setShowTrips] = useState(true);
  return (
    <div className="App">
      <button onClick={() => setShowTrips(false)}>Hide trips</button>
      {showTrips && <TripList />}
    </div>
  );
}

export default App;
