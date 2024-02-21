import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSelector } from 'react-redux';
import Add from './Add';

const View = () => {
  const [userDetails, setUserDetails] = useState({});
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state?.users);

  const handleClose = () => {
    setIsOpen(false);
    setData('');
  }
  const handleOpen = (user) => {
    setData(user);
    setIsOpen(true);
  }

  useEffect(() => {
    if (params?.id) {
      const userDetails = user?.find(({ id }) => id === params?.id);
      setUserDetails(userDetails)
    }
  }, [params?.id, isOpen])

  return (
    <div>

      <Add isOpen={isOpen} handleClose={handleClose} data={data} type={"edit"} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <Typography variant="h4">User Details</Typography>
          <div>
            <Button variant='contained' startIcon={<ArrowBackIosIcon />} onClick={() => navigate(-1)} className='text-capitalize'>Back</Button>
          </div>
        </Stack>
        <Card className='mt-4 p-5' style={{boxShadow: "rgb(0 0 0 / 21%) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"}}>
            <Grid container display="flex" spacing={2}>
              <Grid item xs={12} md={12} style={{ borderBottom: "1.5px dashed #80808070" }} py={2}>
                <Typography variant="body1"><span className='fw-bold'>Id</span> : <span>{userDetails?.id ? userDetails?.id : "--"}</span></Typography>
              </Grid>
              <Grid item xs={12} md={12} style={{ borderBottom: "1.5px dashed #80808070" }} py={2}>
                <Typography variant="body1"><span className='fw-bold'>User Name</span> : <span className='text-capitalize'>{userDetails?.userName ? userDetails?.userName : "--"}</span></Typography>
              </Grid>
              <Grid item xs={12} md={12} style={{ borderBottom: "1.5px dashed #80808070" }} py={2}>
                <Typography variant="body1"><span className='fw-bold'>Email</span> : <span>{userDetails?.email ? userDetails?.email : "--"}</span></Typography>
              </Grid>
              <Grid item xs={12} md={12} style={{ borderBottom: "1.5px dashed #80808070" }} py={2}>
                <Typography variant="body1"><span className='fw-bold'>Role</span> : <span>{userDetails?.role ? userDetails?.role : "--"}</span></Typography>
              </Grid>
              <Grid item xs={12} md={12} pt={3} className='d-flex justify-content-end'>
                <Button variant='contained' color='success' onClick={() => handleOpen(userDetails)} className='text-capitalize'>Edit</Button>
              </Grid>
            </Grid>
        </Card>
      </Container>
    </div>
  )
}

export default View