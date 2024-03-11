import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/userSlice';
import DeleteModel from '../comman/DeleteModel'
import Pagination from '../comman/Pagination';
import Add from './Add';

const List = () => {
    const [userList, setUserList] = useState([]);
    const [data, setData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const itemsPerPage = 10;

    const user = useSelector((state) => state?.users);

    const totalUsers = userList?.length;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const userData = userList?.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClose = () => {
        setIsOpen(false);
        setData('');
    }
    const handleOpen = (item, type) => {
        setData(item);
        setIsOpen(true);
        setType(type);
    }

    const handleOpenDeleteModel = (id) => {
        setId(id);
        setIsOpenDelete(true);
    }

    const handleRemove = (id) => {
        dispatch(deleteUser({ id: id }));
    };

    const redirect = (id) => {
        navigate(`/userDetails/${id}`);
    }


    const handleSerach = (searchText) => {
        const filtered = user?.filter(({ userName, email, role }) =>
            userName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            role?.toLowerCase()?.includes(searchText?.toLowerCase())
        );

        setUserList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : user);
    }

    useEffect(()=>{
        handleSerach();
    },[user])

    return (
        <div className='table_wrapper'>
            <Add isOpen={isOpen} handleClose={handleClose} data={data} type={type} />
            <DeleteModel isOpenDeleteModel={isOpenDelete} handleCloseDeleteModel={() => setIsOpenDelete(false)} deleteData={handleRemove} id={id} />

            <Container>
                <div className='d-flex justify-content-between align-items-center '>
                    <Typography variant="h4">User List</Typography>
                    <div>
                        <TextField size='small' placeholder='Search' className='me-2' onChange={(e) => handleSerach(e.target.value)} />
                        <Button onClick={() => handleOpen(null, "add")} variant='contained' startIcon={<AddIcon />} className='text-capitalize'>Add</Button>
                    </div>
                </div>

                <Box mt={2} className="table-responsive" style={{ boxShadow: "rgb(0 0 0 / 21%) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px" }}>
                    <table className="table table-striped table-hover border ">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>Id</th>
                                <th scope="col" className='text-center'>User Name</th>
                                <th scope="col" className='text-center'>Email</th>
                                <th scope="col" className='text-center'>Role</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData?.length > 0 ? userData?.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row" className='no-wrap text-center'>{item?.id}</th>
                                        <td onClick={() => redirect(item?.id)} style={{ color: "blue", cursor: "pointer" }} className='text-capitalize no-wrap text-center'><Tooltip title={item?.userName} arrow>{item?.userName}</Tooltip></td>
                                        <td className='no-wrap text-center'><Tooltip title={item?.email} arrow>{item?.email}</Tooltip></td>
                                        <td className='text-center'>{item?.role}</td>
                                        <td className='d-flex justify-content-around '>
                                            <span role='button'> <DeleteOutlineIcon onClick={() => handleOpenDeleteModel(item?.id)} className='text-danger' /></span>
                                            <span role='button'> <EditIcon onClick={() => handleOpen(item, "edit")} className='text-success' /></span>
                                        </td>
                                    </tr>
                                ))
                                    :
                                    <tr>
                                        <th colSpan={5} className='text-center'>No Data Found</th>
                                    </tr>
                            }
                        </tbody>

                    </table>
                    <div className='pagination'>
                        {
                            userList?.length > 0  &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                        }
                        
                    </div>
                </Box>
            </Container>
        </div>
    )
}

export default List