import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../../redux/userSlice';
import { v4 as uuidv4 } from "uuid";

const Add = (props) => {
    const { isOpen, handleClose, data, type } = props
    const dispatch = useDispatch();

    const generateUserId = () => {
        const uuid = uuidv4();
        const userId = uuid?.replace(/-/g, '')?.substring(0, 8);
        return userId;
      };

    const validationSchema = yup.object({
        userName: yup.string().required('User Name is required'),
        email: yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid Email')
            .required('Email is required'),
        role: yup.string().required('Role is required'),
    });

    const initialValues = {
        userName: data?.userName,
        email: data?.email,
        role: data?.role,
    };

    const { errors, values, handleChange, handleSubmit, handleReset, touched, } = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (type !== "edit") {
                dispatch(
                    addUser({
                        id: generateUserId(),
                        userName: values?.userName,
                        email: values?.email,
                        role: values?.role,
                    })
                );
            } else {
                dispatch(
                    editUser({
                        id: data?.id,
                        userName: values?.userName,
                        email: values?.email,
                        role: values?.role,
                    }));
            }
            handleClose();
            handleReset();
        },
    });
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => {
                    handleClose();
                    handleReset();
                }}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                >
                    <Typography variant="h6">{type !== "edit" ? "Add" : "Edit"} User</Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 3 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>User Name</FormLabel>
                                <TextField
                                    id="objective"
                                    name="userName"
                                    label=""
                                    size="small"
                                    placeholder="Enter User Name"
                                    value={values.userName}
                                    onChange={handleChange}
                                    fullWidth
                                    error={touched.userName && Boolean(errors.userName)}
                                    helperText={touched.userName && errors.userName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Email</FormLabel>
                                <TextField
                                    id="email"
                                    name="email"
                                    label=""
                                    size="small"
                                    placeholder="Enter Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    fullWidth
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Role</FormLabel>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        name='role'
                                        value={values.role || null}
                                        onChange={handleChange}
                                        error={touched.role && Boolean(errors.role)}
                                        helperText={touched.role && errors.role}
                                    >
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"user"}>User</MenuItem>
                                    </Select>
                                    <FormHelperText error={touched.role && Boolean(errors.role)}>{touched.role && errors.role}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                        className='text-capitalize'
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        className='text-capitalize'
                        onClick={() => {
                            handleReset();
                            handleClose();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Add