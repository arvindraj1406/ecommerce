import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Cloudinary Config (Replace with your Cloudinary details)
const CLOUDINARY_UPLOAD_PRESET = "ecommerce";
const CLOUDINARY_CLOUD_NAME = "dl7pdcv9i";
const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/dl7pdcv9i/image/upload`;

export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image is required");
  }

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const response = await fetch(CLOUDINARY_API, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Cloudinary URL
  };

  // Upload Feature Image
  const featuredImageURL = await uploadToCloudinary(featureImage);

  // Upload Image List
  const imageURLList = await Promise.all(
    imageList.map((image) => uploadToCloudinary(image))
  );

  // Generate Unique ID for the Product
  const newId = doc(collection(db, `ids`)).id;

  // Store in Firestore
  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featuredImageURL: featuredImageURL,
    imageList: imageURLList,
    id: newId,
    TimestampCreate: Timestamp.now(),
  });
};

export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  let featuredImageURL = data?.featuredImageURL ?? "";
  let imageURLList = data?.imageList ? [...data.imageList] : [];

  // Function to extract public_id from Cloudinary URL
  const getPublicId = (url) => {
    if (!url) return null;
    const parts = url.split("/");
    return parts[parts.length - 1].split(".")[0]; // Extracts public_id from URL
  };

  // Delete old feature image if a new one is provided
  if (featureImage && data?.featuredImageURL) {
    const publicId = getPublicId(data?.featuredImageURL);
    if (publicId) {
      try {
        const deleteResponse = await fetch(
          "http://localhost:3000/api/cloudinary/delete-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: publicId }),
          }
        );

        const deleteData = await deleteResponse.json();
        if (!deleteResponse.ok) {
          console.error("Failed to delete image from Cloudinary:", deleteData);
        } else {
          console.log("Successfully deleted old feature image:", publicId);
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }
  }

  // Upload new feature image
  if (featureImage) {
    const formData = new FormData();
    formData.append("file", featureImage);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_API, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload feature image");
      }

      const responseData = await response.json();
      featuredImageURL = responseData.secure_url;

      // Ensure feature image is first in imageList
      imageURLList = [
        featuredImageURL,
        ...imageURLList.filter((img) => img !== data.featuredImageURL),
      ];
    } catch (error) {
      console.error("Error uploading feature image:", error);
    }
  }

  // Upload additional images
  if (imageList?.length) {
    for (let i = 0; i < imageList.length; i++) {
      const image = imageList[i];
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(CLOUDINARY_API, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload image ${i + 1}`);
        }

        const responseData = await response.json();
        imageURLList.push(responseData.secure_url);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
      }
    }
  }

  // Remove duplicates from image list
  imageURLList = [...new Set(imageURLList)];

  // Update Firestore document
  try {
    await updateDoc(doc(db, `products/${data?.id}`), {
      ...data,
      featuredImageURL: featuredImageURL,
      imageList: imageURLList,
      timestampUpdate: Timestamp.now(),
    });
    console.log("Product updated successfully in Firestore");
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};

// Function to extract public_id from Cloudinary URL
const getPublicId = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  return parts[parts.length - 1].split(".")[0]; // Extracts public_id
};

// Function to delete an image from Cloudinary
const deleteImageFromCloudinary = async (public_id) => {
  if (!public_id) {
    console.warn("Skipping Cloudinary deletion: public_id is missing.");
    return;
  }

  try {
    console.log(`Deleting image from Cloudinary: ${public_id}`);
    const response = await fetch("/api/cloudinary/delete-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to delete image from Cloudinary");
    }

    console.log(`Successfully deleted image ${public_id} from Cloudinary`);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error.message);
  }
};

// Delete Product Function
export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("Product ID is required.");
  }

  //  Fetch product from Firestore before deleting
  const productRef = doc(db, `products/${id}`);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error(`Product with ID ${id} does not exist.`);
  }

  const productData = productSnap.data();
  console.log("Fetched product data:", productData); // Log the data

  const { featuredImageURL, imageList } = productData;

  console.log("Featured Image URL:", featuredImageURL);
  console.log("Image List:", imageList);

  try {
    //console.log("Starting deletion process...");

    //  Delete feature image from Cloudinary
    if (featuredImageURL) {
      const publicId = getPublicId(featuredImageURL);
      await deleteImageFromCloudinary(publicId);
    }

    //  Delete image list from Cloudinary
    if (imageList?.length) {
      await Promise.all(
        imageList.map((img) => deleteImageFromCloudinary(getPublicId(img)))
      );
    }

    //  Delete product from Firestore
    await deleteDoc(productRef);
    console.log(`Product ${id} deleted successfully from Firestore.`);
  } catch (error) {
    console.error("Error deleting product or images:", error.message);
    throw error;
  }
};
