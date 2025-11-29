import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../api/courses';

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await coursesAPI.getCourse(id);
        setCourse(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!course) return <div className="container">Course not found</div>;

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      {/* Course Header */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.95, lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {course.description}
        </p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            {course.level === 'beginner' && '🟢 Boshlang\'ich'}
            {course.level === 'intermediate' && '🟡 O\'rta'}
            {course.level === 'advanced' && '🔴 Ilg\'or'}
          </span>
          <span style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            📂 {course.modules?.length || 0} ta modul
          </span>
        </div>
      </div>

      <h2 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        color: 'white',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        📚 Kurs tarkibi
      </h2>
      {course.modules && course.modules.length > 0 ? (
        <div>
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map((module, moduleIndex) => (
              <div key={module.id} className="card" style={{
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                border: '2px solid #e0e0ff'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#667eea',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '3px solid #667eea'
                }}>
                  📂 {module.order}. {module.title}
                </h3>

                {module.lessons && module.lessons.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {module.lessons
                      .sort((a, b) => a.order - b.order)
                      .map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          style={{
                            padding: '1.2rem',
                            background: 'white',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: '2px solid transparent',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#667eea';
                            e.currentTarget.style.transform = 'translateX(10px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                          }}
                          onClick={() => navigate(`/lesson/${lesson.id}`)}
                        >
                          <span style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            color: '#333'
                          }}>
                            📖 {lesson.order}. {lesson.title}
                          </span>
                          <button
                            className="btn btn-primary"
                            style={{
                              fontSize: '0.9rem',
                              padding: '0.6rem 1.5rem'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/lesson/${lesson.id}`);
                            }}
                          >
                            Boshlash →
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p style={{
                    marginTop: '1rem',
                    color: '#999',
                    fontSize: '1rem',
                    textAlign: 'center',
                    padding: '2rem',
                    background: '#f9f9f9',
                    borderRadius: '8px'
                  }}>
                    Bu modulda hozircha darslar yo'q
                  </p>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="card">
          <p>Bu kursda hozircha modullar yo'q. Tez orada qo'shiladi!</p>
        </div>
      )}
    </div>
  );
}
