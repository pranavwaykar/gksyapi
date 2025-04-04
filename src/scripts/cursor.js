// Add this to your main JS file or create a new one
document.addEventListener('DOMContentLoaded', () => {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Apply custom cursor style to the whole document
  document.body.style.cursor = 'none';
}); 