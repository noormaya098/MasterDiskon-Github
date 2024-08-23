import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Modal, Pagination, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
  } from '@ant-design/icons';
import TambahProduk from '../produk/TambahProduk';
import TambahPromo from './TambahPromo';
import EditDetailPromo from './EditDetailPromo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataPromo = [
    {
        title_promo : 'Fly and Stay Spectacular Desember',
        kategori: 'Produk',
        added: '04 Dec 2023',
        status: 'Aktif',
    },
    {
        title_promo : 'Promo Oktober Ceria',
        kategori: 'Produk',
        added: '05 Oct 2023',
        status: 'Aktif',
    },
    {
        title_promo : 'Kuper Kupon September',
        kategori: 'Produk',
        added: '09 Sep 2023',
        status: 'Aktif',
    },
    {
        title_promo : 'Kuper Kupon September',
        kategori: 'Produk',
        added: '09 Sep 2023',
        status: 'Tidak Aktif',
    },
]


function Promo() {
    const [DataPromo, setDataPromo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    // Fungsi untuk memanggil API data alamat
    const FetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Baseurl}backend/master/data-promo?page=${currentPage}&limit=${limit}&keyword=${keyword}&category=`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataPromo(response?.data?.data?.data);
            setTotalPage(response?.data?.data?.totalPage); 
            console.log("ini data promo",response?.data?.data?.data );
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
        FetchData();
        }, [currentPage,limit, keyword]);


    // Tambah Data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    }

    // Detail dan Edit
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const showModalDetail = () => {
      setIsModalOpenDetail(true);
    };
    const handleOkDetail = () => {
      setIsModalOpenDetail(false);
    };
    const handleCancelDetail = () => {
      setIsModalOpenDetail(false);
    }

     // HadleDelete
     const handleDelete = () => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus saja!',
            cancelButtonText: 'Batalkan'
        }).then((result) => {
            if (result.isConfirmed) {
                // Hapus item di sini
                Swal.fire(
                    'Dihapus!',
                    'Item berhasil dihapus.',
                    'success'
                );
            }
        });
    };


    const navigate = useNavigate();
          
    const handleDetail = (id_promo) => {
      navigate(`/dashboard/promo/Promo/DetailPromo/${id_promo}`);
    }
    const handleAdd = () => {
      navigate('/dashboard/promo/addPromo');
    }
  return (
    <div className="mt-12 mb-8 ">
      <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Promo
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2">
                <div className='flex flex-col md:flex-row justify-center'>
                    <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                        <Input
                            placeholder="Search"
                            className='sm:w-1/3'
                            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                            value={keyword} // Mengikat nilai input dengan state keyword
                            onChange={(e) => setKeyword(e.target.value)} // Mengatur state keyword ketika input berubah
                        />
                    </div>
                    <div className='w-full md:w-1/2 text-end sm:text-end'>
                        <Button 
                            onClick={handleAdd} 
                            className={`bg-gradient-to-b ${gradientColors2} text-white hover:bg-white hover:text-brown-500 hover:border-transparent active:bg-brown-500 active:text-white active:border-brown-500`} 
                            style={{ height: '40px' }}
                        >
                            + Tambahkan List
                        </Button>
                    </div>
                </div>
                  {/* Table */}
            <>
            <div className=" mb-4 w-full mt-4">
                <div className='overflow-auto'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr >
                                <th className="border px-4 py-2">No.</th>
                                <th className="border px-4 py-2">Title Promo</th>
                                <th className="border px-4 py-2">Kategori</th>
                                
                                <th className="border px-4 py-2">Added</th>
                                <th className="border px-4 py-2">Masa Berlaku</th>
                                <th className="border px-4 py-2">Exp</th>
                                <th className="border px-4 py-2">Platform</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">
                                Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {DataPromo.map((item, index) => {
                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.title_promo}</td>
                                    <td className="border px-4 py-2 text-center">{item.category}</td>
                                    
                                    <td className="border px-4 py-2 text-center">{item.date_added}</td>
                                    <td className="border px-4 py-2 text-center"><Tag color='green'>{item.valid_start}</Tag></td>
                                    <td className="border px-4 py-2 text-center"><Tag color='red'>{item.valid_end}</Tag></td>
                                    <td className="border px-4 py-2 text-start">{item.platform}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <Tag color={item.status === 'Aktif' ? 'green' : 'red'}>
                                            {item.status}
                                        </Tag>
                                    </td>

                                    <td className="border px-4 py-2 text-center ">
                                   <div className='space-x-1 flex justify-center'>
                                    <Button onClick={() => handleDetail(item.id_promo)} className='bg-blue-700 text-white' >
                                        <EditOutlined />
                                    </Button>  
                                    <Button className='border border-red-800 text-red-800' onClick={handleDelete} >
                                      <DeleteOutlined />
                                    </Button>      
                                   </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            <div className="flex justify-center mt-4">
                            <Pagination
                                current={currentPage}
                                total={totalPage * limit} // Total items count is total pages multiplied by limit
                                pageSize={limit}
                                onChange={handleChangePage}
                                showSizeChanger={false}
                            />
                        </div>
            </CardBody>
      </Card>

        {/* Modal Tambah */}
        <>
            <Modal
                width={1500}
                open={isModalOpen}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Tambah Produk</h2>
                </div>
                <TambahPromo/>
            </Modal>
        </>

        {/* Modal Tambah */}
        <>
            <Modal
                width={1500}
                open={isModalOpenDetail}
                footer={false}
                onOk={handleOkDetail}
                onCancel={handleCancelDetail}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Edit dan Detail Promo</h2>
                </div>
                <EditDetailPromo/>
            </Modal>
        </>

    </div>
  )
}

export default Promo
