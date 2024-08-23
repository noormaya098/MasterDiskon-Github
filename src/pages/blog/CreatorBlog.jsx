import Baseurl from '@/API/BaseUrl';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Pagination, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
  } from '@ant-design/icons';
import Swal from 'sweetalert2';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

function CreatorBlog() {
    const [DataBlogKategori, setDataBlogKategori] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');


     // Fungsi untuk memanggil API data alamat
     const GetDataBlogKategori = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Baseurl}backend/master/data-blog-creator?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataBlogKategori(response?.data?.data?.data);
            setTotalPage(response?.data?.data?.totalPage); 
            console.log("ini data blogkategori",response?.data?.data?.data );
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
        }
    };

      // Fungsi untuk menangani perubahan halaman pada Pagination
    const handleChangePage = (page) => {
    setCurrentPage(page);
  };

    useEffect(() => {
    GetDataBlogKategori();
    }, [currentPage,limit, keyword]);

  return (
    <div className="mt-12 mb-8 ">
        <Card>
        <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Kreator Blog
                </Typography>
            </CardHeader>

            <CardBody className=" px-5 pt-0 pb-2">
            <div className='flex justify-center'>
            <>
                <div className='w-full flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2'>
                    <div className='w-full sm:w-1/2'>
                            <Input
                            placeholder="Search"
                            className='sm:w-1/2'
                            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                            value={keyword} // Mengikat nilai input dengan state keyword
                            onChange={(e) => setKeyword(e.target.value)} // Mengatur state keyword ketika input berubah
                        />
                    </div>
                    <div className='w-full sm:w-1/2 text-end'>
                        <Button 
                            // onClick={showModal} 
                            className={`bg-gradient-to-b ${gradientColors2} text-white hover:bg-white hover:text-brown-500 hover:border-transparent active:bg-brown-500 active:text-white active:border-brown-500`} 
                            style={{ height: '40px' }}
                        >
                            + Tambahkan List
                        </Button>
                    </div>
                </div>
            </>

            </div>

            {/* tabel */}
            <div className="mb-4 w-full mt-4 ">
            <div className='overflow-auto'>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">No.</th>
                            <th className="border px-4 py-2">Nama Lengkap</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Image</th>
                           
                            <th className="border px-4 py-2">UserName</th>
                            <th className="border px-4 py-2">Tanggal Registrasi</th>

                            {/* <th className="border px-4 py-2">Aksi</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {DataBlogKategori.map((item, index) => (
                            <tr key={item.id}> {/* Pastikan item.id atau id yang unik digunakan sebagai key */}
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2">{item.namalengkap}</td>
                                <td className="border px-4 py-2 text-center">{item.role}</td>
                                <td className="border px-4 py-2 ">
                                    <div className='flex justify-center'>
                                        <img src={item.image} alt={item.image} className='w-20 h-20'/>
                                    </div>
                                </td>
                                <td className="border px-4 py-2 text-center">{item.username}</td>
                                <td className="border px-4 py-2 text-center">{item.tgl_register}</td>
                                {/* <td className="border px-4 py-2 text-center">
                                    <div className='space-x-1 flex'>
                                        <Button onClick={() => showModalDetail(item)} className='bg-blue-700 text-white'>
                                            <EditOutlined />
                                        </Button>
                                        <Button className='border border-red-800 text-red-800' onClick={() => handleDelete(item.id)}>
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
              
            </div>
            <div className="flex justify-center mt-4">
                            <Pagination
                                current={currentPage}
                                total={totalPage * limit} // Total items count is total pages multiplied by limit
                                pageSize={limit}
                                onChange={handleChangePage}
                                showSizeChanger={false}
                            />
                        </div>
        </div>
            </CardBody>
        </Card>
    </div>
  )
}



export default CreatorBlog
