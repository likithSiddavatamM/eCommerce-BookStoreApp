function PageNotFound() {
    const pageNotFoundStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#A03037',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '34px',
        textAlign: 'center',
        
      };
      return <div style={pageNotFoundStyle}>Not Found</div>;
  }
  
  export default PageNotFound;