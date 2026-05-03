// frontend/src/components/FormError.js
import React from 'react';

function FormError({ error }) {
  if (!error) return null;

  return (
    <div className="form-error" style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
      {error}
    </div>
  );
}

export default FormError;