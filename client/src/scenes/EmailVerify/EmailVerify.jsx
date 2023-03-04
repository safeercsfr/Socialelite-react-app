import { React, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import success from '../../images/success.png';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams

  useEffect(()=>{
    const verifyEmailUrl = async ()=>{
        try{
            const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`
            const {data} = await axios.get(url)
            console.log(data);
            setValidUrl(true)
        }catch (error) {
            console.log(error);
            setValidUrl(false)
        }
    }
    verifyEmailUrl()
  }, [param])

  return (
    <>
      {validUrl ? (
        <Box>
          <img src={success} alt="successImage" />
          <h1>Email verified successfully</h1>
          <Link to="/">
            <Button sx={{ color: 'white', backgroundColor: 'green' }}>
              Login
            </Button>
          </Link>
        </Box>
      ) : (
        <h1>404 not found!!!</h1>
      )}
    </>
  );
};

export default EmailVerify;
