import React from "react";
import PropTypes from "prop-types"

export default function Drawer({children, isOpen, setIsOpen}) {
  return (
    <main
      className={
        "fixed overflow-hidden z-10 inset-0 transform ease-in-out " +
        (isOpen
          ? "transition-all opacity-100 duration-500 translate-x-0"
          : "transition-all delay-50 opacity-0 translate-x-full")
      }
      style={{ zIndex: 50 }}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div
        className={
          "bg-white h-full w-full md:w-96 md:max-w-md absolute right-0 p-4 " +
          (isOpen ? "transform translate-x-0 ease-out" : "transform translate-x-full ease-in")
        }
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Welcome to FoodSnap!</h2>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="text-gray-600 focus:outline-none"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="heroicon-ui"
                d="M6.7 5.3a1 1 0 0 0-1.4 1.4L10.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4L12 13.4l5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 0 0-1.4-1.4L12 10.6l-5.3-5.3z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-4">{children}</div>
      </div>
    </main>
  );
}

Drawer.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};