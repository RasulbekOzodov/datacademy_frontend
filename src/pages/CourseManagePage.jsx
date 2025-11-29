import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../api/courses';
import { lessonsAPI } from '../api/lessons';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';

export default function CourseManagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Module state
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleData, setModuleData] = useState({ title: '', order: 1 });

  // Lesson state
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [lessonData, setLessonData] = useState({ title: '', content: '', order: 1 });

  // Challenge state
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [challengeData, setChallengeData] = useState({
    task_text: '',
    expected_query: '',
    dataset_id: 'users'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.role !== 'instructor' && user?.role !== 'admin') {
      navigate('/');
      return;
    }
    loadCourse();
  }, [id, user, navigate]);

  const loadCourse = async () => {
    try {
      const data = await coursesAPI.getCourse(id);
      setCourse(data);
      setLoading(false);
    } catch (err) {
      setError('Kurs yuklanmadi');
      setLoading(false);
    }
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post(`/courses/${id}/modules`, moduleData);
      setSuccess('Modul muvaffaqiyatli qo\'shildi!');
      setModuleData({ title: '', order: 1 });
      setShowModuleForm(false);
      loadCourse();
    } catch (err) {
      setError(err.response?.data?.detail || 'Modul qo\'shishda xatolik');
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await lessonsAPI.createLesson(selectedModuleId, lessonData);
      setSuccess('Dars muvaffaqiyatli qo\'shildi!');
      setLessonData({ title: '', content: '', order: 1 });
      setShowLessonForm(false);
      setSelectedModuleId(null);
      loadCourse();
    } catch (err) {
      setError(err.response?.data?.detail || 'Dars qo\'shishda xatolik');
    }
  };

  const handleAddChallenge = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post(`/lessons/${selectedLessonId}/challenges`, challengeData);
      setSuccess('Challenge muvaffaqiyatli qo\'shildi!');
      setChallengeData({ task_text: '', expected_query: '', dataset_id: 'users' });
      setShowChallengeForm(false);
      setSelectedLessonId(null);
      loadCourse();
    } catch (err) {
      setError(err.response?.data?.detail || 'Challenge qo\'shishda xatolik');
    }
  };

  if (loading) return <div className="container">Yuklanmoqda...</div>;
  if (!course) return <div className="container">Kurs topilmadi</div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/instructor')} className="btn" style={{ marginBottom: '1rem' }}>
        ← Orqaga
      </button>

      <h1>{course.title} - Boshqaruv</h1>
      <p>{course.description}</p>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {/* ADD MODULE BUTTON */}
      <div style={{ marginTop: '2rem' }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowModuleForm(!showModuleForm)}
        >
          {showModuleForm ? 'Bekor qilish' : '+ Yangi modul qo\'shish'}
        </button>
      </div>

      {/* MODULE FORM */}
      {showModuleForm && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3>Yangi modul</h3>
          <form onSubmit={handleAddModule}>
            <div className="form-group">
              <label>Modul nomi *</label>
              <input
                type="text"
                value={moduleData.title}
                onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
                required
                placeholder="Masalan: 1-bo'lim: SQL ga kirish"
              />
            </div>
            <div className="form-group">
              <label>Tartib raqami</label>
              <input
                type="number"
                value={moduleData.order}
                onChange={(e) => setModuleData({ ...moduleData, order: parseInt(e.target.value) })}
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-success">Modul qo'shish</button>
          </form>
        </div>
      )}

      {/* MODULES LIST */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Modullar ({course.modules?.length || 0})</h2>

        {course.modules && course.modules.length > 0 ? (
          course.modules.map((module) => (
            <div key={module.id} className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{module.order}. {module.title}</h3>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedModuleId(module.id);
                    setShowLessonForm(true);
                    setShowChallengeForm(false);
                  }}
                >
                  + Dars qo'shish
                </button>
              </div>

              {/* LESSON FORM for this module */}
              {showLessonForm && selectedModuleId === module.id && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
                  <h4>Yangi dars qo'shish</h4>
                  <form onSubmit={handleAddLesson}>
                    <div className="form-group">
                      <label>Dars nomi *</label>
                      <input
                        type="text"
                        value={lessonData.title}
                        onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                        required
                        placeholder="Masalan: 1-dars: SELECT operatori"
                      />
                    </div>
                    <div className="form-group">
                      <label>Dars mazmuni (Markdown formatda)</label>
                      <textarea
                        value={lessonData.content}
                        onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                        rows={10}
                        placeholder="# Dars sarlavhasi&#10;&#10;Bu yerda dars matnini yozing...&#10;&#10;## Misollar&#10;```sql&#10;SELECT * FROM users;&#10;```"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tartib raqami</label>
                      <input
                        type="number"
                        value={lessonData.order}
                        onChange={(e) => setLessonData({ ...lessonData, order: parseInt(e.target.value) })}
                        min="1"
                      />
                    </div>
                    <button type="submit" className="btn btn-success" style={{ marginRight: '0.5rem' }}>
                      Dars qo'shish
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setShowLessonForm(false);
                        setSelectedModuleId(null);
                      }}
                    >
                      Bekor qilish
                    </button>
                  </form>
                </div>
              )}

              {/* Existing lessons */}
              <div style={{ marginTop: '1rem', marginLeft: '2rem' }}>
                <h4>Darslar:</h4>
                {module.lessons && module.lessons.length > 0 ? (
                  module.lessons.map((lesson) => (
                    <div key={lesson.id} style={{ padding: '0.5rem', background: '#f5f5f5', marginBottom: '0.5rem', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{lesson.order}. {lesson.title}</span>
                        <div>
                          <button
                            className="btn"
                            style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', marginRight: '0.5rem' }}
                            onClick={() => navigate(`/lesson/${lesson.id}`)}
                          >
                            Ko'rish
                          </button>
                          <button
                            className="btn btn-primary"
                            style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
                            onClick={() => {
                              setSelectedLessonId(lesson.id);
                              setShowChallengeForm(true);
                              setShowLessonForm(false);
                            }}
                          >
                            + Challenge
                          </button>
                        </div>
                      </div>

                      {/* CHALLENGE FORM */}
                      {showChallengeForm && selectedLessonId === lesson.id && (
                        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', borderRadius: '4px' }}>
                          <h5>Yangi Challenge qo'shish</h5>
                          <form onSubmit={handleAddChallenge}>
                            <div className="form-group">
                              <label>Vazifa matni *</label>
                              <textarea
                                value={challengeData.task_text}
                                onChange={(e) => setChallengeData({ ...challengeData, task_text: e.target.value })}
                                required
                                rows={3}
                                placeholder="Masalan: users jadvalidan barcha email va role ustunlarini tanlang"
                              />
                            </div>
                            <div className="form-group">
                              <label>To'g'ri javob (SQL query)</label>
                              <textarea
                                value={challengeData.expected_query}
                                onChange={(e) => setChallengeData({ ...challengeData, expected_query: e.target.value })}
                                rows={3}
                                placeholder="SELECT email, role FROM users"
                              />
                            </div>
                            <div className="form-group">
                              <label>Dataset ID</label>
                              <input
                                type="text"
                                value={challengeData.dataset_id}
                                onChange={(e) => setChallengeData({ ...challengeData, dataset_id: e.target.value })}
                                placeholder="users"
                              />
                            </div>
                            <button type="submit" className="btn btn-success" style={{ marginRight: '0.5rem' }}>
                              Challenge qo'shish
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                setShowChallengeForm(false);
                                setSelectedLessonId(null);
                              }}
                            >
                              Bekor qilish
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Hozircha darslar yo'q</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Hozircha modullar yo'q. Yuqorida yangi modul qo'shing.</p>
        )}
      </div>
    </div>
  );
}
