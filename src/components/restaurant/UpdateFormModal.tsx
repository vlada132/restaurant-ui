import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  createRestaurantMutation,
  updateRestaurantMutation,
  getListRestaurantQuery,
} from '../../graphql';
import InputText from '../common/InputText';
import Modal from '../common/Modal';
import { LIMIT } from '../../constants/pagination';
import { RestaurantContext } from '../../contexts/RestaurantContext';

export interface IForm {
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface IProps {
  title?: React.ReactNode;
  open: boolean;
}

function UpdateFormModal({ title, open }: IProps) {
  const [messageError, setMessageError] = useState('');
  const { mode, restaurantDetail, closeRestaurantModal, paging } =
    useContext(RestaurantContext);

  const [createRestaurant] = useMutation(createRestaurantMutation, {
    refetchQueries: [
      {
        query: getListRestaurantQuery,
        variables: { limit: LIMIT, page: paging.currentPage, search: '' },
      },
    ],
  });
  const [updateRestaurant] = useMutation(updateRestaurantMutation, {
    refetchQueries: [
      {
        query: getListRestaurantQuery,
        variables: { limit: LIMIT, page: paging.currentPage, search: '' },
      },
    ],
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues | IForm> = async (values) => {
    try {
      if (mode === 'add') {
        await createRestaurant({ variables: { payload: values } });
        toast.success('Create restaurant successfully');
      } else {
        await updateRestaurant({
          variables: { id: restaurantDetail?.id, payload: values },
        });
        toast.success('Update restaurant successfully');
      }
      onCloseModal();
    } catch (error: any) {
      setMessageError(error.message);
    }
  };

  const onCloseModal = () => {
    closeRestaurantModal();
    reset();
    setMessageError('');
  };

  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className="w-[650px] bg-white overflow-auto">
        <div className="flex p-5 items-center">
          <h1 className="flex-grow text-black text-[22px]">{title}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-5 px-5">
          <InputText
            label=""
            type="text"
            placeholder="Name"
            value={restaurantDetail?.name}
            name="name"
            register={register}
            classInput="placeholder-gray-300 focus:outline-[rgb(50,60,240)] :placeholder:text-xs w-full border h-11 pl-2.5 bg-white border-[rgb(132,132,132)]"
            errors={errors}
            required={{ value: true, message: 'Name is required' }}
          />
          <InputText
            label=""
            type="text"
            value={restaurantDetail?.address}
            placeholder="Address"
            name="address"
            register={register}
            classInput="placeholder-gray-300 focus:outline-[rgb(50,60,240)] mt-5 :placeholder:text-xs w-full border h-11 pl-2.5 bg-white border-[rgb(132,132,132)]"
            errors={errors}
            required={{ value: true, message: 'Address is required' }}
          />
          <InputText
            label=""
            type="text"
            placeholder="Email"
            name="email"
            value={restaurantDetail?.email}
            register={register}
            classInput="placeholder-gray-300 focus:outline-[rgb(50,60,240)] mt-5 :placeholder:text-xs w-full border h-11 pl-2.5 bg-white border-[rgb(132,132,132)]"
            errors={errors}
            required={{ value: true, message: 'Email is required' }}
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please provide a valid email address.',
            }}
          />
          <InputText
            label=""
            type="text"
            placeholder="Phone"
            name="phone"
            value={restaurantDetail?.phone}
            pattern={{
              value:
                /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              message: 'Please provide a valid phone number.',
            }}
            register={register}
            classInput="placeholder-gray-300 focus:outline-[rgb(50,60,240)] mt-5 :placeholder:text-xs w-full border h-11 pl-2.5 bg-white border-[rgb(132,132,132)]"
            errors={errors}
            required={{ value: true, message: 'Phone is required' }}
          />
          {!!messageError && (
            <div className="error mt-4">
              <span className="text-red-500">{messageError}</span>
            </div>
          )}
          <div className="flex mt-5">
            <button
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
              onClick={onCloseModal}
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
        </form>
      </div>
    </Modal>
  );
}

export default UpdateFormModal;
