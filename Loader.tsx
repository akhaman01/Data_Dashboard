import React from 'react'

const Loader : React.FC = () => {
  return (
    <div className='loader'>
      <div className="loader-spinner">
        <div className="loader-ring"></div>
        <div className="loader-ring-inner"></div>
        <div className="loader-dot"></div>
      </div>
      
      <div className="loader-content">
        <h2 className="loader-title">
          Loading Dashboard
        </h2>
        <p className="loader-text">Please wait while we fetch your loan data...</p>
        
        <div className="loader-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
