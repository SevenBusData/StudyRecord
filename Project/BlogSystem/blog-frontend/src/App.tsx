import { Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import './App.css';

const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
