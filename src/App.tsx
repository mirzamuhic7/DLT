import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import TournamentsPage from './pages/TournamentsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to='tournaments' />} />
        <Route path='tournaments' element={<TournamentsPage />} />
      </Route>
    </Routes>
  );
}
