import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/DataContext";
import { useContext, useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { fetchData } = useContext(DataContext);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  // Use QuillJS editor hook
  const { quill, quillRef } = useQuill();

  // Sync quill content to react-hook-form's "details" field
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue("details", quill.root.innerHTML, { shouldValidate: true });
      });
    }
  }, [quill, setValue]);

  // States for uploads
  const [uploadingBlogImg, setUploadingBlogImg] = useState(false);
  const [uploadingAuthorImg, setUploadingAuthorImg] = useState(false);

  // Preview URLs
  const [blogImgPreview, setBlogImgPreview] = useState("");
  const [authorImgPreview, setAuthorImgPreview] = useState("");

  // Watch imgUrl and authorImg to update previews
  const imgUrl = watch("imgUrl");
  const authorImg = watch("authorImg");

  useEffect(() => {
    setBlogImgPreview(imgUrl || "");
  }, [imgUrl]);

  useEffect(() => {
    setAuthorImgPreview(authorImg || "");
  }, [authorImg]);

  // Upload image function
  const uploadImage = async (e, fieldName, setUploading) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Set image URL in the form field
      setValue(fieldName, res.data.url, { shouldValidate: true });
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8080", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        alert("Blog Added Successfully");
        fetchData();
        reset();
        if (quill) quill.setContents([]); // Clear editor
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Error in Submitting Blog", error);
        alert("Something went wrong while adding the blog.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl sm:text-4xl font-bold font-pacifico">
        Create Blog
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-8 my-5 bg-gray-100 rounded shadow-lg space-y-4"
      >
        <div className="flex flex-row justify-between gap-6">
          <div className="flex-1 space-y-6">
            {/* Blog Image URL + upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Image URL <span className="text-red-500">*</span>
              </label>
              <input
                {...register("imgUrl", { required: "Image URL is required" })}
                className="border border-gray-500 px-3 py-2 rounded-md w-full"
                placeholder="Paste image URL or upload below"
              />
              {errors.imgUrl && (
                <p className="text-red-500 text-sm">{errors.imgUrl.message}</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadImage(e, "imgUrl", setUploadingBlogImg)
                }
                className="mt-2"
              />
              {uploadingBlogImg && <p>Uploading image...</p>}

              {blogImgPreview && (
                <img
                  src={blogImgPreview}
                  alt="Blog Preview"
                  className="mt-2 max-h-48 object-contain"
                />
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category", {
                  required: "Category selection is required",
                })}
                className="border border-gray-500 px-3 py-2 rounded-md w-full"
              >
                <option value="">-- Choose a category --</option>
                <option value="Technology">Technology</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="border border-gray-500 px-3 py-2 rounded-md w-full"
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div className="flex-2 space-y-4">
            {/* Blog Details (rich text) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Details <span className="text-red-500">*</span>
              </label>
              <div>
                <div ref={quillRef} />
              </div>
              {errors.details && (
                <p className="text-red-500 text-sm">{errors.details.message}</p>
              )}
            </div>

            {/* Author Image URL + upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Image URL <span className="text-red-500">*</span>
              </label>
              <input
                {...register("authorImg", {
                  required: "Author image URL is required",
                })}
                className="border border-gray-500 px-3 py-2 rounded-md w-full"
                placeholder="Paste author image URL or upload below"
              />
              {errors.authorImg && (
                <p className="text-red-500 text-sm">{errors.authorImg.message}</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadImage(e, "authorImg", setUploadingAuthorImg)
                }
                className="mt-2"
              />
              {uploadingAuthorImg && <p>Uploading image...</p>}

              {authorImgPreview && (
                <img
                  src={authorImgPreview}
                  alt="Author Preview"
                  className="mt-2 max-h-24 object-contain rounded-full"
                />
              )}
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("authorName", { required: "Author name is required" })}
                className="border border-gray-500 px-3 py-2 rounded-md w-full"
                placeholder="Enter author name"
              />
              {errors.authorName && (
                <p className="text-red-500 text-sm">{errors.authorName.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
