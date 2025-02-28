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

const createNewAdmin = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is Required");
  }
  if (!data?.email) {
    throw new Error("Email is Required");
  }

  const newId = data?.email; // create random id

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

  // Save the admin data to Firestore
  await setDoc(doc(db, `admins/${newId}`), {
    ...data,
    id: newId,
    imageUrl: imageUrl,
    public_id: publicId, // manage or reference the uploaded image in Cloudinary
    TimestampCreate: Timestamp.now(),
  });
};

export const updateAdmin = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is Required");
  }
  if (!data?.id) {
    throw new Error("Id is Required");
  }
  if (!data?.email) {
    throw new Error("Email is Required");
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

  // Step 3: Update the admin data in Firestore
  if (id === data?.email) {
    // If the current document ID matches the email in the new data, update the existing document
    await updateDoc(doc(db, `admins/${id}`), {
      ...data, // Spread existing data to retain other fields
      imageUrl: imageUrl, // Update with new image URL
      public_id: publicId, // Update with new public_id
      TimestampUpdate: Timestamp.now(), // Record the update timestamp
    });
  } else {
    // If the email has changed, update the document under the new email ID
    const newId = data?.email; // Get the new email as the document ID
    await deleteDoc(doc(db, `admins/${id}`)); // Delete the old document (the one with the previous ID)

    // Create or update a new document with the new ID (email)
    await updateDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageUrl: imageUrl, // Update with new image URL
      public_id: publicId, // Update with new public_id
      TimestampUpdate: Timestamp.now(),
    });
  }
};

export const deleteAdmin = async ({ id, public_id }) => {
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
    await deleteDoc(doc(db, `admins/${id}`));
  } catch (error) {
    console.error("Failed to delete Firestore document:", error.message);
    throw error;
  }
};

export default createNewAdmin;
