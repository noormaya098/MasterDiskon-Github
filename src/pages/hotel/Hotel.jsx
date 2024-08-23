import React, { useEffect, useState } from 'react'
import Gambar1 from '../../assets/Banner-Web-3.png'
import { Button, Card, Image, Input, Modal, Pagination, Tag, Typography } from 'antd';
import { CardBody, CardHeader } from '@material-tailwind/react';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import DetailEditHotel from './DetailEditHotel';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';
import { useNavigate } from 'react-router-dom';



const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';

function Hotel() {
  const [DataAirport, setDataHotel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');


      // Fungsi untuk memanggil API data Customer
  const GetDataHotel = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Baseurl}backend/master/data-hotel?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setDataHotel(response?.data?.data?.data )
        setTotalPage(response?.data?.data?.totalPage); 
        console.log("ini data hotel",response?.data?.data?.data );
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
    }
  };

  useEffect(() => {
  GetDataHotel();
    }, [currentPage,limit, keyword]);

       // Fungsi untuk menangani perubahan halaman pada Pagination
 const handleChangePage = (page) => {
  setCurrentPage(page);
};

    const hotel = [
        {
          id: '1234',
          nama_hotel: 'Ibis Hotel',
          city : 'Jakarta',
          country: 'Indonesia',
          rating: '4.5',
          image: Gambar1,
          location: 'Jalan Taman Malaka Utara no.31',
        },
        {
          id: '2345',
          nama_hotel: 'Ibis Hotel',
          city : 'Jakarta',
          country: 'Indonesia',
          rating: '4.5',
          image: Gambar1,
          location: 'Jalan Taman Malaka Utara no.31',
        },
        {
          id: '3456',
          nama_hotel: 'Ibis Hotel',
          city : 'Jakarta',
          country: 'Indonesia',
          rating: '4.5',
          image: Gambar1,
          location: 'Jalan Taman Malaka Utara no.31',
        },
    
      ];

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

    const navigate = useNavigate();

    const handleDetail = (id_hotel) => {
        navigate(`/dashboard/hotel/Hotel/detail-hotel/${id_hotel}`);
    }

  return (
    <div className="mt-12 mb-8 ">
      <Card>
      <CardHeader 
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography className='text-white font-bold text-lg' variant="h6" color="white">
                    Table Hotel
                </Typography>
            </CardHeader>
            <CardBody className=" px-5 pt-0 pb-2">
            <div className='flex justify-end'>
                <div className='w-full text-end'>
                <Input
                    placeholder="Search"
                    className='sm:w-1/4'
                    suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                    value={keyword} // Mengikat nilai input dengan state keyword
                    onChange={(e) => setKeyword(e.target.value)} // Mengatur state keyword ketika input berubah
                />
                </div>
              </div>
              <div className=" mb-4 w-full mt-4">
                <div className='overflow-auto'>
                    <table className="w-full table-auto ">
                        <thead>
                        <tr >
                            <th className="border px-4 py-2">No.</th>
                            <th className="border px-4 py-2">Hotel </th>
                            <th className="border px-4 py-2">Address</th>
                            <th className="border px-4 py-2">City</th>
                            <th className="border px-4 py-2">Country</th>
                            <th className="border px-4 py-2">Rating</th>
                            <th className="border px-4 py-2">Image</th>
                            {/* <th className="border px-4 py-2">Location</th> */}
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                            {DataAirport.map((item, index) => {

                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.address}</td>
                                    <td className="border px-4 py-2">{item.city}</td>
                                    <td className="border px-4 py-2">{item.country}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <Tag color="yellow">{item.starRating}</Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <Image src={item.image} style={{width: '150px', height: '100px'}}/>
                                    </td>
                                    {/* <td className="border px-4 py-2 text-justify">{item.location}</td> */}
                                   <td className="border px-4 py-2 text-center ">
                                   <div className='space-x-1 flex'>
                                    <Button  className='bg-blue-700 text-white ' onClick={() => handleDetail(item.id_hotel)}>
                                        <EditOutlined />
                                    </Button>
                                    <Button className='border border-red-800 text-red-800' onClick={handleDelete}>
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
      <Modal width={800} footer={false} open={isModalOpen} onCancel={handleCancel}>
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Detail dan Edit Hotel</h2>
        </div>
        <hr />
        <br />
        <DetailEditHotel/>
      </Modal>
    </div>
  )
}

export default Hotel
