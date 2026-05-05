export const locationDictionary = {
  "SM City Butuan": { lat: 8.9540, lng: 125.5450 },
  "Robinsons Butuan": { lat: 8.9416, lng: 125.5350 },
  "Gaisano Mall": { lat: 8.9470, lng: 125.5400 },
  "Butuan City Hall": { lat: 8.9480, lng: 125.5430 },
  "Bancasi Airport": { lat: 8.9500, lng: 125.4780 },
  "Libertad Public Market": { lat: 8.9420, lng: 125.5200 },
  "Father Saturnino Urios University": { lat: 8.9490, lng: 125.5435 },
  "Butuan Doctors Hospital": { lat: 8.9400, lng: 125.5380 }
};

export const popularSearches = [
  { origin: "SM City Butuan", destination: "Robinsons Butuan", label: "SM to Robinsons" },
  { origin: "Robinsons Butuan", destination: "SM City Butuan", label: "Robinsons to SM" },
  { origin: "Gaisano Mall", destination: "Libertad Public Market", label: "Gaisano to Libertad" }
];

export const getCoordinates = (locationName) => {
  // Case-insensitive match
  const key = Object.keys(locationDictionary).find(
    k => k.toLowerCase() === locationName.toLowerCase()
  );
  return key ? locationDictionary[key] : null;
};
