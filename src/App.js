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

  function handleNavClick(){
    console.log('clicked')
  }

  return (
    <>
        <div className='title'>
          <h1 className='titletext'>THE CHEMISTRY CALCULATOR</h1>
        </div>

        <div style={{width: windowWidth*.2}}>
          <div className='nav'>
              <a onClick={handleNavClick}>Chemistry Reactions </a>
              <a onClick={handleNavClick}>Gas Laws</a>
          </div>
        </div>
    </>
  );
}

export default App;
