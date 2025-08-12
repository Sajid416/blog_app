import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import SideBar from "../pages/SideBar";
import DOMPurify from "dompurify";
function sanitizeDetails(details) {
  return DOMPurify.sanitize(details, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "ul", "li", "a", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    FORBID_ATTR: ["style"],
  });
}
const All = () => {
  const { apiData, loading } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const blogsPerPage = 9;

  const filteredData =
    selectedCategory.toLowerCase() === "all"
      ? apiData
      : apiData.filter(
          (blog) =>
            blog.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredData.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredData.length / blogsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="grid min-h-[140px] w-full place-items-center p-6">
        <svg
          className="animate-spin text-gray-400"
          width="24"
          height="24"
          viewBox="0 0 64 64"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
 
  return (
    <div className="bg-gray-100 min-h-screen py-6">
      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-6 cursor-pointer">
        {[
          "All",
          "Technology",
          "Food",
          "Health",
          "Education",
          "Sports",
          "Travel",
        ].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 px-10">
        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {currentBlogs.length === 0 ? (
            <p className="text-gray-500">No blogs found in this category.</p>
          ) : (
            currentBlogs.map((record, index) => (


    
              <div
                key={index}
                className="flex flex-col h-[400px] bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
              >
                {/* Image */}
                <img
                  src={record.imgUrl}
                  alt="Blog Cover"
                  className="w-full h-36 object-cover"
                />

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {record.category}
                    </span>
                    <h2 className="text-base font-bold text-gray-900 mt-1 hover:text-blue-700 transition">
                      {record.title}
                    </h2>
                    
                    <div
                      className="text-sm text-gray-600 mt-1 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: sanitizeDetails(record.details) }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="mt-2 pt-2">
                    <Link to={`/details/${record.id}`}>
                      <button className="px-3 py-1 cursor-pointer bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition">
                        Read More →
                      </button>
                    </Link>

                    <div className="flex items-center mt-3">
                      <img
                        src={record.authorImg}
                        alt="Author"
                        className="w-7 h-7 rounded-full object-cover mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {record.authorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <SideBar />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-100 cursor-pointer"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border cursor-pointer"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-100 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default All;
