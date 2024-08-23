import React, { useEffect, useState } from 'react'
import {
    CloudDownloadOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Drawer, Input, Modal, Pagination, Select, Tag } from 'antd';
import Swal from 'sweetalert2';
import DetailBantuan from './DetailBantuan';
import TambahBantuan from './TambahBantuan';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';

const dataBantuan = [
    {
        judul: 'ATM & Transfer',
        kategori: 'info pembayaran',
        tgl_input: '15 Jan 2021'
    },
    {
        judul: 'Kartu Kredit',
        kategori: 'info pembayaran',
        tgl_input: '15 Jan 2021'
    },
    {
        judul: 'Menggabungkan Voucher dan Promo lainnya',
        kategori: 'info promo',
        tgl_input: '15 Jan 2021'
    },
]

function Bantuan() {

    const [open, setOpen] = useState(false);
    const [DataBantuan, setDataBantuan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [daftarTopics, setDaftarTopics] = useState();
    const [customerDetails, setCustomerDetails] = useState(null);


     // Fungsi untuk memanggil API data alamat
     const GetDataBantuan = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${Baseurl}backend/master/data-bantuan?page=${currentPage}&limit=${limit}&keyword=${keyword}&topic=`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setDataBantuan(response?.data?.data?.data);
          setTotalPage(response?.data?.data?.totalPage); 
          setDaftarTopics(response?.data?.data?.dataTopic)
          console.log("ini daftar topik", response?.data?.data?.dataTopic);
          console.log("ini data blog",response?.data?.data?.data);
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
    GetDataBantuan();
    }, [currentPage,limit, keyword]);

    const showDrawer = async (item) => {
      // Ganti `item.id_admin` dengan id_admin yang benar sesuai dengan item yang diklik
      axios.get(`${Baseurl}backend/master/data-bantuan-detail?id_help_article=${item.id_help_article}`, {
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
    <div className="mt-12 mb-8">
    <div className="w-full flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10">
      <div className="w-full lg:w-2/3">
        <Card>
          <CardHeader
            variant="gradient"
            className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
          >
            <Typography variant="h6" color="white">
              Table Daftar Bantuan
            </Typography>
          </CardHeader>
          <CardBody className="px-5 pt-0 pb-2">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <Input
                            placeholder="Search"
                            className='sm:w-1/2'
                            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                            value={keyword} // Mengikat nilai input dengan state keyword
                            onChange={(e) => setKeyword(e.target.value)} // Mengatur state keyword ketika input berubah
                        />
              </div>
              <div className="w-full md:w-1/2 text-end">
                <Button
                  onClick={showModal}
                  className={`bg-gradient-to-b ${gradientColors2} text-white hover:bg-white hover:text-brown-500 hover:border-transparent active:bg-brown-500 active:text-white active:border-brown-500`}
                  style={{ height: '40px' }}
                >
                  + Tambahkan List
                </Button>
              </div>
            </div>
  
            <div className="overflow-auto">
              <div className="mb-4 w-full mt-4">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">No.</th>
                      <th className="border px-4 py-2">Judul</th>
                      <th className="border px-4 py-2">Kategori</th>
                      <th className="border px-4 py-2">Tgl Input</th>
                      <th className="border px-4 py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataBantuan.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                        <td className="border px-4 py-2">{item.article_title}</td>
                        <td className="border px-4 py-2  text-sm">
                          <Tag color="yellow">{item.topic}</Tag>
                        </td>
                        <td className="border px-4 py-2 text-center truncate">{item.date_added}</td>
                        <td className="border px-4 py-2">
                          <div className="flex justify-center space-x-2">
                            <Button onClick={() => showDrawer(item)} className='bg-blue-700 text-white'>
                                <EditOutlined />
                            </Button>
                            <Button className="border border-red-800 text-red-800" onClick={handleDelete}>
                              <DeleteOutlined />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
      </div>
  
      <div className="w-full lg:w-1/3">
        <Card>
          <CardBody className="px-5 pt-0 pb-2">
            <div className="mt-5 mb-2 text-base font-semibold">Daftar Topik</div>
            <hr />
            <div>
            
          </div>
          </CardBody>
        </Card>
      </div>
    </div>
  
    {/* Modal Tambah Data*/}
    <Modal width={800} open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Tambah Artikel</h2>
      </div>
      <TambahBantuan />
    </Modal>
  
    {/* Drawer Edit Detail */}
    <Drawer
      width={1000}
      title={
        <div className="flex justify-center">
          <h1 className="text-lg">Detail dan Edit Daftar Artikel</h1>
        </div>
      }
      onClose={onClose}
      open={open}
    >
      <DetailBantuan customer={customerDetails} />
      {/* <DetailBantuan /> */}
    </Drawer>
  </div>
  
  )
}

export default Bantuan
