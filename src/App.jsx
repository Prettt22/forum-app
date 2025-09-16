import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Auth from './layout/Auth';
import HomePage from './pages/HomePage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import AddThreadPage from './pages/AddThreadPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<Auth />}>
          <Route index element={<HomePage />} />
          <Route path='leaderboards' element={<LeaderboardsPage />} />
          <Route path='threads'>
            <Route path='new' element={<AddThreadPage />} />
            <Route path=':id' element={<ThreadDetailPage />} />
          </Route>
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
