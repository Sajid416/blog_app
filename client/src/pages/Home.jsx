import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const Home = () => {
  const { apiData, loading } = useContext(DataContext);
  const location = useLocation();
  
  const list = [
    { item: "All", url: "/all" },  // Keep as "/all" for data loading
    { item: "Technology", url: "/technology" },
    { item: "Food", url: "/food" },
    { item: "Health", url: "/health" },
    { item: "Education", url: "/education" },
    { item: "Sports", url: "/sports" },
    { item: "Travel", url: "/travel" },
  ];

  // Check if current route is home or "all" category
  const isAllCategory = location.pathname === "/" || location.pathname === "/all";

  return (
    <div>
      <ul className="flex gap-10 pt-4 pb-2 text-sm text-gray-500 font-semibold ml-12 cursor-pointer">
        {list.map((item, ind) => (
          <li key={ind}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                isActive || (item.url === "/all" && isAllCategory)
                  ? "text-orange-500 underline font-semibold"
                  : "transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-violet-600"
              }
            >
              {item.item}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;