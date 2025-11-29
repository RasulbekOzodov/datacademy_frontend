import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsAPI } from '../api/lessons';
import ModernLessonContent from '../components/ModernLessonContent';
import SQLPlayground from '../components/SQLPlayground';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await lessonsAPI.getLesson(id);
        setLesson(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!lesson) return <div className="container">Lesson not found</div>;

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '1.5rem' }}>
        ← Orqaga
      </button>

      <div className="card" style={{
        padding: '2.5rem',
        marginBottom: '2rem',
        background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
      }}>
        <ModernLessonContent content={lesson.content} />
      </div>

      {lesson.challenges && lesson.challenges.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            color: '#333',
            borderLeft: '4px solid #4caf50',
            paddingLeft: '1rem'
          }}>
            💪 Amaliy topshiriqlar
          </h2>
          {lesson.challenges.map((challenge, index) => (
            <div key={challenge.id} className="card" style={{
              marginBottom: '1rem',
              padding: '1.5rem',
              background: '#f8fdf9',
              border: '2px solid #4caf50',
              borderRadius: '8px'
            }}>
              <h3 style={{
                color: '#2e7d32',
                marginBottom: '0.8rem',
                fontSize: '1.3rem'
              }}>
                Challenge {index + 1}
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#333'
              }}>
                {challenge.task_text}
              </p>
              {challenge.dataset_id && (
                <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  📊 Dataset: <code style={{
                    background: '#e8f5e9',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}>{challenge.dataset_id}</code>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '2px solid #1976d2'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          color: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💻 SQL Playground
        </h2>
        <SQLPlayground lessonId={id} />
      </div>
    </div>
  );
}
