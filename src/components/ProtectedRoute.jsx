import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');

    if (!token || !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Tizimga kirishingiz kerak</h2>
        <p>Bu sahifani ko'rish uchun avval tizimga kiring.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/login')}
          style={{ marginTop: '1rem' }}
        >
          Tizimga kirish
        </button>
      </div>
    );
  }

  return children;
}
