import React from 'react';

const Seachbar = ({ searchQuery, onSearchChange }) => {
  const handleBlur = () => {
    onSearchChange('');
  };
  return (
    <div>
      <input
  type='text'
  value={searchQuery}
  onChange={(e) => onSearchChange(e.target.value)}
  placeholder='Search...'
  onBlur={handleBlur}
  style={{
    width: '70%',
    border: '0px solid black',
    borderRadius: '15px',
    display: 'block',
    margin: '0 auto', 
    marginTop:'60px',
    marginLeft:'0px',
    textAlign: 'center',
    boxShadow: '0px 5px rgb(186,186,186)'
  }}
/>

    </div>
  );
};

export default Seachbar;
