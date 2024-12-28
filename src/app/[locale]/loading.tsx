// app/about/loading.tsx

export default function Loading() {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <div className="spinner" style={spinnerStyles}></div>
      <p>Loading About Section...</p>
    </div>
  );
}

const spinnerStyles: React.CSSProperties = {
  width: '50px',
  height: '50px',
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Add the following CSS globally (e.g., in `globals.css`) for spinner animation:

// /* Add to styles/globals.css or similar */
// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
