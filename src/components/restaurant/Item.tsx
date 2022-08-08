import { useContext } from 'react';
import {
  Restaurant,
  RestaurantContext,
} from '../../contexts/RestaurantContext';

interface IProps {
  data: Restaurant;
}

export default function Item({ data }: IProps) {
  const { openDeleteRestaurantModal } = useContext(RestaurantContext);

  return (
    <div className="bg-[rgb(243,244,245)] group hover:bg-blue-600 hover:text-white text-left p-5 my-2 cursor-pointer">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[22px]">{data.name}</h1>
          <p className="text-[16px] pt-2">{data.address}</p>
        </div>
        <button
          type="button"
          onClick={(e: any) => openDeleteRestaurantModal(e, data)}
          className="px-4 py-1 h-[50px] bg-blue-900 hidden group-hover:block"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex justify-between pt-8 text-left">
        <p className="mail text-blue-600 group-hover:text-white">
          {data.email}
        </p>
        <p className="phone">{data.phone}</p>
      </div>
    </div>
  );
}
