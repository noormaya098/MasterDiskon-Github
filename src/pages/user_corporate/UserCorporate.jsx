import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Modal, Pagination, Tag } from 'antd';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
  } from '@ant-design/icons';

import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import TambahUserCorporate from './TambahUserCorporate';
import DetailEditUser from './DetailEditUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataAdmin = [
    {
     corporate_name: "PT Penerbit Erlangga Cabang Papua",
     pic: 'Marito Sinaga',
     email: 'marito.sinaga@erlangga.co.id',
     industry: 'Pendidikan',
     address: 'Sorong, Papua Barat',
     verify: 'VERIFIED',
     status: 'Aktif'
    },
    {
     corporate_name: "PT TUNASDAYA MUSTIKA",
     pic: 'Iffa GAP',
     email: 'tunasdaya@yahoo.com',
     industry: 'Kontraktor',
     address: 'Jakarta Timur, DKI Jakarta',
     verify: 'VERIFIED',
     status: 'Aktif'
    },
    {
     corporate_name: "PT. PENERBIT ERLANGGA MAHAMERU (HKH)",
     pic: 'RENHOAR KAROLINA KLARA',
     email: 'sekretariatpusat99@gmail.com',
     industry: 'Education',
     address: 'Jakarta Timur, DKI Jakarta',
     verify: 'VERIFIED',
     status: 'Aktif'
    },
    {
     corporate_name: "PT. Testing",
     pic: 'Testing',
     email: 'testing@gmail.com',
     industry: 'Education',
     address: 'Jakarta Timur, DKI Jakarta',
     verify: 'UNVERIFIED',
     status: 'Aktif'
    },
  
  
  ];

  
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

   

function UserCorporate() {
    const [DataCorporate, setDataCorporate] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const GetDataCorporate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Baseurl}backend/master/data-user-corporate?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataCorporate(response?.data?.data?.data);
            setTotalPage(response?.data?.data?.totalPage); 
            console.log("ini data corporate",response?.data.data.data );
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
        }
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
      };
    
        useEffect(() => {
        GetDataCorporate();
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
        };

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

        const [showDetail, setShowDetail] = useState(false);
        const [selectedOrder, setSelectedOrder] = useState(null);

        const handleNavigate = (order) => {
            setSelectedOrder(order);
            setShowDetail(true);
          };
          
          const navigate = useNavigate();
          
          const handleDetail = async (id_user_corporate) => {
            try {
              const response = await axios.get(`${Baseurl}backend/master/data-user-corporate-detail?id_user_corporate=${id_user_corporate}`, {
                headers: { 'Authorization': `Bearer ${Token}` }
              });
              const userDetail = response.data.data;
            //   console.log(userDetail, "detail");
        
              // Navigate to detail page and pass userDetail as state
              navigate('/dashboard/user/corporate/detailUserCorporate', { state: { userDetail } });
            } catch (error) {
              console.error('Error fetching user detail:', error);
              Swal.fire('Error', 'Terjadi kesalahan saat memuat detail pengguna', 'error');
            }
          };

          const handleAdd = () => {
            navigate('/dashboard/user/corporate/AddUserCorporate');
          }

  return (
    <div className="mt-12 mb-8 ">
       
        {/* {showDetail ? (
        <DetailEditUser orderDetail={selectedOrder} />
      ) : ( */}
         <Card>
            
         <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table User Customer
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
                            onClick={handleAdd} 
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
            <div className=" mb-4 w-full mt-4 overflow-auto">
                <div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr >
                                <th className="border px-4 py-2">No.</th>
                                <th className="border px-4 py-2">Company Name</th>
                                <th className="border px-4 py-2">First Name</th>
                                <th className="border px-4 py-2">Last Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Industry</th>
                                <th className="border px-4 py-2">Address</th>
                                <th className="border px-4 py-2">Verify</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">
                                Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {DataCorporate.map((item, index) => {
                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.company_name}</td>
                                    <td className="border px-4 py-2">{item.first}</td>
                                    <td className="border px-4 py-2">{item.last}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.industry_type}</td>
                                    <td className="border px-4 py-2 ">
                                        <div className='truncate w-56'>
                                        {item.address}
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <Tag color={item.verified === 'Verified' ? 'green' : 'gray'}>
                                            {item.verified}
                                        </Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <Tag color={item.status === 'Aktif' ? 'blue' : 'red'}>
                                            {item.status}
                                        </Tag></td>
                                    <td className="border px-4 py-2 ">
                                   <div className='space-x-1 flex'>
                                    <Button className='bg-blue-700 text-white'   onClick={() => handleDetail(item.id_user_corporate)}>
                                        <EditOutlined />
                                    </Button>
                                    <Button className='border border-red-800 text-red-800'  onClick={handleDelete}>
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
            </CardBody>
         </Card>
      {/* )} */}

      {/* Tambah data */}
      <>
            <Modal
            width={1000}
            open={isModalOpen}
            footer={false}
            onOk={handleOk}
            onCancel={handleCancel}
            >
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Tambah Data User Corporate</h2>
            </div>
            <hr />
            <br />
            <TambahUserCorporate/>
            </Modal>
        </>


        {/* EditDetail */}
        <Modal
            width={1000}
            open={isModalOpenDetail}
            footer={false}
            onOk={handleOkDetail}
            onCancel={handleCancelDetail}
            >
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Edit dan Detail Data User Corporate</h2>
            </div>
            <hr />
            <br />
            <DetailEditUser/>
        </Modal>
    </div>
  )
}

export default UserCorporate
