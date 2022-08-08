import { useContext } from 'react';
import { RestaurantContext } from '../../contexts/RestaurantContext';
import Item from './Item';
import Skeleton from './Skeleton';

export default function ListRestaurant() {
  const { restaurants, loading, openEditRestaurantModal } =
    useContext(RestaurantContext);

  return (
    <div className="list-restaurants mt-10">
      {loading ? (
        <Skeleton />
      ) : (
        restaurants?.map((item) => (
          <div key={item.id} onClick={() => openEditRestaurantModal(item)}>
            <Item key={item.id} data={item} />
          </div>
        ))
      )}
    </div>
  );
}
