import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Grab token from URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      console.log("Saved Google token:", token);
      navigate('/dashboard');
    } else {
      console.error('No token found in URL!');
      navigate('/');
    }
  }, [navigate]);

  return <p>Processing Google login...</p>;
};

export default GoogleAuthRedirect;
