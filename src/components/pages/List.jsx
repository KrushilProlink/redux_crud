import React, { useState } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import DeleteModel from '../comman/DeleteModel'
import Add from './Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Pagination from '../comman/Pagination';

const List = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.users);

    const totalUsers = user?.length;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const userList = user?.slice(startIndex, endIndex);

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
        setType(type)
    }

    const handleOpenDeleteModel = (id) => {
        setId(id)
        setIsOpenDelete(true)
    }

    const handleRemove = (id) => {
        dispatch(deleteUser({ id: id }));
    };

    const redirect = (id) => {
        navigate(`/userDetails/${id}`)
    }


    return (
        <div className='table_wrapper'>
            <Add isOpen={isOpen} handleClose={handleClose} data={data} type={type} />
            <DeleteModel isOpenDeleteModel={isOpenDelete} handleCloseDeleteModel={() => setIsOpenDelete(false)} deleteData={handleRemove} id={id} />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">User List</Typography>
                    <div>
                        <Button onClick={() => handleOpen(null, "add")} variant='contained'>Add</Button>
                    </div>
                </Stack>
                <Box mt={2}>
                    <table class="table table-striped table-hover border">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList && userList?.length > 0 ? userList?.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row" className='no-wrap'>{item?.id}</th>
                                        <td onClick={() => redirect(item?.id)} style={{ color: "blue", cursor: "pointer" }} className='text-capitalize no-wrap'>{item?.userName}</td>
                                        <td className='no-wrap'>{item?.email}</td>
                                        <td>{item?.role}</td>
                                        <td><DeleteOutlineIcon onClick={() => handleOpenDeleteModel(item?.id)} style={{ cursor: "pointer" }} /></td>
                                        <td><EditIcon onClick={() => handleOpen(item, "edit")} style={{ cursor: "pointer" }} /></td>
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
                            userList?.length > 0 &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                        }
                    </div>
                </Box>
            </Container>
        </div>
    )
}

export default List