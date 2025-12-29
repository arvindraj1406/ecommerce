import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getProduct = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true))
  );
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      ...data,
      id: snap.id,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
      TimestampCreate: data.TimestampCreate?.toDate().toISOString() ?? null,
    };
  });
};
export const getProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), orderBy("TimestampCreate", "desc"))
  );
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      ...data,
      id: snap.id,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
      timestampCreate: data.timestampCreate?.toDate().toISOString() ?? null,
    };
  });
};
export const getProductByCategory = async ({ categoryId }) => {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where("categoryId", "==", categoryId),
      orderBy("TimestampCreate", "desc")
    )
  );
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      ...data,
      id: snap.id,
      timestampUpdate: data.timestampUpdate?.toDate().toISOString() ?? null,
      timestampCreate: data.timestampCreate?.toDate().toISOString() ?? null,
    };
  });
};
