
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ rows }: { rows: any[] }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Namn', width: 200 },
    { field: 'startDate', headerName: 'Startdatum', width: 150 },
    { field: 'endDate', headerName: 'Slutdatum', width: 150 },
  ];

  return <div style={{ height: 400 }}><DataGrid rows={rows} columns={columns} /></div>;
}
