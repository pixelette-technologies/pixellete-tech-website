// app/about/loading.tsx

import React from 'react';

export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img
        src="/images/logo/shortLogo.svg"
        alt="Loading animation"
        style={{ width: '100px', height: '100px' }} // Adjust size as needed
      />
    </div>
  );
}
