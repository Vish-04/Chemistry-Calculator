import './css/App.css';
import { useState, useEffect } from 'react';
import CalcHome from './calcUI/CalcHome';
import MMCalc from './calcUI/MMCalc';
import EquationBalanceCalc from './calcUI/EquationBalanceCalc';
import BoyleCalc from './calcUI/BoyleCalc';
import CharlesCalc from './calcUI/CharlesCalc';
import GLCalc from './calcUI/GLCalc';
import AvagadroCalc from './calcUI/AvagadroCalc';
import GrahamCalc from './calcUI/GrahamCalc';
import IdealGasCalc from './calcUI/IdealGasCalc';
import VRMSCalc from './calcUI/VRMSCalc';
import MostProbableCalc from './calcUI/MostProbableCalc';
import MeanSpeedCalc from './calcUI/MeanSpeedCalc';

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
      <div style={{width: windowWidth*.1, minWidth: '100px'}}>
        <div className='nav-container'>
          <div className='nav'>
              <a className={activeNav === 1 ? "active" : "unactive"} onClick={() => handleOutterNavClick(1)}>Chemical Reactions </a>
              <a className={activeNav === 2 ? "active" : "unactive"} onClick={() => handleOutterNavClick(2)}>Gas Laws</a>
          </div>
        </div>
      </div>
      {outerNav === 0 ? <div style={{width: windowWidth*.05, minWidth: '60px'}}></div>: null}
      {outerNav === 1 ? 
      <div style={{width: windowWidth*.05, minWidth: '60px'}}>
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
        <div style={{width: windowWidth*.05, minWidth: '60px'}}>
        <div className='inner-nav-container'>
          <div className='inner-nav'>
              <a onClick={() => handleInnerNavClick(5)}>Boyle's Law</a>
              <a onClick={() => handleInnerNavClick(6)}>Charle's Law</a>
              <a onClick={() => handleInnerNavClick(7)}>Gay Lussac's Law</a>
              <a onClick={() => handleInnerNavClick(8)}>Avagadro's Law</a>
              <a onClick={() => handleInnerNavClick(9)}>Graham's law</a>
              <a onClick={() => handleInnerNavClick(10)}>Ideal Gas Law</a>
              <a onClick={() => handleInnerNavClick(11)}>Root mean square speed</a>
              <a onClick={() => handleInnerNavClick(12)}>Most probable speed</a>
              <a onClick={() => handleInnerNavClick(13)}>Mean speed</a>
          </div>
        </div>
      </div>
      : null}

      {innerNav === 0 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <CalcHome />
      </div>
      : null}
      {innerNav === 1 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <MMCalc />
      </div>
      : null}
      {innerNav === 2 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <EquationBalanceCalc />
      </div>
      : null}
      {innerNav === 3 ? "hi" : null}
      {innerNav === 4 ? "hi" : null}
      {innerNav === 5 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <BoyleCalc />
      </div>
      : null}
      {innerNav === 6 ? 
        <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
          <CharlesCalc />
        </div>
      : null}
      {innerNav === 7 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <GLCalc />
      </div>
      : null}
      {innerNav === 8 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <AvagadroCalc />
      </div>
      : null}
      {innerNav === 9 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <GrahamCalc />
      </div>
    : null}
      {innerNav === 10 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <IdealGasCalc />
      </div>
      : null}
      {innerNav === 11 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <VRMSCalc />
      </div>
      : null}
      {innerNav === 12 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <MostProbableCalc />
      </div>
      : null}
      {innerNav === 13 ? 
      <div style={{textAlign: 'center', width: '100%', height: '100%'}}>
        <MeanSpeedCalc />
      </div>
      : null}

    </div>
    </>
  );
}

export default App;
