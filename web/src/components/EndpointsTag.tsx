export default function EndpointsTag({ endpoint }: { endpoint: string }) {
  return (
    <span style={{
      fontSize: 11, padding: '2px 6px', borderRadius: 6,
      border: '1px solid #2d6cdf', color: '#2d6cdf', marginLeft: 8
    }}>
      {endpoint}
    </span>
  );
}
