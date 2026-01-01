import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenExpirationTimer = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      const timeLeft = expirationTime - currentTime;

      const timer = setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
      }, timeLeft);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  return null;
};

export default TokenExpirationTimer;
