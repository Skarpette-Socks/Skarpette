import "./MobilePagination.scss";

import arrow_right from "../assets/img/icons/chevron-right.svg";
import arrow_left from "../assets/img/icons/chevron-left.svg";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}

const MobilePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mobile-pagination">
      <button
        className="mobile-pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrow_left} alt="" />
      </button>
      <div className="mobile-pagination__info">
        <span>{currentPage}</span>
        <span> /</span>
        <span>{totalPages}</span>
      </div>
      <button
        className="mobile-pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={arrow_right} alt="" />
      </button>
    </div>
  );
};

export default MobilePagination;
