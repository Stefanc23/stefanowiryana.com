import React, { useEffect, useRef } from 'react';

/**
 * Hook that handle clicks outside of the passed ref
 */
const useOuterClickListener = (
  ref: React.RefObject<HTMLInputElement | null>,
  action: () => void,
) => {
  useEffect(() => {
    /**
     * Do something when clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [action, ref]);
};

interface OuterClickListenerProps {
  action: () => void;
  children: React.ReactNode;
}

/**
 * Wrapper that handles click outside the component
 */
const OuterClickListener: React.FC<OuterClickListenerProps> = ({
  action,
  children,
}) => {
  const wrapperRef = useRef(null);
  useOuterClickListener(wrapperRef, action);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OuterClickListener;
