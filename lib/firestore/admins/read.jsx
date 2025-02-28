"use client";

// Import necessary modules from Firebase and SWR
import { db } from "@/lib/firebase"; // Firebase database instance
import { collection, onSnapshot } from "firebase/firestore"; // Firestore collection and real-time listener
import useSWRSubscription from "swr/subscription"; // SWR's subscription hook for handling real-time data

// Define a custom hook to fetch categories from Firestore
export function useAdmins() {
  // Use SWRSubscription to listen for changes in the "categories" collection
  const { data, error } = useSWRSubscription(
    ["admins"], // Key for the SWR cache (can include collection path and params)
    ([path], { next }) => {
      // Extract the Firestore collection path from the key

      const ref = collection(db, path); // Get a reference to the "categories" collection

      // Set up a real-time listener to Firestore
      const unsub = onSnapshot(
        ref, // Firestore reference
        (snapshot) => {
          // Callback function when data changes

          // Pass the updated data to SWR's `next` function
          next(
            null, // No error
            snapshot.docs.length === 0 // If the collection is empty
              ? null // Return null if there are no documents
              : snapshot.docs.map((snap) => snap.data()) // Map over the snapshot and extract document data
          );
        },
        (err) => next(err, null) // Pass errors to SWR's `next` function
      );

      // Return a cleanup function to unsubscribe the listener when the component unmounts
      return () => unsub();
    }
  );

  // Return the data, error, and loading state to the component
  return { data, error: error?.message, isLoading: data === undefined };
}
