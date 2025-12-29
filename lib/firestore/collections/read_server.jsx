import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getCollection = async ({ id }) => {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const getCollections = async () => {
  const list = await getDocs(collection(db, "collections"));

  return list.docs.map((snap) => {
    const data = snap.data();

    return {
      ...data,
      id: snap.id,

      // Fix Timestamp fields:
      TimestampCreate: data.TimestampCreate?.toDate().toISOString() ?? null,
      TimestampUpdate: data.TimestampUpdate?.toDate().toISOString() ?? null,
    };
  });
};
