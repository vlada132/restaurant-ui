import { useContext } from 'react';
import { RestaurantContext } from '../../contexts/RestaurantContext';
import Modal from '../common/Modal';

interface IProps {
  open: boolean;
}

export default function DeleteModal({ open }: IProps) {
  const { closeRestaurantModal, onDelete, restaurantDetail } =
    useContext(RestaurantContext);

  return (
    <Modal open={open}>
      <div className="w-[500px] bg-white overflow-auto">
        <div className="flex p-5 items-center border-b-2">
          <h1 className="flex-grow text-black text-[22px]">
            Delete Restaurant
          </h1>
        </div>
        <div className="content p-5">
          <span>
            Are you sure you want to delete <b>{restaurantDetail.name}</b>?
          </span>
        </div>
        <div className="flex p-5 border-t-2">
          <button
            onClick={onDelete}
            type="submit"
            className="p-2 mr-2 w-20 flex justify-center items-center bg-blue-600"
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
                color="#ffffff"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </button>
          <button
            onClick={closeRestaurantModal}
            type="button"
            className="p-2 w-10 flex justify-center items-center bg-gray-200"
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
                color="#000000"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
}
