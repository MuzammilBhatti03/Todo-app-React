import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loginpage } from './Loginpage';
import { SignUp } from './SignUp';
import Users from './Users';

function LoginSignup() {
  const [selected, setSelect] = useState('op1');
  const [userInfo, setUserInfo] = useState(['a', '1@gmail.com', 123]);
  const [isLoged, setLogin] = useState(false);
  const navigate = useNavigate();

  const handle = (event) => {
    setSelect(event.target.id);
  };

  const handleLogin = () => {
    setLogin(true);
    navigate('/todo'); // Redirect to Todo page upon successful login
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' , backgroundColor: '#ddd', borderRadius: '0%'}}>
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}>
          <label style={{ marginRight: '20px', cursor: 'pointer' }}>
            <input
              type="radio"
              id="op1"
              name="op"
              value="login"
              onClick={handle}
              checked={selected === 'op1'}
            />
            <span style={{ marginLeft: '5px' }}>Login</span>
          </label>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="radio"
              id="op2"
              name="op"
              value="Signup"
              onClick={handle}
              checked={selected === 'op2'}
            />
            <span style={{ marginLeft: '5px' }}>SignUp</span>
          </label>
        </div>
        <div>
          {selected === 'op1' && !isLoged && <Loginpage userInfo={userInfo} setInfo={setUserInfo} setLog={handleLogin} />}
          {selected === 'op2' && <SignUp userInfo={userInfo} setUserInfo={setUserInfo} />}
          {selected === 'op1' && isLoged && <Users log={isLoged} setLog={setLogin} />}
        </div>
      </header>
    </div>
  );
}

export default LoginSignup;
