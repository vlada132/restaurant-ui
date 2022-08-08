import React, { useState } from 'react';

interface IProps {
  handleSearch: (search: string) => void;
}

export default function InputSearch({ handleSearch }: IProps) {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const search = () => {
    handleSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(value);
    }
  };

  return (
    <div className="flex items-center">
      <label className="sr-only">Search</label>
      <input
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
        type="text"
        id="search"
        className="bg-gray-50 border border-[rgb(132,132,132)] text-gray-900 text-sm focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 px-5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
        placeholder="Search"
      />
      <button
        type="submit"
        onClick={search}
        className="flex justify-center w-[90px] p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
