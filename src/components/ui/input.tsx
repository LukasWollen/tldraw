import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`border px-2 py-1 rounded focus:outline-none focus:ring w-full ${props.className || ''}`}
  />
));
Input.displayName = 'Input';
