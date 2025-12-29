"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  startAfter,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useProducts({ pageLimit = 10, lastSnapDoc }) {
  const { data, error } = useSWRSubscription(
    ["products", pageLimit, lastSnapDoc],
    ([path, pageLimit, lastSnapDoc], { next }) => {
      const ref = collection(db, path);
      let q = query(ref, limit(pageLimit + 1)); // fetch one extra item

      if (lastSnapDoc) {
        q = query(ref, startAfter(lastSnapDoc), limit(pageLimit + 1));
      }

      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs;
          const hasNextPage = docs.length > pageLimit;

          const products = hasNextPage ? docs.slice(0, pageLimit) : docs;

          next(null, {
            list: products.map((doc) => ({ id: doc.id, ...doc.data() })),
            lastSnapDoc:
              products.length > 0 ? products[products.length - 1] : null,
            hasNextPage,
          });
        },
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data?.list,
    lastSnapDoc: data?.lastSnapDoc,
    hasNextPage: data?.hasNextPage ?? false,
    error: error?.message,
    isLoading: data === undefined,
  };
}

export function useProduct({ productId }) {
  const { data, error } = useSWRSubscription(
    ["products", productId],
    ([path, productId], { next }) => {
      const ref = doc(db, `${path}/${productId}`);

      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          next(null, snapshot.data());
        },
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data,
    lastSnapDoc: data?.lastSnapDoc,
    hasNextPage: data?.hasNextPage ?? false,
    error: error?.message,
    isLoading: data === undefined,
  };
}
