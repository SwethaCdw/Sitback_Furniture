import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERROR_PAGE } from '../../constants/constants';

const NotFound = () => {
  const navigate = useNavigate();
  const [toastDisplayed, setToastDisplayed] = useState(false);

  useEffect(() => {
    if (!toastDisplayed) {

    toast.error(ERROR_PAGE)
    setToastDisplayed(true);
    navigate('/');
    }
  }, [navigate, toastDisplayed]);

  return null;
};

export default NotFound;