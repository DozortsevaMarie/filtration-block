import React, {useState} from "react";
import classNames from "classnames";
import style from "./Paginator.module.css";
import {Button} from "antd";

const Paginator = ({
                     totalItemsCount,
                     pageSize,
                     setCurrentPage,
                     currentPage,
                     PagesPortion = 5,
                   }) => {
  const pagesNumber = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesNumber; i++) {
    pages.push(i);
  }
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * PagesPortion + 1;
  const rightPortionPageNumber = portionNumber * PagesPortion;
  const onPageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevClick = () => {
    if (leftPortionPageNumber === currentPage) {
      setPortionNumber(portionNumber - 1);
    }
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (rightPortionPageNumber === currentPage) {
      setPortionNumber(portionNumber + 1);
    }
    setCurrentPage(currentPage + 1);
  };

  return (
      <div className={style.paginator}>
        {currentPage > 1 && <Button onClick={handlePrevClick}>PREV</Button>}

        {pages
            .filter(
                (page) =>
                    page >= leftPortionPageNumber && page <= rightPortionPageNumber
            )
            .map((page) => (
                <span
                    key={page}
                    className={classNames(
                        {[style.selectedPage]: currentPage === page},
                        style.page
                    )}
                    onClick={() => {
                      onPageChanged(page);
                    }}
                >
            {page}
          </span>
            ))}
        {currentPage < pagesNumber && (
            <Button onClick={handleNextClick}>NEXT</Button>
        )}
      </div>
  );
};

export default Paginator;
