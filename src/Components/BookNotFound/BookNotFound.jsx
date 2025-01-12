import React from 'react';

const BookNotFound = () => {
  return (

      <div
        style={{
          background: '#fff',
          padding: '50px',
          borderRadius: '15px',
          textAlign: 'center',
          maxWidth: '600px',
          width: '90%',
          animation: 'fadeIn 1.5s',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            color: '#ff6f61',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Book Not Found !
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#6c757d',
            marginBottom: '30px',
            lineHeight: '1.6',
          }}
        >
          We couldn’t find the book you were looking for. Maybe check the title
          or explore our library for similar options. Don’t worry, you’re just
          one search away from something amazing!
        </p>
        <button
          style={{
            padding: '13px 25px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            color: '#fff',
            background: 'linear-gradient(90deg, #007bff, #0056b3)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 5px 15px rgba(0, 123, 255, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';
          }}
          onClick={() => window.location.reload()}
        >
          Back to Home
        </button>
      </div>
  );
};

export default BookNotFound;