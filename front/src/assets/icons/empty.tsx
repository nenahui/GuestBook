import React from 'react';

export const EmptyIcon: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={90}
      height={90}
      color={'#FFF'}
      fill={'none'}
      className={'animate-spin'}
    >
      <path
        d='M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinejoin='round'
      />
      <path
        d='M7 9.77778H17M7 14.2222H17M8.66667 17L15.3333 7'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
      />
    </svg>
  );
};
