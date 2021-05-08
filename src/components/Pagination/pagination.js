import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Row,
} from "reactstrap";
import _ from "lodash";

export default function PaginationApp({
  handleClickItem,
  currentPage,
  pageSize,
  totalPage,
  listAdmin,
  totalCount,
}) {
  //Default show 5 items for rangeconsole
  function createRange() {
    let items = [];
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (totalPage <= 5 || start < 1) {
      start = 1;
      end = 5;
    } else if (
      (totalPage > 5 && currentPage === totalPage) ||
      end > totalPage
    ) {
      end = totalPage;
      start = totalPage - 4;
    }

    for (let i = start; i <= end; i++) {
      if (i > totalPage) {
        return items;
      }
      items.push(i);
    }
    return items;
  }

  // pages
  const pages = createRange();

  // setCurrentPage
  const setPage = (page) => {
    if (
      (currentPage === totalPage && page >= totalPage) ||
      (currentPage === 1) & (page <= 1)
    )
    
    return;
    handleClickItem(page);
  };

  return (
    <>
      {_.size(listAdmin) > 0 ? (
        <Row className="mt-4 mb-4">
          {/* results */}
          <Col xl={6} sm={6} xs={12} className="mr-auto">
            <span className="font-weight-bold">
              {totalCount >= 2
                ? (totalCount === null ? 0 : totalCount) + " " + "results"
                : (totalCount === null ? 0 : totalCount) + " " + "result"}{" "}
              (page {currentPage}/{totalPage === null ? 0 : totalPage})
            </span>
          </Col>
          {/* pagination */}
          {totalCount > pageSize && (
            <Col xl={6} sm={6} xs={12} className="ml-auto">
              <Pagination
                aria-label="Page navigation example"
                style={{ float: "right" }}
              >
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink first onClick={() => setPage(1)} />
                </PaginationItem>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    previous
                    onClick={() => setPage(currentPage - 1)}
                  />
                </PaginationItem>

                {pages.map((page, i) => {
                  return (
                    <PaginationItem key={i} active={currentPage === page}>
                      <PaginationLink onClick={() => setPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem disabled={currentPage === totalPage}>
                  <PaginationLink
                    next
                    onClick={() => setPage(currentPage + 1)}
                  />
                </PaginationItem>
                <PaginationItem disabled={currentPage === totalPage}>
                  <PaginationLink last onClick={() => setPage(totalPage)} />
                </PaginationItem>
              </Pagination>
            </Col>
          )}
        </Row>
      ) : null}
    </>
  );
}
