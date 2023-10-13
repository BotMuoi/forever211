import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  query,
  remove,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdyTJtS_vSwf63dSU8LBJTbuTJR0_faC0",
  authDomain: "reactjs-def9b.firebaseapp.com",
  databaseURL: "https://reactjs-def9b-default-rtdb.firebaseio.com",
  projectId: "reactjs-def9b",
  storageBucket: "reactjs-def9b.appspot.com",
  messagingSenderId: "611084686692",
  appId: "1:611084686692:web:ae39a86214e0818e649671",
  measurementId: "G-9HDSYBE2S2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//==============================================
const db = getDatabase(app);
const dbRef = ref(db);

// Function to retrieve all documents in a collection
export const getAllDocuments = async (collection) => {
  try {
    const snapshot = await get(child(dbRef, `${collection}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllCommentsByUserId = async (idEp) => {
  const snapshot = await get(child(dbRef, "comments"));
  const comments = [];
  if (snapshot.exists()) {
    snapshot.val().forEach((comment) => {
      if (comment.idEpisode === idEp) {
        comments.push({ ...comment });
      }
    });
  }

  return comments;
};

export const getDataWithFilter = async (collection, filter) => {
  try {
    const snapshot = await get(child(dbRef, `${collection}`));
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val())
        .filter((item) => {
          // Check if each item in the array meets the conditions specified in the filter object
          // For example, assuming the filter object is { idCate: 1, hot: true }
          // The item must have the property 'idCate' with the value of 1
          // and the property 'hot' with the value of true to be included in the filtered result.
          for (const key in filter) {
            if (item[key] !== filter[key]) {
              return false;
            }
          }
          return true;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      return data;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addDocument = async (collectionName, data) => {
  try {
    // Get a reference to the collection and push the data to generate a new key
    const collectionRef = ref(db, collectionName);
    const newDocumentRef = push(collectionRef);

    // Set the data to the new document using the generated key
    await set(newDocumentRef, data);

    console.log("Document added to collection:", collectionName);
    const snapshot = await get(child(collectionRef, newDocumentRef.key));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const removeDocumentById = async (collectionName, id) => {
  try {
    // Create a query to find the document with the matching "id" field
    const documentsRef = ref(db, collectionName);
    const documentsQuery = query(documentsRef, orderByChild("id"), equalTo(id));

    // Get the matching documents
    const snapshot = await get(documentsQuery);
    // Loop through the matching documents and access the key using childSnapshot.key
    snapshot.forEach(async (childSnapshot) => {
      const documentKey = childSnapshot.key;
      console.log(documentKey);
      const documentRef = ref(db, `${collectionName}/${documentKey}`);
      await remove(documentRef);
      // ... Access other data of the document using childSnapshot.val()
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

export const editDocumentById = async (collectionName, id, updatedData) => {
  try {
    // Create a query to find the document with the matching "id" field
    const documentsRef = ref(db, collectionName);
    const documentsQuery = query(documentsRef, orderByChild("id"), equalTo(id));

    // Get the matching documents
    const snapshot = await get(documentsQuery);
    // Loop through the matching documents and access the key using childSnapshot.key
    snapshot.forEach(async (childSnapshot) => {
      const documentKey = childSnapshot.key;
      const documentRef = ref(db, `${collectionName}/${documentKey}`);
      await update(documentRef, updatedData);
      // ... Access other data of the document using childSnapshot.val()
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
