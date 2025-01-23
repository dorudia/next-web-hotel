"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

function ReservationProvider({ children }) {
  const [range, setRange] = useState((from, to) => {
    if ((from = to)) return;
    return { from: undefined, to: undefined };
  });
  const resetRange = () => {
    setRange({ from: null, to: null });
  };

  return (
    <ReservationContext.Provider
      value={{ range, setRange, resetRange: resetRange }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) throw new Error("Contex used outside provider!");

  return context;
};

export { ReservationProvider, useReservation };
