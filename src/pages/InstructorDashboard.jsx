import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { coursesAPI } from '../api/courses';
import { useNavigate } from 'react-router-dom';

export default function InstructorDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.role !== 'instructor' && user?.role !== 'admin') {
      navigate('/');
      return;
    }
    loadCourses();
  }, [user, navigate]);

  const loadCourses = async () => {
    try {
      const data = await coursesAPI.getCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await coursesAPI.createCourse(formData);
      setSuccess('Kurs muvaffaqiyatli yaratildi!');
      setFormData({ title: '', description: '', level: 'beginner' });
      setShowForm(false);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.detail || 'Kurs yaratishda xatolik');
    }
  };

  return (
    <div className="container">
      <h1>Instructor Dashboard</h1>
      <p>Salom, {user?.email}!</p>

      <div style={{ marginTop: '2rem' }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Bekor qilish' : '+ Yangi kurs qo\'shish'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Yangi kurs yaratish</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Kurs nomi *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Masalan: SQL Asoslari"
              />
            </div>

            <div className="form-group">
              <label>Tavsif *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                placeholder="Kurs haqida qisqacha ma'lumot..."
              />
            </div>

            <div className="form-group">
              <label>Daraja *</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="beginner">Boshlang'ich</option>
                <option value="intermediate">O'rta</option>
                <option value="advanced">Ilg'or</option>
              </select>
            </div>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <button type="submit" className="btn btn-success" style={{ marginTop: '1rem' }}>
              Kurs yaratish
            </button>
          </form>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h2>Barcha kurslar ({courses.length})</h2>
        {courses.length === 0 ? (
          <p>Hozircha kurslar yo'q. Yangi kurs qo'shing!</p>
        ) : (
          <div className="course-grid">
            {courses.map((course) => (
              <div key={course.id} className="card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                  <span>Daraja: {course.level}</span>
                  <span style={{ marginLeft: '1rem' }}>
                    Modullar: {course.modules?.length || 0}
                  </span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/instructor/course/${course.id}`)}
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Boshqarish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
