"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ size: ["extra-small", "small", "medium", "large"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

export default function Description({ data, handleData }) {
  // Local state to manage typing properly
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    // Ensure hydration consistency
    setEditorContent(data?.description || "");
  }, [data?.description]);

  const handleChange = (value) => {
    setEditorContent(value); // Update local state
    handleData("description", value); // Call parent function
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Description</h1>
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your description here..."
      />
    </section>
  );
}
