export const fetchOSRMRoute = async (originCoords, destCoords) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson&steps=true`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const routeGeometry = route.geometry.coordinates;
      const polylineCoords = routeGeometry.map(coord => [coord[1], coord[0]]);
      
      const distanceKm = (route.distance / 1000).toFixed(1);
      const durationMins = Math.round(route.duration / 60);
      
      // Extract main maneuvers — filter micro-steps to keep "Simple Route Mode"
      const steps = route.legs[0].steps.map(step => ({
        instruction: step.maneuver.modifier 
          ? `Turn ${step.maneuver.modifier.replace('-', ' ')} onto ${step.name || 'main road'}`
          : `Continue on ${step.name || 'main highway'}`,
        distance: (step.distance / 1000).toFixed(1),
      })).filter(s => parseFloat(s.distance) > 0.1);

      return {
        coords: polylineCoords,
        distance: distanceKm,
        duration: durationMins,
        steps: steps.length > 0 ? steps : [{ instruction: "Continue straight on main highway", distance: distanceKm }]
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching OSRM route:", error);
    return null;
  }
};
