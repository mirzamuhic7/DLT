import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTournaments } from '../api/profixio';
import { CircularProgress, Typography } from '@mui/material';

export default function TournamentsPage() {
  const { data, loading, error } = useTournaments();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Namn', flex: 1 },
    { field: 'startDate', headerName: 'Start', width: 120 },
    { field: 'endDate', headerName: 'Slut', width: 120 },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color='error'>Fel: {error.message}</Typography>;

  return (
    <>
      <Typography variant='h5' fontWeight={700} mb={2}>Turneringar</Typography>
      <div style={{ height: 600 }}>
        <DataGrid rows={data} columns={columns} pageSizeOptions={[100]} />
      </div>
    </>
  );
}
