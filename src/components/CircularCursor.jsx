import React, { useEffect, useState } from 'react';
import '../styles/cursor.scss';

const CircularCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Update cursor position
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    // Handle mouse down/up for click state
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hide cursor when leaving window
    const hideCursor = () => setVisible(false);

    // Add all event listeners
    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseout', hideCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseout', hideCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, [visible]);

  return (
    <div 
      className={`custom-cursor ${isClicking ? 'clicking' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
};

export default CircularCursor; 