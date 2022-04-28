/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTable, useFilters } from "react-table/";

const ReactTable = ({
  columns,
  data,
  onClickPrevious,
  onClickNext,
  page,
  perPage,
}) => {
  const tableInstance = useTable({ columns, data }, useFilters);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <table {...getTableProps()} className="w-full">
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps()}
                      className="text-left py-4 border-b"
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="py-4 border-b border-white/50"
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <nav
        className="bg-black py-3 flex items-center justify-between mt-3"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-white">
            Showing <span className="font-medium">{page * perPage + 1}</span> to{" "}
            <span className="font-medium">{page * perPage + data.length}</span>
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          {page !== 0 && (
            <a
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              onClick={onClickPrevious}
            >
              Previous
            </a>
          )}
          {data.length === 20 && (
            <a
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              onClick={onClickNext}
            >
              Next
            </a>
          )}
        </div>
      </nav>
    </>
  );
};

export default ReactTable;
