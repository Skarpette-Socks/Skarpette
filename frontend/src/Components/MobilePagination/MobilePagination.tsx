import "./MobilePagination.scss";
import arrowRight from "../../assets/img/icons/chevron-right.svg";
import arrowLeft from "../../assets/img/icons/chevron-left.svg";


interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}

const MobilePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="mobile-pagination">
    <button
      className="mobile-pagination__arrow"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <img src={arrowLeft} alt="Previous page" />
    </button>
    <div className="mobile-pagination__info">
      <span>{currentPage}</span>
      <span> / {totalPages}</span>
    </div>
    <button
      className="mobile-pagination__arrow"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <img src={arrowRight} alt="Next page" />
    </button>
  </div>
);

export default MobilePagination;
