import { useContext } from 'react';
import InputSearch from '../components/common/InputSearch';
import Pagination from '../components/common/Pagination';
import ListRestaurant from '../components/restaurant/List';
import DeleteModal from '../components/restaurant/DeleteModal';
import UpdateFormModal from '../components/restaurant/UpdateFormModal';
import { LIMIT } from '../constants/pagination';
import { RestaurantContext } from '../contexts/RestaurantContext';

export default function Restaurant() {
  const { loading, mode, paging, openAddRestaurantModal, refetch, onSearch } =
    useContext(RestaurantContext);
  return (
    <>
      {/* Search */}
      <InputSearch handleSearch={onSearch} />

      {/* Add and Update Restaurant Modal */}
      <UpdateFormModal
        title={`${mode === 'add' ? 'Add' : 'Edit'} Restaurant`}
        open={['add', 'edit'].includes(mode)}
      />

      {/* Delete Restaurant Modal */}
      <DeleteModal open={mode === 'delete'} />

      {/* List restaurant */}
      <ListRestaurant />

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-between mt-6">
          <button
            className="btn inline-block px-6 py-2 bg-blue-600 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-blue-800"
            type="button"
            onClick={openAddRestaurantModal}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                color="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
          {paging.totalPage !== 0 && (
            <Pagination limit={LIMIT} paging={paging} onChangePage={refetch} />
          )}
        </div>
      )}
    </>
  );
}
