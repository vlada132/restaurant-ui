import { useEffect, useMemo, useState } from 'react';
import { LIMIT } from '../../constants/pagination';
import { PaginationParams, Paging } from '../../contexts/RestaurantContext';

interface IProps {
  limit: number;
  paging: Paging;
  onChangePage: (paging: PaginationParams) => void;
}

function Pagination({ limit = LIMIT, paging, onChangePage }: IProps) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(paging.currentPage);
  }, [paging.currentPage]);

  const previous = () => {
    onChangePage({ limit, page: step - 1 });
    setStep((prevStep: number) => prevStep - 1);
  };

  const next = () => {
    onChangePage({ limit, page: step + 1 });
    setStep((prevStep: number) => prevStep + 1);
  };

  const goToPage = (index: number) => {
    onChangePage({ limit, page: index });
    setStep(index);
  };

  const renderedSteps = useMemo(
    () =>
      [...Array(paging.totalPage).keys()].map((index) => {
        index = ++index;
        return (
          <button
            data-is-active={index === step}
            key={index}
            type="button"
            className={`z-10 relative inline-flex items-center px-4 py-2 text-sm font-medium ${
              step === index
                ? 'bg-blue-600 text-white '
                : 'bg-[rgb(243,244,245)]'
            }`}
            onClick={() => goToPage(index)}
          >
            {index}
          </button>
        );
      }),
    [step, paging.totalPage],
  );

  return (
    <nav
      className="relative gap-2 z-0 inline-flex rounded-md shadow-sm -space-x-px"
      aria-label="Pagination"
    >
      <button
        className={step === 1 ? 'opacity-30' : 'opacity-100'}
        type="button"
        disabled={step === 1}
        onClick={previous}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {renderedSteps}
      <button
        className={step === paging.totalPage ? 'opacity-30' : 'opacity-100'}
        type="button"
        disabled={step === paging.totalPage}
        onClick={next}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </nav>
  );
}

export default Pagination;
