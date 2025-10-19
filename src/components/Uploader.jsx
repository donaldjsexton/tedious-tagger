import React from 'react';

export default function Uploader() {
  return (
    <div className="uploader">
      <input type="file" accept="image/*" multiple />
    </div>
  );
}
