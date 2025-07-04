
import React from 'react';
import DataTable from '../components/DataTable';
import { useTournaments } from '../api/profixio';

export default function Dashboard() {
  const { data, loading, error } = useTournaments();

  if (loading) return <div>Laddar...</div>;
  if (error) return <div>Ett fel uppstod: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Tävlingar</h1>
      <DataTable rows={data || []} />
    </div>
  );
}
