import React from "react";
import { usePagination, DOTS } from "./Pagination";
import styles from "./Pagination.module.css";
import Button from "react-bootstrap/Button";

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.pagination_container}>
      <li
        className={
          currentPage === 1
            ? `${styles.pagination_item} ${styles.disabled}`
            : styles.pagination_item
        }
        onClick={onPrevious}
      >
        {/* <Button className={styles.left}>Previous</Button> */}
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={Math.random() * 1000}
              className={`${styles.pagination_item} ${styles.dots_icon}`}
            >
              <div>more</div>
            </li>
          );
        }

        return (
          <li
            className={
              pageNumber === currentPage
                ? `${styles.pagination_item}  ${styles.selected}`
                : styles.pagination_item
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage
            ? `${styles.pagination_item} ${styles.disabled}`
            : styles.pagination_item
        }
        onClick={onNext}
      >
        {/* <Button className={styles.right}> Next </Button> */}
      </li>
    </ul>
  );
};

export default Pagination;
