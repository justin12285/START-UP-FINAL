// Approximate coordinates for Butuan City routes
export const mockRoutes = [
  {
    id: "route-1",
    origin: "Robinsons Butuan",
    destination: "SM City Butuan",
    routeName: "R4 Multicab (Libertad-Bancasi)",
    transportType: "Multicab",
    landmarks: ["Gaisano Mall", "Guingona Park", "City Hall"],
    coordinates: [
      [8.9416, 125.5350], // Robinsons approx
      [8.9450, 125.5380],
      [8.9500, 125.5420],
      [8.9540, 125.5450]  // SM City approx
    ]
  },
  {
    id: "route-2",
    origin: "Butuan City Hall",
    destination: "Bancasi Airport",
    routeName: "R4 Multicab Extension",
    transportType: "Multicab",
    landmarks: ["Gaisano", "Robinsons", "Libertad"],
    coordinates: [
      [8.9480, 125.5430], // City Hall approx
      [8.9430, 125.5350],
      [8.9350, 125.5200],
      [8.9500, 125.4780]  // Bancasi Airport approx
    ]
  },
  {
    id: "route-3",
    origin: "Gaisano Mall",
    destination: "Libertad Public Market",
    routeName: "R1 Multicab",
    transportType: "Multicab",
    landmarks: ["JC Aquino Ave", "Imadejas"],
    coordinates: [
      [8.9470, 125.5400], // Gaisano approx
      [8.9450, 125.5300],
      [8.9420, 125.5200]  // Libertad approx
    ]
  },
  {
    id: "route-4",
    origin: "Father Saturnino Urios University",
    destination: "Butuan Doctors Hospital",
    routeName: "Orange Tricycle",
    transportType: "Tricycle",
    landmarks: ["Guingona Park", "Estacio Village"],
    coordinates: [
      [8.9490, 125.5435], // FSUU approx
      [8.9460, 125.5410],
      [8.9400, 125.5380]  // Butuan Doctors approx
    ]
  }
];

export const getMockRoute = (origin, destination) => {
  return mockRoutes.find(r => 
    r.origin.toLowerCase() === origin.toLowerCase() && 
    r.destination.toLowerCase() === destination.toLowerCase()
  );
};

export const popularSearches = [
  { origin: "Robinsons Butuan", destination: "SM City Butuan", label: "Robinsons to SM City" },
  { origin: "Butuan City Hall", destination: "Bancasi Airport", label: "City Hall to Airport" },
  { origin: "Gaisano Mall", destination: "Libertad Public Market", label: "Gaisano to Libertad" },
  { origin: "Father Saturnino Urios University", destination: "Butuan Doctors Hospital", label: "FSUU to Doctors Hosp" }
];
