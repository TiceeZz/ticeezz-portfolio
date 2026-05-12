export default function AIFab({ onClick }) {
  return (
    <div style={{
      position: 'fixed', bottom: '40px', right: '40px', width: '60px', height: '60px',
      background: 'rgba(0, 242, 255, 0.1)', border: '1px solid rgba(0, 242, 255, 0.3)',
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(10px)', zIndex: 9000, boxShadow: '0 0 20px rgba(0, 242, 255, 0.15)',
      transition: '0.3s', cursor: 'pointer',
    }} onClick={onClick}>
      <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#fff' }}>
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>
    </div>
  );
}
