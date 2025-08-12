import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './../context/DataContext';
import DOMPurify from "dompurify";
function sanitizeDetails(details) {
  return DOMPurify.sanitize(details, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "ul", "li", "a", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    FORBID_ATTR: ["style"],
  });
}

const Home = () => {
  const {apiData,loading}=useContext(DataContext)
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-gray-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BlogVerse</h1>
          <p className="text-xl">Discover stories, ideas, and insights that inspire.</p>
          <Link
            to="all"
            className="mt-6 inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Explore All Blogs
          </Link>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-white ">
            {['Technology', 'Food', 'Health', 'Education', 'Sports', 'Travel'].map((category, index) => (
              <Link
                key={index}
                to={`/details/${category.id}`}
                className="bg-gray-900 shadow-md hover:shadow-lg transition rounded-xl p-4 text-center font-medium text-lg"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-10 bg-white ">
        <div className="max-w-5xl px-6 pb-4">
          <h2 className="text-3xl font-semibold mb-6">Latest Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {apiData.slice(0,3).map((item,index) => (
              <div
                key={index}
                className="bg-gray-100 h-[300px] shadow-lg rounded-2xl hover:shadow-xl transition"
              > 
                <img
                  src={item.imgUrl}
                  alt="Blog Cover"
                  className="w-full h-25 object-cover rounded-t-2xl"
                />
                <h3 className="text-xl font-semibold mb-2 ml-2">{item.title}</h3>
                <p className='text-orange-400 ml-2'>{item.category}</p>
                <div
                      className="text-sm text-gray-600 mb-3 line-clamp-2 ml-2"
                      dangerouslySetInnerHTML={{ __html: sanitizeDetails(item.details) }}
                    />
                <Link
                  to={`/details/${item.id}`}
                  className="text-blue-600 flex justify-center items-center hover:underline font-medium ml-2 pb-4"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
