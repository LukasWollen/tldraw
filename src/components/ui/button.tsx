import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <button
    ref={ref}
    {...props}
    className={`px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50 ${props.className || ''}`}
  />
));
Button.displayName = 'Button';
