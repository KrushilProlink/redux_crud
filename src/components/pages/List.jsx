import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
    const [sortConfig, setSortConfig] = useState({ key: null, order: 'asc' });
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

    const handleSort = (key) => {
        let order = 'asc';

        if (sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }

        setSortConfig({ key, order });
    };


    const handleSerach = (searchText) => {
        const filtered = user?.filter(({ userName, email, role }) =>
            userName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            role?.toLowerCase()?.includes(searchText?.toLowerCase())
        );

        setUserList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : user);
    }

    const SortableHeader = ({ label, onClick, sorted, descending }) => (
        <th scope="col" className='text-center' onClick={onClick}>
            {label}
            {sorted && <ArrowForwardIcon style={{ transform: descending ? 'rotate(90deg)' : 'rotate(270deg)', fontSize: "18px" }} />}
        </th>
    );

    useEffect(() => {
        const sortedData = [...user].sort((a, b) => {
            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';

            if (sortConfig.order === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });

        setUserList(sortedData);
    }, [sortConfig, user]);


    useEffect(() => {
        handleSerach();
    }, [user])

    return (
        <div className='table_wrapper'>
            <Add isOpen={isOpen} handleClose={handleClose} data={data} type={type} />
            <DeleteModel isOpenDeleteModel={isOpenDelete} handleCloseDeleteModel={() => setIsOpenDelete(false)} deleteData={handleRemove} id={id} />

            <Container>
                <div className='d-flex justify-content-between align-items-center '>
                    <Typography variant="h4">User List</Typography>
                    <Button onClick={() => handleOpen(null, "add")} variant='contained' startIcon={<AddIcon />} className='text-capitalize'>Add</Button>
                </div>
                <div className='d-flex justify-content-end'>
                    <TextField size='small' placeholder='Search' className='mt-2' onChange={(e) => handleSerach(e.target.value)} />
                </div>
                <Box mt={2} className="table-responsive" style={{ boxShadow: "rgb(0 0 0 / 21%) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px" }}>
                    <table className="table table-striped table-hover border ">
                        <thead>
                            <tr>
                                <SortableHeader
                                    label="Id"
                                    onClick={() => handleSort('Id')}
                                    sorted={sortConfig.key === 'Id'}
                                    descending={sortConfig.order === 'desc'}
                                />
                                <SortableHeader
                                    label="User Name"
                                    onClick={() => handleSort('userName')}
                                    sorted={sortConfig.key === 'userName'}
                                    descending={sortConfig.order === 'desc'}
                                />
                                <SortableHeader
                                    label="Email"
                                    onClick={() => handleSort('email')}
                                    sorted={sortConfig.key === 'email'}
                                    descending={sortConfig.order === 'desc'}
                                />
                                <SortableHeader
                                    label="Role"
                                    onClick={() => handleSort('role')}
                                    sorted={sortConfig.key === 'role'}
                                    descending={sortConfig.order === 'desc'}
                                />
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