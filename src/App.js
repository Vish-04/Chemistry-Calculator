import './css/App.css';
import { useState, useEffect } from 'react';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  const [outerNav, setOuterNav] = useState(0);

  const handleNavClick = (page) =>{
    setOuterNav(page);
  }
  return (
    <>
    <div className='title'>
          <h1 className='titletext'>THE CHEMISTRY CALCULATOR</h1>
    </div>
    <div className='app'>
      <div style={{width: windowWidth*.1}}>
        <div className='nav-container'>
          <div className='nav'>
              <a onClick={() => handleNavClick(1)}>Chemistry Reactions </a>
              <a onClick={() => handleNavClick(2)}>Gas Laws</a>
          </div>
        </div>
      </div>

      {outerNav === 1 ? <p>SAY HI TO 1</p> : null}
      {outerNav === 2 ? <p>WE DIP TO 2</p> : null}

    </div>
    </>
  );
}

export default App;
