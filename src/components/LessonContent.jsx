export default function LessonContent({ content }) {
  return (
    <div className="lesson-content">
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {content || 'No content available'}
      </div>
    </div>
  );
}
