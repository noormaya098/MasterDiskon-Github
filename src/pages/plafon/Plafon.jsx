import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Modal, Pagination, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
  } from '@ant-design/icons';
import TransaksiManual from './TransaksiManual';
import Baseurl from '@/API/BaseUrl';
import axios from 'axios';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataPlafon = [
    {
        perusahaan: 'PT JAJA USAHA LAKU',
        kontak: 'LINA WIDYA',
        plafon: '50.000.000	',
        sisa_saldo: '50.000.000',
        presentase: '100%'
    },
    {
        perusahaan: 'PT ABC',
        kontak: 'Yosia Taroreh',
        plafon: '10.000.000',
        sisa_saldo: '0',
        presentase: '0%'
    },
    {
        perusahaan: 'Perusahaan Testing',
        kontak: 'Rama Dhea',
        plafon: '10.000.000',
        sisa_saldo: '10.000.000',
        presentase: '100%'
    },
  ];

function Plafon() {
  const [DataPlatfom, setDataPlatfom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');

  const GetPlafom = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Baseurl}backend/master/data-user-corporate?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setDataPlatfom(response?.data?.data?.data )
        setTotalPage(response?.data?.data?.totalPage); 
        console.log("ini data plafon",response?.data?.data?.data );
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
    }
  };

    useEffect(() => {
    GetPlafom();
    }, [currentPage,limit, keyword]);

       // Fungsi untuk menangani perubahan halaman pada Pagination
    const handleChangePage = (page) => {
    setCurrentPage(page);
    };


    //   Modal Tambah Data
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
  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Plafon
                </Typography>
            </CardHeader>
            <CardBody className=" px-5 pt-0 pb-2">
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
                        onClick={showModal} 
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
                <div className='overflow-x-scroll'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr >
                                <th className="border px-4 py-2">No.</th>
                                <th className="border px-4 py-2">Company</th>
                                <th className="border px-4 py-2">First Name</th>
                                <th className="border px-4 py-2">Last Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Tipe Industri</th>
                                <th className="border px-4 py-2">Plafon</th>
                                <th className="border px-4 py-2">Sisa Saldo</th>
                                <th className="border px-4 py-2">Presentase</th>
                                <th className="border px-4 py-2">Verified</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">
                                Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataPlatfom.map((item, index) => {
                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.company_name}</td>
                                    <td className="border px-4 py-2">{item.first}</td>
                                    <td className="border px-4 py-2">{item.last}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.industry_type}</td>
                                    <td className="border px-4 py-2 truncate">Rp. {Number(item.plafon).toLocaleString('id-ID')}</td>
                                    <td className="border px-4 py-2 truncate"> Rp. {Number(item.sisa_saldo).toLocaleString('id-ID')}</td>
                                    <td className="border px-4 py-2 text-center">{item.persentase}</td>
                                    <td className="border px-4 py-2 text-center">
                                    <Tag color={item.verified === 'Verified' ? 'green' : 'red'}>
                                        {item.verified}
                                    </Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                    <Tag color={item.status === 'Aktif' ? 'green' : 'red'}>
                                        {item.status}
                                    </Tag></td>
                                    <td className="border px-4 py-2 text-center ">
                                   <div className='space-x-1 flex'>
                                    <Button   className='bg-blue-700 text-white' >
                                        <EditOutlined />
                                    </Button>
                                    <Button onClick={showModal}  className=' bg-green-500 text-white font-bold'  >
                                        <PlusOutlined />
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
                width={800}
                open={isModalOpen}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Transaksi Manual</h2>
                </div>
                <TransaksiManual/>
            </Modal>
        </>

    </div>
  )
}

export default Plafon
