import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../api/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesAPI.getCourses();
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800',
          marginBottom: '0.5rem'
        }}>
          📚 Kurslar
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          O'zingizga mos kursni tanlang va SQL ni o'rganishni boshlang
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Hozircha kurslar yo'q. Tez orada qo'shiladi!</p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <Link to={`/course/${course.id}`} key={course.id} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                border: '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '1rem',
                  borderRadius: '12px 12px 0 0',
                  marginBottom: '1.5rem',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{course.title}</h3>
                </div>

                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  flex: 1
                }}>
                  {course.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '2px solid #f0f0f0'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    color: 'white',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {course.level === 'beginner' && '🟢 Boshlang\'ich'}
                    {course.level === 'intermediate' && '🟡 O\'rta'}
                    {course.level === 'advanced' && '🔴 Ilg\'or'}
                  </span>
                  <span style={{
                    color: '#667eea',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    📂 {course.modules?.length || 0} modul
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
