import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>
          DATACADEMY
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: '#666',
          marginBottom: '2.5rem',
          maxWidth: '700px',
          margin: '0 auto 2.5rem'
        }}>
          SQL ni 0 dan professional darajagacha o'rganing.<br/>
          Interaktiv darslar va amaliy mashqlar bilan.
        </p>
        <Link to="/courses">
          <button className="btn btn-primary" style={{
            fontSize: '1.2rem',
            padding: '1rem 3rem',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            🚀 Boshlash
          </button>
        </Link>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {[
          { icon: '📚', number: '10+', label: 'Kurslar' },
          { icon: '🎯', number: '50+', label: 'Darslar' },
          { icon: '💻', number: '100+', label: 'Amaliy topshiriqlar' },
          { icon: '👥', number: '1000+', label: 'O\'quvchilar' }
        ].map((stat, index) => (
          <div key={index} className="card" style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#667eea',
              marginBottom: '0.5rem'
            }}>
              {stat.number}
            </div>
            <div style={{ color: '#666', fontWeight: '500' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2.5rem',
        color: 'white',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        ✨ Platformaning imkoniyatlari
      </h2>

      <div className="course-grid">
        <div className="card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Interaktiv SQL Editor</h3>
          <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
            Brauzerda SQL querylarni yozib, real vaqtda natijalarni ko'ring. Monaco editorda syntax highlighting va auto-complete.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Auto-Grading tizimi</h3>
          <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
            Yechimlaringizni yuboring va bir zumda natija oling. Tizim avtomatik ravishda to'g'ri/noto'g'ri ekanligini aniqlaydi.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strukturalashgan o'quv reja</h3>
          <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
            Boshlang'ichdan ilg'or darajagacha. Har bir mavzu ketma-ket va tushunarli tarzda tushuntirilgan.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>O'zbek tilida</h3>
          <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
            Barcha darslar va tushuntirishlar o'zbek tilida. Texnik atamalar bilan birga sodda misollar.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Amaliy mashqlar</h3>
          <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
            Har bir mavzudan keyin real vazifalar. Nazariyani amaliyotga o'giring va ko'nikmalaringizni mustahkamlang.
          </p>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          color: '#333'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Professional instructor</h3>
          <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
            Tajribali dasturchilar tomonidan tayyorlangan kurslar. Haqiqiy loyihalardagi misollar.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        marginTop: '4rem',
        padding: '3rem',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          color: '#333'
        }}>
          SQL o'rganishni bugun boshlang! 🎯
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          marginBottom: '2rem'
        }}>
          Ro'yxatdan o'ting va bepul kurslarni boshlang
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register">
            <button className="btn btn-success" style={{
              fontSize: '1.1rem',
              padding: '1rem 2.5rem'
            }}>
              ✨ Ro'yxatdan o'tish
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary" style={{
              fontSize: '1.1rem',
              padding: '1rem 2.5rem'
            }}>
              🚪 Kirish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
