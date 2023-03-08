import React from "react";

function NotificationModal({setModalOn}) {
  return (
    <div
    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
   
  >
    {/* Modal content */}
    <div className="bg-white rounded-lg p-6 transform transition-all ease-in-out duration-500 max-w-lg">
      <h2 className="text-xl font-bold mb-4">Modal Title</h2>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        scelerisque turpis et justo bibendum, eget commodo dui ultrices.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalOn(false)}
      >
        Close Modal
      </button>
    </div>
  </div>

  );
}

export default NotificationModal;
