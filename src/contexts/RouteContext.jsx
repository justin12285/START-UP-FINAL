import React, { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export function useRouteContext() {
  return useContext(RouteContext);
}

export function RouteProvider({ children }) {
  const [route, setRoute] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [originPos, setOriginPos] = useState(null);
  const [destPos, setDestPos] = useState(null);

  const setRouteData = (newRoute, coords, origin, dest) => {
    setRoute(newRoute);
    setRouteCoords(coords);
    setOriginPos(origin);
    setDestPos(dest);
  };

  const clearRoute = () => {
    setRoute(null);
    setRouteCoords([]);
    setOriginPos(null);
    setDestPos(null);
  };

  return (
    <RouteContext.Provider value={{ route, routeCoords, originPos, destPos, setRouteData, clearRoute }}>
      {children}
    </RouteContext.Provider>
  );
}
