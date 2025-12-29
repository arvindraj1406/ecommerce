import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getCategory = async ({ id }) => {
  // Create a reference to the document in the 'categories' collection with the given 'id'
  const data = await getDoc(doc(db, `categories/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const getCategories = async () => {
  const list = await getDocs(collection(db, "categories"));

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
