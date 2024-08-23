import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Drawer, Input, Modal, Pagination, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SnippetsOutlined
  } from '@ant-design/icons';
import TambahCoupon from './TambahCoupon';
import DetailCoupon from './DetailCoupon';
import EditCoupon from './EditCoupon';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';
const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataCoupon = [
    {
        nama : 'Voucher Edufest DKID 7 Mei 2024 - 200K',
        minimum_transaksi : '1.000',
        berlaku : 'app',
        mulai: '04-05-24 00:00',
        berakhir: '31-12-24 00:00',
        status: 'Aktif',
        tgl_dibuat : '07-05-24',
        
    },
    {
        nama : 'Voucher Edufest 6 Mei 2024 - 1.25 Jt',
        minimum_transaksi : '1.000',
        berlaku : 'app',
        mulai: '04-05-24 00:00',
        berakhir: '31-12-24 00:00',
        status: 'Aktif',
        tgl_dibuat : '03-05-24',

    },
]

function Coupon() { 
    const [DataCoupon, setDataCoupon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

     // Fungsi untuk memanggil API data alamat
     const GetDataCoupon = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Baseurl}backend/master/data-coupon?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataCoupon(response?.data?.data?.data);
            setTotalPage(response?.data?.data?.totalPage); 
            console.log("ini data blog",response?.data?.data?.data );
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
    GetDataCoupon();
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

    // Edit Data
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const showModalEdit = () => {
      setIsModalOpenEdit(true);
    };
    const handleOkEdit = () => {
      setIsModalOpenEdit(false);
    };
    const handleCancelEdit = () => {
      setIsModalOpenEdit(false);
    }

    // Drawer Detail
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };

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
          
    const handleDetail = (id_coupon) => {
      navigate(`/dashboard/coupon/Coupon/detail-coupon/${id_coupon}`);
    }
    const handleAdd = () => {
      navigate('/dashboard/coupon/AddCoupon');
    }

  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Coupon
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
                                        <th className="border px-4 py-2">Nama</th>
                                        <th className="border px-4 py-2">Minimum Transaksi</th>
                                        <th className="border px-4 py-2">Maximum Transaksi</th>
                                        <th className="border px-4 py-2">Berlaku</th>
                                        <th className="border px-4 py-2">Mulai</th>
                                        <th className="border px-4 py-2">Berakhir</th>
                                        <th className="border px-4 py-2">Status</th>
                                        <th className="border px-4 py-2">Tgl Dibuat</th>
                                        <th className="border px-4 py-2">
                                        Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {DataCoupon.map((item, index) => {
                                        return (
                                        <tr key={index} >
                                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                                            <td className="border px-4 py-2">{item.coupon_name}</td>
                                            <td className="border px-4 py-2 text-center">Rp. {Number(item.minimum).toLocaleString('id-ID')}</td>
                                            <td className="border px-4 py-2 text-center">Rp. {Number(item.maksimal).toLocaleString('id-ID')}</td>
                                            <td className="border px-4 py-2 text-center truncate">{item.platform}</td>
                                            <td className="border px-4 py-2 text-center truncate">{item.start_date}</td>
                                            <td className="border px-4 py-2 text-center truncate">{item.end_date}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <Tag color={item.status === 'Aktif' ? 'green' : 'red'}>
                                                    {item.status}
                                                </Tag>
                                            </td>
                                            <td className="border px-4 py-2 text-center truncate">{item.date_added}</td>
                                            <td className="border px-4 py-2 text-center ">
                                        <div className='space-x-1 flex justify-center'>
                                            <Button onClick={() => handleDetail(item.id_coupon)} className='bg-blue-700 text-white' >
                                                <EditOutlined />
                                            </Button>  
                                            <Button  onClick={showDrawer} className='bg-green-500 text-white' >
                                                <SnippetsOutlined />
                                            </Button>  
                                            <Button  className='border border-red-800 text-red-800' onClick={handleDelete} >
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
                width={1400}
                open={isModalOpen}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Tambah Coupon</h2>
                </div>
                <TambahCoupon/>
            </Modal>
        </>

         {/* Modal Edit */}
         <>
            <Modal
                width={1400}
                open={isModalOpenEdit}
                footer={false}
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Edit Coupon</h2>
                </div>
                <EditCoupon/>
            </Modal>
        </>

        {/* Drawer Detail */}
         <>
         <Drawer 
             width={1000}
            title={[
                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold ">Detail Coupon</h2>
                </div>
            ]} 
            onClose={onClose} open={open}>
            <DetailCoupon/>
        </Drawer>
        </>
    </div>
  )
}

export default Coupon
