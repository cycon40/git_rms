import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import Markdown from '../components/Markdown';
import EndpointsTag from '../components/EndpointsTag';

export default function RequirementDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    if (!id) return;
    api(`/api/requirements/${id}`).then(({data, endpoint}) => {
      setData(data.data);
      setEndpoint(endpoint);
    });
  }, [id]);

  if (!id) return null;
  if (!data) return <p>Loading…</p>;

  return (
    <div>
      <h3>{data.meta?.id} — {data.meta?.title} <EndpointsTag endpoint={endpoint}/></h3>
      <p><strong>Status:</strong> {data.meta?.status} • <strong>Owner:</strong> {data.meta?.owner}</p>
      <Markdown text={data.body}/>
    </div>
  );
}
