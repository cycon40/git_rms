import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import EndpointsTag from '../components/EndpointsTag';

export default function SearchView() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [ep, setEp] = useState('');

  useEffect(() => {
    if (!q) return;
    api(`/api/search?q=${encodeURIComponent(q)}`).then(({data, endpoint}) => {
      setResults(data.results || []);
      setEp(endpoint);
    });
  }, [q]);

  return (
    <div>
      <h3>Search results for “{q}” {ep && <EndpointsTag endpoint={ep}/>}</h3>
      <ul>
        {results.map(r => (
          <li key={r.path}>
            {r.id ? <Link to={`/r/${r.id}`}>{r.id}</Link> : r.title}
            <small> — {r.path}</small>
            <div className="snippet">{r.snippet}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
