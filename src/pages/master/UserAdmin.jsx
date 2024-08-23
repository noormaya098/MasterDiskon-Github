import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
  } from '@ant-design/icons';
import { Button, Input, Modal, Pagination, Select, Tag } from 'antd';
import TambahDataAdmin from './TambahDataAdmin';
import Swal from 'sweetalert2';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const { Option } = Select;

const dataAdmin = [
    {
      role: 'admin',
      nama_lengkap: 'Administrator',
      username: 'masteradmin',
      tgl_regist : '2019-09-24 07:20:27', 
    },
  
    {
      role: 'admin',
      nama_lengkap: 'Hamdan',
      username: 'hamdan',
      tgl_regist : '2019-09-24 07:20:27', 
    },

    {
      role: 'creator',
      nama_lengkap: 'Master Diskon',
      username: 'adminsosmed',
      tgl_regist : '2019-09-24 07:20:27', 
    },
  
  ];


function UserAdmin() {
    const [DataAdmin, setDataAdmin] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    // Fungsi untuk memanggil API data alamat
    const GetDataAdmin = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Baseurl}backend/master/data-admin?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataAdmin(response?.data?.data?.data);
            setTotalPage(response?.data?.data?.totalPage); 
            console.log("ini data admmin",response?.data?.data?.data );
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
    GetDataAdmin();
    }, [currentPage,limit, keyword]);


    //   Modal Tambah Data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminDetail, setAdminDetail] = useState({});
    
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        GetDataAdmin();// Tambahkan ini untuk reload halaman
      };
      
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    // Modal Detail & Edit data 
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const showModalDetail = (item) => {
        // Ganti `item.id_admin` dengan id_admin yang benar sesuai dengan item yang diklik
        axios.get(`${Baseurl}backend/master/data-admin-detail?id_admin=${item.id_admin}`, {
          headers: { 
            'Authorization': `Bearer ${Token}` 
          }
        })
        .then((response) => {
            console.log(response.data.data);
          setAdminDetail(response.data.data); // Simpan data ke state
          setIsModalOpenDetail(true); // Tampilkan modal
        })
        .catch((error) => {
          console.log(error);
        });
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


  return (
    <div className="mt-12 mb-8 ">
        <Card>
             <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Admin
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
                            onClick={showModal} 
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
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Nama Lengkap</th>
                            <th className="border px-4 py-2">Username</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Tanggal Registrasi</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataAdmin.map((item, index) => (
                            <tr key={item.id}> {/* Pastikan item.id atau id yang unik digunakan sebagai key */}
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2">{item.role}</td>
                                <td className="border px-4 py-2">{item.namalengkap}</td>
                                <td className="border px-4 py-2">{item.username}</td>
                                <td className="border px-4 py-2">{item.email}</td>
                                <td className="border px-4 py-2 text-center">{item.date_register}</td>
                                <td className="border px-4 py-2 text-center">
                                    <Tag color={item.status === 'Aktif' ? 'green' : 'red'}>
                                        {item.status}
                                    </Tag>
                                </td>

                                <td className="border px-4 py-2 text-center">
                                    <div className='space-x-1'>
                                        <Button onClick={() => showModalDetail(item)} className='bg-blue-700 text-white'>
                                            <EditOutlined />
                                        </Button>
                                        <Button className='border border-red-800 text-red-800' onClick={() => handleDelete(item.id)}>
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </td>
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

        {/* Modal Tambah Data*/}
       
            <>
            <Modal
                width={800}
                open={isModalOpen}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Tambah Data Admin</h2>
                </div>
                <TambahDataAdmin handleOk={handleOk} />
            </Modal>
            </>



        {/* Modal Edit dan Detail Data */}
      
        <>
            <Modal
            width={800}
            open={isModalOpenDetail}
            footer={false}
            onOk={handleOkDetail}
            onCancel={handleCancelDetail}
            >
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Detail dan Edit Data</h2>
            </div>
            <div>
            <div className='w-full'>
                    <div className='w-full flex space-x-4'>
                        <div className='w-1/2 h-36 rounded-lg border border-black'>
                       
                            {/* Menghubungkan input tarif dengan state tarif */}
                           <img className='p-2' src={adminDetail.img_avatar} alt={adminDetail.img_avatar} />
                        </div>
                        <div className='w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Lengkap :</label>
                            {/* Menghubungkan input tarif dengan state tarif */}
                            <Input
                            readOnly
                                value={adminDetail.namalengkap}
                                type="text"
                                className="mt-2 mb-2"
                            />
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Tanggal Registrasi :</label>
                            {/* Menghubungkan input tarif dengan state tarif */}
                            <Input
                            readOnly
                                value={adminDetail.date_register_format}
                                type="text"
                                className="mt-2 mb-2"
                            />
                        </div>
                    </div>
                    </div>
                    <div className='w-full flex space-x-4 mt-2'>
                    <div className='w-1/2'>
                    <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Username :</label>
                        {/* Menghubungkan input tarif dengan state tarif */}
                        <Input
                        readOnly
                            type="text"
                            className="mt-2 mb-2"
                            value={adminDetail.username}
                        />
                    </div>
                    <div className='w-1/2'>
                    <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Role :</label>
                        {/* Menghubungkan input tarif dengan state tarif */}
                        <Input
                        readOnly
                            type="text"
                            className="mt-2 mb-2"
                            value={adminDetail.role}
                        />
                    </div>
                    
                    </div>
                    <div className='w-full flex space-x-4'>
                <div className='w-1/2'>
                    <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Email :</label>
                        {/* Menghubungkan input tarif dengan state tarif */}
                        <Input
                        readOnly
                            type="text"
                            className="mt-2 mb-2"
                            value={adminDetail.email}
                        />
                    </div>
                    <div className='w-1/2'>
                    <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Status :</label>
                        {/* Menghubungkan input tarif dengan state tarif */}
                        <Input
                        readOnly
                            type="text"
                            className="mt-2 mb-2"
                            value={adminDetail.status}
                        />
                    </div>
                    
                    </div>
               
                    <br />
                    {/* <Button className='bg-blue-600 text-white w-full'>
                        Simpan 
                    </Button> */}
            </div>
            </Modal>
        </>
   
    </div>
  )
}

export default UserAdmin
