import { useEffect } from 'react';

/**
 * ContentProtection Component
 * 
 * Provides targeted protection for images only:
 * - Disables right-click specifically on images.
 * - Disables image dragging.
 * - Prevents image selection.
 * 
 * Normal text selection, copying, and developer tools remain fully accessible.
 */
const ContentProtection = () => {
  useEffect(() => {
    // 1. Disable Right-Click specifically on Images
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // 2. Disable Image Dragging
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Add Event Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    // Apply CSS to specifically protect images from selection and dragging
    const style = document.createElement('style');
    style.id = 'image-protection-styles';
    style.innerHTML = `
      img {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;

        /* Prevents potential "save image" popups on some mobile browsers */
        -webkit-touch-callout: none;
      }
    `;
    document.head.appendChild(style);

    // Cleanup Listeners and Styles on Unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      
      const addedStyle = document.getElementById('image-protection-styles');
      if (addedStyle) {
        addedStyle.remove();
      }
    };
  }, []);

  return null;
};

export default ContentProtection;
