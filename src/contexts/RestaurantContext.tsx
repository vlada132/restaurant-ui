import { useMutation, useQuery } from '@apollo/client';
import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { LIMIT } from '../constants/pagination';
import { deleteRestaurantMutation, getListRestaurantQuery } from '../graphql';

export type Mode = 'add' | 'edit' | 'delete' | '';

export interface Paging {
  totalPage: number;
  currentPage: number;
  total: number;
  itemPerPage: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}
export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export type StateContext = {
  mode: Mode;
  restaurantDetail: Restaurant;
  restaurants: Restaurant[];
  paging: Paging;
  loading: boolean;
  refetch: ({ page, limit, search }: PaginationParams) => void;
  onSearch: (search: string) => void;
  openAddRestaurantModal: () => void;
  openDeleteRestaurantModal: (e: Event, item: Restaurant) => void;
  openEditRestaurantModal: (item: Restaurant) => void;
  closeRestaurantModal: () => void;
  onDelete: () => void;
};

const initialRestaurant: Restaurant = {
  name: '',
  address: '',
  email: '',
  phone: '',
};

export const RestaurantContext = createContext<StateContext>({
  mode: '',
  restaurantDetail: initialRestaurant,
  restaurants: [initialRestaurant],
  paging: {
    totalPage: 0,
    currentPage: 1,
    total: 0,
    itemPerPage: 0,
  },
  loading: false,
  refetch: () => {},
  onSearch: () => {},
  openAddRestaurantModal: () => {},
  openDeleteRestaurantModal: () => {},
  openEditRestaurantModal: () => {},
  closeRestaurantModal: () => {},
  onDelete: () => {},
});

const RestaurantProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [mode, setMode] = useState<Mode>('');

  const [restaurantDetail, setRestaurantDetail] =
    useState<Restaurant>(initialRestaurant);
  const { loading, data, refetch } = useQuery(getListRestaurantQuery, {
    variables: { limit: LIMIT, page: 1, search: '' },
  });

  const paging = useMemo(
    () => ({
      totalPage: data?.getListRestaurant?.totalPage,
      currentPage: data?.getListRestaurant?.currentPage,
      total: data?.getListRestaurant?.total,
      itemPerPage: data?.getListRestaurant?.itemPerPage,
    }),
    [data],
  );

  const restaurants: Restaurant[] = useMemo(
    () => data?.getListRestaurant?.data,
    [data?.getListRestaurant?.data],
  );

  const [deleteRestaurant] = useMutation(deleteRestaurantMutation);

  const openAddRestaurantModal = () => {
    setMode('add');
    setRestaurantDetail(initialRestaurant);
  };

  const openDeleteRestaurantModal = (e: Event, item: Restaurant) => {
    e.stopPropagation();
    setRestaurantDetail(item);
    setMode('delete');
  };

  const openEditRestaurantModal = (item: Restaurant) => {
    setMode('edit');
    setRestaurantDetail(item);
  };

  const closeRestaurantModal = () => {
    setMode('');
  };

  const onDelete = () => {
    deleteRestaurant({ variables: { id: restaurantDetail?.id } });
    toast.success('Delete restaurant successfully');
    refetch({
      limit: LIMIT,
      page: restaurants.length === 1 ? 1 : paging.currentPage,
    });
    setMode('');
  };

  const onSearch = (search: string) => {
    refetch({ limit: 5, page: 1, search });
  };

  const option: StateContext = {
    mode,
    restaurantDetail,
    restaurants,
    paging,
    loading,
    refetch,
    onSearch,
    openAddRestaurantModal,
    openDeleteRestaurantModal,
    openEditRestaurantModal,
    closeRestaurantModal,
    onDelete,
  };

  return (
    <RestaurantContext.Provider value={option}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
