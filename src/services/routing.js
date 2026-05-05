export const fetchOSRMRoute = async (originCoords, destCoords) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      // OSRM returns GeoJSON coordinates in [lng, lat]. Leaflet expects [lat, lng].
      const routeGeometry = data.routes[0].geometry.coordinates;
      const polylineCoords = routeGeometry.map(coord => [coord[1], coord[0]]);
      return polylineCoords;
    }
    return null;
  } catch (error) {
    console.error("Error fetching OSRM route:", error);
    return null;
  }
};
