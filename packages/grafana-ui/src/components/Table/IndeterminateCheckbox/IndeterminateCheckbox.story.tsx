import React from 'react';
import { useRowSelect, useTable, Column } from 'react-table';

import { IndeterminateCheckbox, useCheckboxes } from './IndeterminateCheckbox';

type FakeData = {
  age: number;
  firstName: string;
  subRows: number | undefined;
  visits: number;
};

export default {
  title: 'Table/IndeterminateCheckbox',
  component: IndeterminateCheckbox,
};

export const ControlledReactTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
    ],

    []
  );
  const data = React.useMemo(() => makeData(5), []);

  return <ReactTable columns={columns} data={data} />;
};

// React Table comopnent, to demonstrate functionality only
function ReactTable({ columns, data }: { columns: Column[]; data: FakeData[] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    useCheckboxes
  );

  return (
    <table {...getTableProps()} style={{ width: '300px', height: '150px' }}>
      <thead>
        {headerGroups.map((headerGroup, headerIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th {...column.getHeaderProps()} key={columnIndex}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={rowIndex}>
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// Helper methods for fake data
const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (counter: number) => {
  return {
    firstName: `YourGrace${counter}`,
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
  };
};

function makeData(...lens: number[]) {
  const depth = 0;
  const len = lens[depth];
  let count = 0;

  return range(len).map((d) => {
    return {
      ...newPerson((count += 1)),
      subRows: lens[depth + 1] ? depth + 1 : undefined,
    };
  });
}
