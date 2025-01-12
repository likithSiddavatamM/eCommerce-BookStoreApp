import React from 'react';

export default () => {
    
    return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: '0',
        // background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        fontFamily: "'Poppins', sans-serif",
        color: '#fff',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      {/* Rotating Spinner */}
      <div
        style={{
          color: "black !important",
          border: '8px solid rgba(22, 19, 19, 0.2)',
          borderTop: '8px solid #fff',
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          animation: 'spin 1.5s linear infinite',
        }}
      ></div>
      <h1
        style={{
          color: "black",
          marginTop: '20px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Loading, please wait...
      </h1>
      <p
        style={{
          color: "black",
          fontSize: '1rem',
          marginTop: '10px',
        }}
      >
        Fetching the books for you!
      </p>
    </div>
  );
};

const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);