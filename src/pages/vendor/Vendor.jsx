import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
  } from '@ant-design/icons';
import TambahVendor from './TambahVendor';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataVendor = [
    {
       kode: 'MDSUP10210022',
       nama_vendor: 'Al Karim Tour & Travel',
       logo: '',
       telp: '085810000223',
       alamat: 'Jl. Gajah Mada No. 1 A-F Pancor Lombok Timur 83611',
       kategori: 'Tour Operator'
    },
    {
       kode: 'MDSUP10210031',
       nama_vendor: 'Barong Bali Trans',
       logo: '',
       telp: '081337227515',
       alamat: 'Jl. Merdeka Graha Asre Persada II Blok E No. 11',
       kategori: 'Tour Operator'
    },
    {
       kode: 'MDSUP10210030',
       nama_vendor: 'PT Masterdiskon',
       logo: '',
       telp: '09121212',
       alamat: 'KP Simatupang Ciracas Raya no 101',
       kategori: 'Hotel'
    },
   
  ];

function Vendor() {
    const [DataVendor, setDataVendor] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

     // Fungsi untuk memanggil API data alamat
     const GetDataVendor = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${Baseurl}backend/master/data-vendor?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setDataVendor(response?.data?.data?.data);
          setTotalPage(response?.data?.data?.totalPage); 
          console.log("ini data vendor",response?.data?.data?.data );
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
      GetDataVendor();
      }, [currentPage,limit, keyword]);


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
    
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const showModalDetail = () => {
      setIsModalOpenDetail(true);
    };
    const handleOkDetail = () => {
      setIsModalOpenDetail(false);
    };
    const handleCancelDetail = () => {
      setIsModalOpenDetail(false);
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

    const handleAdd = () => {
      navigate('/dashboard/vendor/addVendor');
    }

    const handleDetail = () => {
      navigate('/dashboard/vendor/editDetailVendor');
    }

  return (
    <div className="mt-12 mb-8 ">
      <Card>
        <CardHeader
            variant="gradient" 
            className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
            <Typography variant="h6" color="white">
                Table Vendor
            </Typography>
        </CardHeader>
        <CardBody className="px-5 pt-0 pb-2">
        <div className='flex flex-col md:flex-row justify-center'>
                <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                        <Input
                            placeholder="Search"
                            className='sm:w-1/2'
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
                                <th className="border px-4 py-2">Kode</th>
                                <th className="border px-4 py-2">Nama Vendor</th>
                                <th className="border px-4 py-2">Email Vendor</th>
                                <th className="border px-4 py-2">Telp</th>
                                <th className="border px-4 py-2">Alamat</th>
                                
                                <th className="border px-4 py-2">
                                Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {DataVendor.map((item, index) => {
                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.vendor_code}</td>
                                    <td className="border px-4 py-2">{item.nama_vendor}</td>
                                    <td className="border px-4 py-2">{item.email_vendor}</td>
                                    <td className="border px-4 py-2">{item.phone_vendor}</td>
                                    <td className="border px-4 py-2 ">{item.address}</td>
                                   
                                    <td className="border px-4 py-2 text-center ">
                                   <div className='space-x-1 flex'>
                                    <Button onClick={handleDetail} className='bg-blue-700 text-white' >
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
            <div className="flex justify-center mt-4">
                            <Pagination
                                current={currentPage}
                                total={totalPage * limit} // Total items count is total pages multiplied by limit
                                pageSize={limit}
                                onChange={handleChangePage}
                                showSizeChanger={false}
                            />
                        </div>
            </>
        </CardBody>
      </Card>

       {/* Modal Tambah manual dan edit */}
       <>
            <Modal
                width={1000}
                open={isModalOpen}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Tambah Data Vendor</h2>
                </div>
                <TambahVendor/>
            </Modal>
        </>

       <>
            <Modal
                width={1000}
                open={isModalOpenDetail}
                footer={false}
                onOk={handleOkDetail}
                onCancel={handleCancelDetail}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Detail dan Edit Data Vendor</h2>
                </div>
                <TambahVendor/>
            </Modal>
        </>

    </div>
  )
}

export default Vendor
