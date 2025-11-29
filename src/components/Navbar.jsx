import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}>
            🎓 DATACADEMY
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/courses" style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#333';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              📚 Kurslar
            </Link>

            {isAuthenticated && (user?.role === 'instructor' || user?.role === 'admin') && (
              <Link to="/instructor" style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#333',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(17, 153, 142, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                ⚡ Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Auth Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <>
              <div style={{
                padding: '0.5rem 1.2rem',
                background: 'linear-gradient(135deg, #f8f9ff 0%, #e8eaff 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '2px solid #e0e0ff'
              }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
                <span style={{
                  color: '#333',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}>
                  {user?.email?.split('@')[0]}
                </span>
              </div>

              <button
                onClick={logout}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #ff6b6b',
                  background: 'transparent',
                  color: '#ff6b6b',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#ff6b6b';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#ff6b6b';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🚪 Chiqish
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#667eea',
                fontWeight: '600',
                fontSize: '1rem',
                border: '2px solid #667eea',
                transition: 'all 0.3s ease',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#667eea';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                🔑 Kirish
              </Link>

              <Link to="/register" style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(17, 153, 142, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(17, 153, 142, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(17, 153, 142, 0.2)';
              }}>
                ✨ Ro'yxatdan o'tish
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
