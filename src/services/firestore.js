import { db } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp, 
  orderBy,
  limit
} from 'firebase/firestore';

// User Services
export const createUserProfile = async (uid, username, email) => {
  try {
    await setDoc(doc(db, "users", uid), {
      username,
      email,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error creating user profile: ", error);
  }
};

export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    return null;
  }
};

// Route Services
export const findRoute = async (origin, destination) => {
  try {
    const routesRef = collection(db, "routes");
    const q = query(routesRef, 
      where("origin", "==", origin),
      where("destination", "==", destination)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const routeData = querySnapshot.docs[0].data();
      return { id: querySnapshot.docs[0].id, ...routeData };
    }
    return null; // Return null if not found to trigger mock data fallback
  } catch (error) {
    console.error("Error finding route: ", error);
    return null;
  }
};

// Feedback Services
export const saveFeedback = async (routeId, helpful, comment = "") => {
  try {
    await addDoc(collection(db, "feedback"), {
      routeId: routeId || "mock-route",
      helpful,
      comment,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving feedback: ", error);
  }
};

// Announcements Services
export const getAnnouncements = async () => {
  try {
    const announcementsRef = collection(db, "announcements");
    const q = query(announcementsRef, orderBy("createdAt", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching announcements: ", error);
    return [];
  }
};

// Profit Tracking
export const recordEarnings = async (amount) => {
  try {
    await addDoc(collection(db, "earnings"), {
      amount,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error recording earnings: ", error);
  }
};
