import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: "Public ID is required" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    res.status(500).json({ error: "Failed to delete image from Cloudinary" });
  }
}
