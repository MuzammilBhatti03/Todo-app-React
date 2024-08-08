import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCirclePlus, faClock, faCalendarCheck, faHeart, faHandDots } from '@fortawesome/free-solid-svg-icons';

const AppButton = ({ name, onClick, className, style, icon, bottom, disabled, hr }) => {
  return (
    <div>
      <button
        className={className}
        onClick={onClick}
        style={style}
        disabled={disabled} // Apply disabled attribute directly to the button
      >
        {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '8px', marginLeft: '2px' }} />}
        {name}
        <br />
        {hr}
        <span style={{ fontSize: '0.4em' }}>{bottom}</span>
      </button>
    </div>
  );
};

export default AppButton;
