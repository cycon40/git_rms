import { useState } from 'react';
import { api } from '../api';
import EndpointsTag from '../components/EndpointsTag';

export default function RequirementEditor() {
  const [id, setId] = useState('BR-0002');
  const [title, setTitle] = useState('Sample requirement');
  const [body, setBody] = useState('## Context\n\nDescribe here.');
  const [endpoint, setEndpoint] = useState('');

  const commit = async () => {
    const meta = {
      id, title, status: 'DRAFT', priority: 'P1',
      owner: 'team-lgm',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      links: [], tags: ['cmmi:rd']
    };
    const { endpoint } = await api('/api/requirements', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ id, meta, body, message: `feat(requirement): create ${id} - ${title}` })
    });
    setEndpoint(endpoint);
    alert('Committed!');
  };

  return (
    <div>
      <h3>Create / Update Requirement {endpoint && <EndpointsTag endpoint={endpoint}/>}</h3>
      <div className="form">
        <label>ID <input value={id} onChange={e=>setId(e.target.value)}/></label>
        <label>Title <input value={title} onChange={e=>setTitle(e.target.value)}/></label>
        <label>Body <textarea rows={12} value={body} onChange={e=>setBody(e.target.value)}/></label>
        <button onClick={commit}>Commit & Submit</button>
      </div>
    </div>
  );
}
