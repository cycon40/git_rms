export async function api<T>(path: string, init?: RequestInit): Promise<{data: any, endpoint: string}> {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
  const url = `${base}${path}`;
  const res = await fetch(url, init);
  const json = await res.json();
  const endpoint = (json.fetchedFrom || `${init?.method || 'GET'} ${path}`);
  return { data: json, endpoint };
}
