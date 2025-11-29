import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { sandboxAPI } from '../api/sandbox';

export default function SQLPlayground({ lessonId }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await sandboxAPI.runQuery(query);
      setResult(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to execute query');
    } finally {
      setLoading(false);
    }
  };

  const formatTable = (data) => {
    if (!data || data.length === 0) return 'No results';

    const keys = Object.keys(data[0]);

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {keys.map(key => (
                <td key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {row[key] !== null ? String(row[key]) : 'NULL'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="sql-playground">
      <h3>SQL Playground</h3>

      <Editor
        height="200px"
        defaultLanguage="sql"
        theme="vs-dark"
        value={query}
        onChange={(value) => setQuery(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
        }}
      />

      <button
        className="btn btn-primary"
        onClick={runQuery}
        disabled={loading || !query.trim()}
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Running...' : 'Run SQL'}
      </button>

      {error && (
        <div className="error" style={{ marginTop: '1rem' }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div className="result-display" style={{ marginTop: '1rem' }}>
          {result.success ? (
            <div>
              <div className="success">
                Query executed successfully! {result.rows_affected} row(s) affected.
              </div>
              {result.data && result.data.length > 0 && (
                <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                  {formatTable(result.data)}
                </div>
              )}
            </div>
          ) : (
            <div className="error">
              Error: {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
