import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

const createNewCategory = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is Required");
  }
  if (!data?.slug) {
    throw new Error("Slug is Required");
  }
  const newId = doc(collection(db, `ids`)).id; // create random id

  // Upload the image to Cloudinary and entries store in firebase
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ecommerce"); // Replace with your Cloudinary upload preset
  formData.append("cloud_name", "dl7pdcv9i"); // Replace with your Cloudinary cloud name

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dl7pdcv9i/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const uploadResponse = await response.json();
  const imageUrl = uploadResponse.secure_url; // Get the secure URL from Cloudinary
  const publicId = uploadResponse.public_id; // Cloudinary public_id
  //It is used to generate a unique document ID in Firestore without actually creating a document in the database.
  //const imageRef = ref(storage, `categories/$(newId)`);
  //await uploadBytes(imageRef, image);
  //const imageUrl = await getDownloadURL(imageRef);

  // Save the category data to Firestore
  await setDoc(doc(db, `categories/${newId}`), {
    ...data,
    id: newId,
    imageUrl: imageUrl,
    public_id: publicId, // manage or reference the uploaded image in Cloudinary
    TimestampCreate: Timestamp.now(),
  });
};

export const updateCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is Required");
  }
  if (!data?.slug) {
    throw new Error("Slug is Required");
  }
  if (!data?.id) {
    throw new Error("Id is Required");
  }

  const id = data?.id;

  // Step 1: Delete the old image from Cloudinary if a new image is provided
  if (image && data?.public_id) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cloudinary/delete-image",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: data.public_id }), // Delete old image
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Cloudinary API error:", result.error);
        throw new Error(
          result.error || "Failed to delete old image from Cloudinary"
        );
      }

      if (!result.success) {
        throw new Error("Cloudinary deletion was unsuccessful");
      }
    } catch (error) {
      console.error(
        "Failed to delete old image from Cloudinary:",
        error.message
      );
      throw error;
    }
  }

  // Step 2: Upload the new image to Cloudinary
  let imageUrl = data?.imageUrl; // Use existing image URL if no new image is uploaded
  let publicId = data?.public_id;

  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ecommerce");
    formData.append("cloud_name", "dl7pdcv9i");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dl7pdcv9i/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload new image to Cloudinary");
    }

    const uploadResponse = await response.json();
    imageUrl = uploadResponse.secure_url; // New image URL
    publicId = uploadResponse.public_id; // New Cloudinary public_id
  }

  // Step 3: Update the category data in Firestore
  await updateDoc(doc(db, `categories/${id}`), {
    ...data,
    imageUrl: imageUrl, // Update with new image URL
    public_id: publicId, // Update with new public_id
    TimestampUpdate: Timestamp.now(),
  });
};

export const deleteCategory = async ({ id, public_id }) => {
  // Check if the 'id' is provided
  if (!id) {
    throw new Error("ID is required");
  }

  // Delete the image from Cloudinary
  if (public_id) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cloudinary/delete-image",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Cloudinary API error:", result.error);
        throw new Error(
          result.error || "Failed to delete image from Cloudinary"
        );
      }

      if (!result.success) {
        throw new Error("Cloudinary deletion was unsuccessful");
      }
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error.message);
      throw error;
    }
  }

  // Delete the document from Firestore
  try {
    await deleteDoc(doc(db, `categories/${id}`));
  } catch (error) {
    console.error("Failed to delete Firestore document:", error.message);
    throw error;
  }
};

export default createNewCategory;
