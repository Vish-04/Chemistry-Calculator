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
  const [innerNav, setInnerNav] = useState(0);
  const [activeNav, setActiveNav] = useState(0);

  const handleOutterNavClick = (page) =>{
    if (page === activeNav && outerNav != 0){
      setOuterNav(0);
    } else {
      setOuterNav(page);
    }

    if (page === activeNav && innerNav == 0){
      setActiveNav(0);
    } else {
      setActiveNav(page);
    }
  }
  const handleInnerNavClick = (page) =>{
    setInnerNav(page);
    setOuterNav(0);
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
              <a className={activeNav === 1 ? "active" : "unactive"} onClick={() => handleOutterNavClick(1)}>Chemistry Reactions </a>
              <a className={activeNav === 2 ? "active" : "unactive"} onClick={() => handleOutterNavClick(2)}>Gas Laws</a>
          </div>
        </div>
      </div>

      {outerNav === 1 ? 
      <div style={{width: windowWidth*.05}}>
      <div className='inner-nav-container'>
        <div className='inner-nav'>
            <a onClick={() => handleInnerNavClick(1)}>Molar mass</a>
            <a onClick={() => handleInnerNavClick(2)}>Equation Balance</a>
            <a onClick={() => handleInnerNavClick(3)}>Limiting reagent</a>
            <a onClick={() => handleInnerNavClick(4)}>Theoretical yield</a>
        </div>
      </div>
    </div>
       : null}
      {outerNav === 2 ? 
        <div style={{width: windowWidth*.05}}>
        <div className='inner-nav-container'>
          <div className='inner-nav'>
              <a onClick={() => handleInnerNavClick(5)}>Boyles Law</a>
              <a onClick={() => handleInnerNavClick(6)}>Gay Lussacs Law</a>
              <a onClick={() => handleInnerNavClick(7)}>Charles Law</a>
              <a onClick={() => handleInnerNavClick(8)}>Avagadros Law</a>
              <a onClick={() => handleInnerNavClick(9)}>Grahams law</a>
              <a onClick={() => handleInnerNavClick(10)}>Combined gas law</a>
              <a onClick={() => handleInnerNavClick(11)}>Ideal Gas Law</a>
              <a onClick={() => handleInnerNavClick(12)}>Root means square speed</a>
              <a onClick={() => handleInnerNavClick(13)}>Most probable speed</a>
              <a onClick={() => handleInnerNavClick(14)}>Mean speed</a>
          </div>
        </div>
      </div>
      : null}

    </div>
    </>
  );
}

export default App;
