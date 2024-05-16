import React from 'react';

function Filter() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Filter</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option>All</option>
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <input type="range" min="0" max="100" className="mt-1 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option>All</option>
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price Range</label>
        <input type="range" min="0" max="100" className="mt-1 w-full" />
      </div>
    </div>
    
    
  );
}

export default Filter;
