import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

export default function ModernLessonContent({ content }) {
  return (
    <div className="modern-lesson-content">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#1976d2',
              borderBottom: '3px solid #1976d2',
              paddingBottom: '0.5rem'
            }} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
              color: '#333',
              borderLeft: '4px solid #1976d2',
              paddingLeft: '1rem'
            }} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.8rem',
              color: '#555'
            }} {...props} />
          ),
          p: ({ node, ...props }) => (
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              marginBottom: '1rem',
              color: '#333'
            }} {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code style={{
                  background: '#f5f5f5',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.95em',
                  color: '#e83e8c',
                  fontFamily: 'monospace'
                }} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre style={{
              background: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #30363d'
            }} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul style={{
              marginLeft: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.8'
            }} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol style={{
              marginLeft: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.8'
            }} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li style={{
              marginBottom: '0.5rem',
              fontSize: '1.05rem'
            }} {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote style={{
              borderLeft: '4px solid #ffc107',
              background: '#fffbf0',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              borderRadius: '4px',
              fontStyle: 'italic',
              color: '#666'
            }} {...props} />
          ),
          table: ({ node, ...props }) => (
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th style={{
              background: '#1976d2',
              color: 'white',
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '600'
            }} {...props} />
          ),
          td: ({ node, ...props }) => (
            <td style={{
              padding: '0.75rem',
              borderBottom: '1px solid #ddd'
            }} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: '500',
              borderBottom: '1px solid transparent',
              transition: 'border-bottom 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.borderBottom = '1px solid #1976d2'}
            onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}
            {...props} />
          ),
        }}
      >
        {content || 'Mazmun mavjud emas'}
      </ReactMarkdown>
    </div>
  );
}
