import { CardBody, CardHeader } from '@material-tailwind/react';
import { Button, Card, Drawer, Input, Pagination, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
  } from '@ant-design/icons';
import DetailEditCustomer from './DetailEditCustomer';
import Swal from 'sweetalert2';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataCustomer = [
    {
      nama: "Paijo",
      jenis_kelamin: 'Mr',
      warga_negara: 'Indonesia',
      phone: '08232321313',
      tgl_daftar: '2021-11-07 17:28:45'
    },
    {
      nama: "Sukarni",
      jenis_kelamin: 'Ms',
      warga_negara: 'Indonesia',
      phone: '08232321313',
      tgl_daftar: '2021-11-07 17:28:45'
    },
    {
      nama: "Paiman",
      jenis_kelamin: 'Mr',
      warga_negara: 'Indonesia',
      phone: '08232321313',
      tgl_daftar: '2021-11-07 17:28:45'
    },
  ];

 
function Customer() {
  const [DataCustomer, setDataCustomer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');

  // Fungsi untuk memanggil API data Customer
  const GetDataCustomer = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Baseurl}backend/master/data-customer?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setDataCustomer(response?.data?.data?.data);
        setTotalPage(response?.data?.data?.totalPage); 
        console.log("ini data cust",response?.data?.data?.data );
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
  GetDataCustomer();
  }, [currentPage,limit, keyword]);

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  const showDrawer = async (item) => {
    // Ganti `item.id_admin` dengan id_admin yang benar sesuai dengan item yang diklik
    axios.get(`${Baseurl}backend/master/data-customer-detail?id_user=${item.id_user}`, {
      headers: { 
        'Authorization': `Bearer ${Token}` 
      }
    })
    .then((response) => {
      console.log(response?.data?.data);
      setCustomerDetails(response?.data?.data);
      setOpen(true); // Tampilkan modal
    })
    .catch((error) => {
      console.log(error);
    });
  };


  const onClose = () => {
    setOpen(false);
    setSelectedUserId(null);
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


  return (
    <div className="mt-12 mb-8 ">
      <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography className='text-white font-bold text-lg' variant="h6" color="white">
                    Table Customer
                </Typography>
            </CardHeader>
            <CardBody className=" px-5 pt-0 pb-2">
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
                {/* Tabel */}
                <div className=" mb-4 w-full mt-4">
                <div className='overflow-auto'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr >
                                <th className="border px-4 py-2">No.</th>
                                <th className="border px-4 py-2">Nama Depan</th>
                                <th className="border px-4 py-2">Nama Belakang</th>
                                <th className="border px-4 py-2">Jenis Kelamin</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Tgl Daftar</th>
                                <th className="border px-4 py-2">Verified</th>
                                <th className="border px-4 py-2">
                                Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {DataCustomer.map((item, index) => {
                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{item.firstname}</td>
                                    <td className="border px-4 py-2 text-center">{item.lastname}</td>
                                    <td className="border px-4 py-2 text-center">{item.gender}</td>
                                    <td className="border px-4 py-2 text-center">{item.email}</td>
                                    <td className="border px-4 py-2 text-center">{item.phone}</td>
                                    <td className="border px-4 py-2 text-center">{item.date_created}</td>
                                    <td className="border px-4 py-2 text-center"> 
                                      <Tag color={item.verified === 'Sudah terverifikasi' ? 'green' : 'Belum Sudah terverifikasi'}>
                                        {item.verified}
                                      </Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center ">
                                   <div className='space-x-1 '>
                                    <Button onClick={() => showDrawer(item)} className='bg-blue-700 text-white'>
                                      <EditOutlined />
                                    </Button>
                                    <Button  onClick={handleDelete} className='border border-red-800 text-red-800'  >
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


      {/* Detail Customer */}
      <>
      <Drawer 
        width={1000} 
        title={[
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Detail dan Edit Customer</h2>
          </div>
        ]} 
        onClose={onClose} 
        open={open}
      >
        <DetailEditCustomer customer={customerDetails} />
      </Drawer>
      </>
    </div>
  )
}

export default Customer
