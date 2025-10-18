import { useEffect, useState } from 'react';
import { api } from '../api';
import EndpointsTag from '../components/EndpointsTag';
import Markdown from '../components/Markdown';

type TreeNode = { type: 'dir'|'file'; name: string; path: string; children?: TreeNode[] };

export default function WikiBrowser() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [endpoint, setEndpoint] = useState('');
  const [page, setPage] = useState<{meta:any, body:string}|null>(null);
  const [pageEp, setPageEp] = useState('');

  useEffect(() => {
    api<any>('/api/wiki/tree').then(({data, endpoint}) => {
      setTree(data.tree); setEndpoint(endpoint);
    });
  }, []);

  const open = async (p: string) => {
    const { data, endpoint } = await api<any>(`/api/wiki/page?path=${encodeURIComponent(p)}`);
    setPage({ meta: data.meta, body: data.body }); setPageEp(endpoint);
  };

  const renderNode = (n: TreeNode) => (
    <li key={n.path}>
      {n.type === 'dir' ? <strong>{n.name}</strong> :
        <button className="link" onClick={() => open(n.path)}>{n.name}</button>}
      {n.children && <ul>{n.children.map(renderNode)}</ul>}
    </li>
  );

  return (
    <div className="grid">
      <aside>
        <h3>Wiki Tree <EndpointsTag endpoint={endpoint}/></h3>
        <ul className="tree">{tree.map(renderNode)}</ul>
      </aside>
      <main>
        {page ? (
          <>
            <h3>{page.meta?.title || '(untitled)'} <EndpointsTag endpoint={pageEp}/></h3>
            <Markdown text={page.body}/>
          </>
        ) : <p>Select a page on the left.</p>}
      </main>
    </div>
  );
}
