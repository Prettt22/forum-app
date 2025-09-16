import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Layout() {
  return (
    <>
      <Loading />
      <Outlet />
    </>
  );
}
