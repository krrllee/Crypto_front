import React, { useEffect } from 'react';
import './RegistrationModal.css'; // Create this CSS file for styling

const RegistrationModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registration Success</h2>
        <p>Your registration was successful.</p>
      </div>
    </div>
  );
};

export default RegistrationModal;
