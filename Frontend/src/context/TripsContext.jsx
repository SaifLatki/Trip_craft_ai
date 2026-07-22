import { createContext, useContext, useState, useCallback, useEffect } from "react";

const TripsContext = createContext(null);

function loadTrips() {
  try {
    const raw = localStorage.getItem("savedTrips");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState(loadTrips);

  useEffect(() => {
    localStorage.setItem("savedTrips", JSON.stringify(trips));
  }, [trips]);

  const saveTrip = useCallback((trip) => {
    const saved = {
      ...trip,
      id: trip.id || `trip-${Date.now()}`,
      createdAt: trip.createdAt || new Date().toISOString(),
    };

    setTrips((prev) => {
      const filtered = prev.filter((t) => t.id !== saved.id);
      return [saved, ...filtered];
    });

    return saved;
  }, []);

  const deleteTrip = useCallback((id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTrip = useCallback(
    (id) => {
      return trips.find((t) => t.id === id);
    },
    [trips]
  );

  return (
    <TripsContext.Provider
      value={{
        trips,
        saveTrip,
        deleteTrip,
        getTrip,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error("useTrips must be used within TripsProvider");
  }

  return context;
}