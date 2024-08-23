import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Token from '@/API/Token';
import Baseurl from '@/API/BaseUrl';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import { Button, Select, Steps, Tag } from 'antd';
import PIN from "../../assets/pin.png"
import { ArrowDownOnSquareIcon, ChevronDownIcon, ChevronUpIcon, ClockIcon } from '@heroicons/react/24/solid';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import "./detail.css"

const { Option } = Select;
const { Step } = Steps;

function DetailOrderNew() {
  const { id_order } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);

  const handleToggleDetails = () => {
      setShowPassengerDetails(!showPassengerDetails);
  };

  const GetDataDetail = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Baseurl}backend/order/data-order-detail?id_order=${id_order}`,
      headers: { 
        'Authorization': `Bearer ${Token}`
      }
    };

    try {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch the order details.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.request(config);
      setOrderDetail(response?.data?.data);
      setLoading(false);
      Swal.close();
    } catch (error) {
      setError(error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

    useEffect(() => {
    GetDataDetail();
  }, [id_order]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
  const gradientColors1 = 'from-blue-600 via-blue-400 to-blue-400';
  const gradientColors2 = 'from-blue-600 via-blue-400 to-white';

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? 'gold' : 'lightgray' }} className='text-2xl'>
          ★
        </span>
      );
    }
    return stars;
  };


  // Function to format time from "HH:mm:ss" to "hh.mm"
const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(':');
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    return `${String(formattedHour).padStart(2, '0')}.${minute}`;
  };

  function formatTime2(time) {
    if (!time) return '';
    const match = time.match(/^(\d{2}:\d{2}):\d{2}$/);
    return match ? match[1] : time;
  }
  

  const renderContent = () => {
    switch (orderDetail.productType) {
        case 'Activities':
            return (
                <>
                    {/* Activities */}
                    <>
                    <div className='flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6 mt-20'>
                        <div className='w-full md:w-2/3'>
                        <Card>
                            <CardHeader
                            variant="gradient"
                            className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                            >
                            <Typography variant="h6" color="white">
                                Detail Order
                            </Typography>
                            </CardHeader>
                            <CardBody className="px-5 pt-0 pb-2">
                            <h3>
                                Order #{orderDetail.order_code}
                                <span className='ml-2'>
                                
                                <Tag color='#16aaff'>
                                {orderDetail.status.name}
                                </Tag>
                                </span>
                            </h3>
                            <br />
                            <div className="mb-4 w-full mt-4 overflow-auto">
                                <div>
                                <table className="w-full table-auto">
                                    <thead>
                                    <tr>
                                        <th className="border-t border-b px-4 py-2">Title</th>
                                        <th className="border-t border-b px-4 py-2">First Name</th>
                                        <th className="border-t border-b px-4 py-2">Last Name</th>
                                        <th className="border-t border-b px-4 py-2">Phone</th>
                                        <th className="border-t border-b px-4 py-2">Email</th>
                                        <th className="border-t border-b px-4 py-2">Corporate</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="border-t border-b text-center px-4 py-2"> {orderDetail?.guest?.pic?.title}</td>
                                        <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.first_name}</td>
                                        <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.last_name}</td>
                                        <td className="border-t border-b text-center px-4 py-2">+{orderDetail?.guest?.pic?.phone_code} {orderDetail?.guest?.pic?.phone_number}</td>
                                        <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.email}</td>
                                        <td className="border-t border-b text-center px-4 py-2 w-12">{orderDetail?.guest?.pic?.corporate}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <br />
                            <h1 className='font-bold text-xl'>Produk</h1>
                            <div className="mb-4 w-full mt-4 overflow-auto">
                                <div>
                                <table className="w-full table-auto">
                                    <thead>
                                    <tr>
                                        <th className="border-t border-b px-4 py-2">No.</th>
                                        <th className="border-t border-b px-4 py-2">Product Name</th>
                                        <th className="border-t border-b px-4 py-2">Qty</th>
                                        <th className="border-t border-b px-4 py-2">Unit</th>
                                        <th className="border-t border-b px-4 py-2">Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="border-t border-b text-center px-4 py-2">1.</td>
                                        <td className="border-t border-b px-4 py-2">{orderDetail.productType}</td>
                                        
                                        <td className="border-t border-b text-center px-4 py-2">{orderDetail.pax}</td>
                                        <td className="border-t border-b text-center px-4 py-2">Pax</td>
                                        <td className="border-t border-b text-center px-4 py-2">Rp. {Number(orderDetail.subtotalPrice).toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className='border-t border-b text-end px-4 py-2'>SUBTOTAL</td>
                                        <td colSpan={5} className='border-t border-b text-end px-4 py-2'>Rp. {Number(orderDetail.subtotalPrice).toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className='border-t border-b text-end px-4 py-2'>TAX</td>
                                        <td colSpan={5} className='border-t border-b text-end px-4 py-2'>Rp. {Number(orderDetail.tax).toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className='border-t border-b text-end px-4 py-2'>DISCOUNT</td>
                                        <td colSpan={5} className='border-t border-b text-end px-4 py-2'>{orderDetail.promo}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className='border-t border-b text-end px-4 py-2'>POINT</td>
                                        <td colSpan={5} className='border-t border-b text-end px-4 py-2'>{orderDetail.point}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className='border-t text-end px-4 py-2'>GRAND TOTAL</td>
                                        <td colSpan={5} className='border-t text-end px-4 py-2'>Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        </div>

                        <div className='w-full md:w-1/3'>
                            <div className='bg-[#3f6ad8] rounded-lg'>
                                <div className='p-8'>
                                <div className='text-white mt-2 mb-2'>
                                    <p className='text-lg'>
                                    Total
                                    </p>
                                    <p className='text-3xl font-semibold'>
                                    Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='w-full'>
                            <Button className='w-full h-14 bg-[#3f6ad8] text-white font-semibold text-lg'>
                            CREATE INVOICE
                            </Button>
                        </div>
                        <br />
                        <div className='w-full space-x-3 flex'>
                            <Button className='w-1/2 h-12 bg-[#3ac47d] text-white font-semibold text-lg'>
                            EDIT ORDER
                            </Button>
                            <Button className='w-1/2 h-12 bg-[#3ac47d] text-white font-semibold text-lg'>
                            PRINT
                            </Button>
                        </div>
                        <br />
                        <Card>
                            <CardBody className="px-5 pt-0 pb-2">
                            <table className="w-full table-auto mt-5">
                                <tbody>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    Vendor Code
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    Sales
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    Date Created
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-t text-start px-4 py-2'>
                                    From
                                    </td>
                                    <td className='border-t text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-t text-start px-4 py-2'>
                                    To
                                    </td>
                                    <td className='border-t text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </CardBody>
                        </Card>
                        <br />
                        <Card>
                            <CardBody className="px-5 pt-0 pb-2">
                            <h1 className='mt-4 text-2xl mb-2'>Ubah Status Order</h1>
                            <div className='w-full flex flex-col md:flex-row justify-center'>
                                <div className='w-full md:w-2/3'>
                                <Select
                                    className="w-full h-10"
                                    placeholder="Pilih Status"
                                    
                                >
                                    <Option value="All">All</Option>
                                    <Option value="New Order">New Order</Option>
                                    <Option value="Issued">Issued</Option>
                                </Select>
                                </div>
                                <div className='w-full sm:w-1/3 flex sm:justify-end mt-2 md:mt-0'>
                                <Button className='bg-[#3f6ad8] h-10 text-white font-semibold sm:w-1/2 w-full'>
                                    UBAH
                                </Button>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                        <br />
                        <Card>
                            <CardBody className="px-5 pt-0 pb-2">
                            <h1 className='mt-4 text-2xl mb-2'>Pembayaran</h1>
                            <table className="w-full table-auto mt-5">
                                <tbody>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    Metode
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    Exp
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    Payment
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </CardBody>
                        </Card>
                        <br />
                        <Card>
                            <CardBody className="px-5 pt-0 pb-2">
                            <h1 className='mt-4 text-2xl mb-2'>History</h1>
                            <table className="w-full table-auto mt-5">
                                <tbody>
                                <tr>
                                    <td className='border-t border-b text-start px-4 py-2'>
                                    </td>
                                    <td className='border-t border-b text-end px-4 py-2'>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </CardBody>
                        </Card>
                        </div>
                    </div>
                    </>
                </>
            );
        case 'Hotel':
            return (
                <>
                      {/* Hotel */}
       
                    <>
                        <div className='flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6'>

                                <div className='w-full md:w-2/3'>
                                <Card className={`bg-gradient-to-b ${gradientColors2} `}>
                                    <div className='p-10'>
                                    <div className='flex w-full'>
                                        <div className='text-2xl font-bold text-white w-1/2'>
                                            {orderDetail.status.name}
                                        </div>
                                        <div className='  text-white w-1/2 flex justify-end'>
                                        Created :  {orderDetail.dateCreated}
                                        </div>
                                    </div>
                                        <div className='mt-2 text-white'>
                                            {orderDetail.status.description}
                                        </div>
                                    </div>
                                </Card>
                                <Card className='mt-16'>
                                    <CardHeader
                                    variant="gradient"
                                    className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                                    >
                                    <Typography variant="h6" color="white">
                                        Detail Order
                                    </Typography>
                                    </CardHeader>
                                    <CardBody className="px-5 pt-0 pb-2">
                                        <div className='w-full flex space-x-6'>
                                            <div className='w-1/3'>
                                                <img src={orderDetail.product.imageProduct} alt="" className='w-full h-44' />
                                            </div>
                                            <div className='w-full text-lg'>
                                                <div className='w-full'>
                                                    <div className='text-2xl text-blue-400'>
                                                        {orderDetail.product.productName}
                                                    </div>
                                                    <div>
                                                        {renderStars(orderDetail.product.detailProduct.rating)}
                                                    </div>
                                                    <div className='flex space-x-2 mt-2'>
                                                        <div>
                                                            <img src={PIN} alt="" className='w-10 h-10'/> 
                                                        </div>
                                                        <div className='flex justify-center items-center text-xl'>
                                                            {orderDetail.product.detailProduct.city}
                                                        </div>
                                                    </div>
                                                    <div className='text-xl mt-2'>
                                                        {orderDetail.product.detailProduct.address}
                                                    </div>
                                                </div>
                                                    
                                                <div className="mb-4 w-full mt-4 overflow-auto">
                                                    <div>
                                                    <table className="w-full table-auto">
                                                        <thead>
                                                        <tr>
                                                            <th className="text-start  py-2">Cek-in</th>
                                                            <th className="text-start  py-2">Cek-out</th>
                                                            <th className="text-start  py-2">Durasi</th>
                                                            
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="border-t border-b text-start  py-2"> {orderDetail.product.detailProduct.check_in}</td>
                                                            <td className="border-t border-b text-start  py-2">{orderDetail.product.detailProduct.check_out}</td>
                                                            <td className="border-t border-b text-start  py-2">{orderDetail.product.detailProduct.night} Malam</td>
                                                            
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                </div>


                                                <div>
                                                    <div className='font-bold'>
                                                        Detail Kamar
                                                    </div>
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                            Room type
                                                        </div>
                                                        <div className='w-full'>
                                                            {orderDetail.product.detailProduct.roomType}
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                            Tamu
                                                        </div>
                                                        <div className='w-full'>
                                                            {orderDetail.product.detailProduct.roomBed}
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                            Kamar
                                                        </div>
                                                        <div className='w-full'>
                                                            {orderDetail.product.detailProduct.qtyRoom} Kamar
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                            Permintaan Khusus
                                                        </div>
                                                        <div className='w-full'>
                                                            {orderDetail.product.detailProduct.specialRequest} 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <br />
                                    </CardBody>
                                </Card>

                                <br />
                                <Card>
                                    <CardBody>
                                        <div className="mb-4 w-full mt-4 overflow-auto">
                                            <div>
                                            <h1 className='font-bold text-lg'>
                                                Pemesan
                                            </h1>
                                            <table className="w-full table-auto mt-2">
                                                <thead className={`bg-gradient-to-b ${gradientColors1} text-white`}>
                                                <tr>
                                                    <th className="border-t border-b px-4 py-2">Title</th>
                                                    <th className="border-t border-b px-4 py-2">First Name</th>
                                                    <th className="border-t border-b px-4 py-2">Last Name</th>
                                                    <th className="border-t border-b px-4 py-2">Phone</th>
                                                    <th className="border-t border-b px-4 py-2">Email</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td className="border-t border-b text-center px-4 py-2"> {orderDetail?.guest?.pic?.title}</td>
                                                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.first_name}</td>
                                                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.last_name}</td>
                                                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.phone_code} {orderDetail?.guest?.pic?.phone_number}</td>
                                                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.email}</td>
                                                </tr>
                                                </tbody>
                                            </table>

                                            {orderDetail?.guest?.tamu.length > 0 && (
                                            <>
                                            <h1 className='font-bold text-lg mt-5'>
                                                Tamu
                                            </h1>
                                            <table className="w-full table-auto mt-2">
                                                <thead className={`bg-gradient-to-b ${gradientColors1} text-white`}>
                                                <tr>
                                                    <th className="border-t border-b px-4 py-2">Title</th>
                                                    <th className="border-t border-b px-4 py-2">First Name</th>
                                                    <th className="border-t border-b px-4 py-2">Last Name</th>
                                                    <th className="border-t border-b px-4 py-2">Nationality</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                               
                                                        <tr>
                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].title}</td>
                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].first_name}</td>
                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].last_name}</td>
                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].nationality}</td>
                                                        </tr>
                                                   

                                                </tbody>
                                            </table>
                                            </>
                                             )}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                </div>

                                <div className='w-full md:w-1/3'>
                                    <div className='bg-[#3f6ad8] rounded-lg'>
                                        <div className='p-8'>
                                        <div className='text-white mt-2 mb-2'>
                                            <p className='text-lg'>
                                            Total
                                            </p>
                                            <p className='text-3xl font-semibold'>
                                            Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='w-full'>
                                    <Button className='w-full h-14 bg-[#3ac47d]  text-white font-semibold text-lg'>
                                    CREATE INVOICE
                                    </Button>
                                    <Button className='w-full mt-2 h-14 bg-[#3f6ad8] text-white font-semibold text-lg'>
                                        Cetak eTicket
                                    </Button>
                                    
                                </div>
                                <br />
                                <div className='w-full '>
                                    
                                </div>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <div className='p-5'>
                                        <div className='text-sm text-gray-500'>
                                            SPECIAL REQUEST
                                        </div>
                                        <p className='text-base mt-2'>
                                            {orderDetail.product.detailProduct.specialRequest}
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <div className='p-5'>
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                                NO PESANAN
                                            </div>
                                            <p className='text-base mt-2'>
                                                {orderDetail.order_code}
                                            </p>
                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            STATUS PESANAN
                                            </div>
                                            <Tag color='orange' className='text-base mt-2'>
                                                {orderDetail.status.name}
                                            </Tag>
                                            <p className='mt-1'>
                                                {orderDetail.status.description}
                                            </p>
                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            METODE PEMBAYARAN
                                            </div>
                                            
                                            <Tag color='green' className='mt-1'>
                                                {orderDetail.metode_pembayaran ? orderDetail.metode_pembayaran : 0}
                                            </Tag>

                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                                HISTORY TOKEN
                                            </div>
                                            
                                            <p className='mt-1'>
                                                -
                                            </p>
                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            RIWAYAT PESANAN
                                            </div>
                                            
                                            <div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/3'>
                                                        New Order
                                                        </div>
                                                        <div className='w-full text-end'>
                                                            {orderDetail.dateCreated}
                                                        </div>
                                                </div>
                                                {orderDetail.history.length > 0 && (
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                        {orderDetail.history[0].name}
                                                        </div>
                                                        <div className='w-full text-end'>
                                                        {orderDetail.history[0].date}
                                                        </div>
                                                    </div>
                                                    )}
                                                    
                                                    {orderDetail.history.length > 1 && (
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                        {orderDetail.history[1].name}
                                                        </div>
                                                        <div className='w-full text-end'>
                                                        {orderDetail.history[1].date}
                                                        </div>
                                                    </div>
                                                    )}
                                            </div>
                                        </div>

                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            RINCIAN PEMBAYARAN
                                            </div>
                                            
                                            <div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Subtotal
                                                        </div>
                                                        <div className='w-full flex justify-end'>
                                                        Rp. {Number(orderDetail.subtotalPrice).toLocaleString('id-ID')}
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Pajak
                                                        </div>
                                                        <div className='w-full flex justify-end text-green-400 font-bold'>
                                                        Include
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Point
                                                        </div>
                                                        <div className='w-full flex justify-end '>
                                                        {orderDetail.point}
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Fee
                                                        </div>
                                                        <div className='w-full flex justify-end '>
                                                        Rp. {Number(orderDetail.fee).toLocaleString('id-ID')}
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Total Tagihan
                                                        </div>
                                                        <div className='w-full flex justify-end '>
                                                        Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
                                                        </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <h1 className='mt-4 text-2xl mb-2'>Ubah Pemesan</h1>
                                    <div className='w-full flex flex-col md:flex-row justify-center'>
                                        <div className='w-full md:w-2/3'>
                                        <Select
                                            className="w-full h-10"
                                            placeholder="Pilih Status"
                                            value={orderDetail?.guest?.pic?.first_name + ' - ' + orderDetail?.guest?.pic?.last_name}
                                        >
                                            <Option value="All">All</Option>
                                            <Option value="New Order">New Order</Option>
                                            <Option value="Issued">Issued</Option>
                                        </Select>
                                        </div>
                                        <div className='w-full sm:w-1/3 flex sm:justify-end mt-2 md:mt-0'>
                                        <Button className='bg-[#3ac47d]   h-10 text-white font-semibold sm:w-1/2 w-full'>
                                            UBAH
                                        </Button>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <h1 className='mt-4 text-2xl mb-2'>Ubah Status Order</h1>
                                    <div className='w-full flex flex-col md:flex-row justify-center'>
                                        <div className='w-full md:w-2/3'>
                                        <Select
                                            className="w-full h-10"
                                            placeholder="Pilih Status"
                                            value={orderDetail?.status?.name}
                                        >
                                            <Option value="All">All</Option>
                                            <Option value="New Order">New Order</Option>
                                            <Option value="Issued">Issued</Option>
                                        </Select>
                                        </div>
                                        <div className='w-full sm:w-1/3 flex sm:justify-end mt-2 md:mt-0'>
                                        <Button className='bg-[#3f6ad8] h-10 text-white font-semibold sm:w-1/2 w-full'>
                                            UBAH
                                        </Button>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>

                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-5">
                                    <h1 className='mt-4 text-2xl mb-2'>History</h1>
                                    <hr className='mb-3'/>
                                    <div className='w-full flex space-x-2'>
                                        <div className='w-1/2'>
                                            {orderDetail.payment}
                                        </div>
                                        <div className='w-1/2 text-end'>
                                            {orderDetail.order_code}
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                                </div>
                        </div>
                    </>
                </>
            );
        case 'Flight':
            return (
                <>
                     {/* Flight */}
                    <>
                    <div className='flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6'>
                                <div className='w-full md:w-2/3'>
                                <Card className={`bg-gradient-to-b ${gradientColors2} `}>
                                    <div className='p-10'>
                                    <div className='flex w-full'>
                                        <div className='text-2xl font-bold text-white w-1/2'>
                                            {orderDetail.status.name}
                                        </div>
                                        <div className='  text-white w-1/2 flex justify-end'>
                                        Created :  {orderDetail.dateCreated}
                                        </div>
                                    </div>
                                        <div className='mt-2 text-white'>
                                            {orderDetail.status.description}
                                        </div>
                                    </div>
                                </Card>
                                <Card className='mt-16'>
                                    <CardHeader
                                    variant="gradient"
                                    className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                                    >
                                    <Typography variant="h6" color="white">
                                        Detail Order
                                    </Typography>
                                    </CardHeader>
                                    <CardBody className="px-5 pt-0 pb-2">
                                        <div className='flex items-center space-x-1'>
                                            <div className='text-blue-800 text-lg font-bold'>ORDER #{orderDetail?.order_code} </div> 
                                                <div>/ {orderDetail?.product?.detailProduct?.aero_orderid}
                                            </div>
                                        </div>
                                        <hr className='mb-5 mt-2'/>
                                        <div className="mb-4 w-full mt-4 overflow-auto">
                                                    <div>
                                                    <table className="w-full table-auto">
                                                        <thead>
                                                        <tr>
                                                            <th className="text-start  py-2">Name</th>
                                                            <th className="text-start  py-2">Phone</th>
                                                            <th className="text-start  py-2">Email</th>
                                                            
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td className="border-t border-b text-start  py-2"> {orderDetail?.guest?.pic?.first_name} {orderDetail?.guest?.pic?.last_name}</td>
                                                            <td className="border-t border-b text-start  py-2"> {orderDetail?.guest?.pic?.phone_code} {orderDetail?.guest?.pic?.phone_number}</td>
                                                            <td className="border-t border-b text-start  py-2"> {orderDetail?.guest?.pic?.email}</td>
                                                        
                                                            
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </div>
                                                </div>

                                       
                                   
                                    <br />

                                    <div>
                                    <div className='w-full flex '>
                                        <div className='w-1/2'>
                                            <div className='w-full flex space-x-6'>
                                                <div className='w-1/4 border border-black rounded-lg flex justify-center'>
                                                    <img src={orderDetail.product.detailProduct.imageProduct} alt="" className='w-20 h-28' />
                                                </div>
                                                <div className='w-1/3 text-2xl font-bold'>
                                                    {orderDetail?.product?.detailProduct?.nameFlight}
                                                </div>
                                            </div>                                        
                                        </div>
                                        <div className='w-1/2 text-blue-700 flex justify-end'>
                                        <div className='flex space-x-1' onClick={handleToggleDetails} style={{ cursor: 'pointer' }}>
                                                    Detail {showPassengerDetails ? <ChevronUpIcon className='w-5 h-5' /> : <ChevronDownIcon className='w-5 h-5' />}
                                                </div>

                                        </div>
                                    </div>
                                    <div className='w-full flex mt-5 '>
                                        <div className='w-1/2'>
                                            <div className='steps-container'>
                                                <Steps direction="vertical" current={1} className='steps'>
                                                <Step  
                                                    title={
                                                        <div className='flex space-x-2'>
                                                          <div>{formatTime(orderDetail?.product?.detailProduct?.departure_time)}</div>
                                                          <div>{orderDetail?.product?.detailProduct?.origin_id}</div>
                                                        </div>
                                                      }
                                                    description={<span className='flex'> <ClockIcon className='w-5 h-5 mr-2'/> {orderDetail?.product?.detailProduct?.duration} {orderDetail?.product?.detailProduct?.airline_code} Direct</span>} />
                                                <Step  title={
                                                        <div className='flex space-x-2'>
                                                          <div>{formatTime(orderDetail?.product?.detailProduct?.arrival_time)}</div>
                                                          <div>{orderDetail?.product?.detailProduct?.destination_id}</div>
                                                        </div>
                                                      } />
                                                </Steps>
                                            </div>
                                        </div>
                                        <div className='w-1/2 text-blue-700 flex justify-end'>
                                            <div className='flex space-x-1'>
                                            Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                    </div>


                                     {/* detail pesanan */}
                                        {showPassengerDetails && (
                                            
                                             <div className="mb-4 w-full mt-4  ">
                                                 <div>
                                                    <hr className='mt-5 mb- 5' />
                                                    
                                            <>
                                            <div className='w-full flex space-x-3 mt-10'>
                                                <div className='w-1/3'>
                                                    
                                                        <div className='flex justify-center items-center'>
                                                            <div className='border border-black rounded-lg w-1/2 flex justify-center items-center'>
                                                                <img src={orderDetail.product.detailProduct.imageProduct} alt="" className='w-20 h-28 ' />
                                                            </div>
                                                        </div>
                                                        <div className=' text-xl font-bold mt-2 text-center'>
                                                            {orderDetail?.product?.detailProduct?.flight_code} |  {orderDetail?.product?.detailProduct?.duration}
                                                            <p>
                                                            {orderDetail?.product?.detailProduct?.nameFlight} 
                                                            </p>
                                                        </div>
                                                                                        
                                                </div>
                                                <div className='w-full text-blue-700 flex justify-start'>
                                            
                                                <div className='steps-container'>
                                                        <Steps direction="vertical" current={1} className='steps'>
                                                        <Step  
                                                            title={
                                                                <div >
                                                                <div className='flex space-x-2'>
                                                                    <div>{formatTime2(orderDetail?.product?.detailProduct?.departure_time)}</div>
                                                                    <div>{orderDetail?.product?.detailProduct?.origin_id}</div>
                                                                    <div>{orderDetail?.product?.detailProduct?.origin_name}</div>
                                                                </div>
                                                                    <div>{orderDetail?.product?.detailProduct?.departure_date}</div>
                                                                </div>
                                                            }
                                                            description={<span >   <ClockIcon className='w-5 h-5 mr-2'/></span>} />
                                                        <Step   title={
                                                                <div>
                                                                    <div className='flex space-x-2'>
                                                                        <div>{formatTime2(orderDetail?.product?.detailProduct?.arrival_time)}</div>
                                                                        <div>{orderDetail?.product?.detailProduct?.destination_id}</div>
                                                                        <div>{orderDetail?.product?.detailProduct?.destination_name}</div>
                                                                    </div>
                                                                    <div>{orderDetail?.product?.detailProduct?.arrival_date}</div>
                                                                </div>
                                                            } />
                                                        </Steps>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                            
                                            </div>
                                            {orderDetail?.guest?.tamu && orderDetail.guest.tamu.length > 0 && (
                                                            <div className='mt-5 pt-5'>
                                                                <h1 className='font-bold text-lg'>
                                                                    Penumpang
                                                                </h1>
                                                                <table className="w-full table-auto mt-2 overflow-auto">
                                                                    <thead className={`bg-gradient-to-b ${gradientColors1} text-white`}>
                                                                        <tr>
                                                                            <th className="border-t border-b px-4 py-2">Title</th>
                                                                            <th className="border-t border-b px-4 py-2">Nama</th>
                                                                            <th className="border-t border-b px-4 py-2">Type</th>
                                                                            <th className="border-t border-b px-4 py-2">Birth</th>
                                                                            <th className="border-t border-b px-4 py-2">Nation</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].title}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].first_name} {orderDetail?.guest?.tamu[0].last_name}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].type}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].birth_date}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].nationality}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                                <br />
                                                                <table className="w-full table-auto mt-2">
                                                                    <thead className={`bg-gradient-to-b ${gradientColors1} text-white`}>
                                                                        <tr>
                                                                            <th className="border-t border-b px-4 py-2">Type</th>
                                                                            <th className="border-t border-b px-4 py-2">Qty</th>
                                                                            <th className="border-t border-b px-4 py-2">Price</th>
                                                                            <th className="border-t border-b px-4 py-2">Fee</th>
                                                                            <th className="border-t border-b px-4 py-2">Insurance</th>
                                                                            <th className="border-t border-b px-4 py-2">Tax</th>
                                                                            <th className="border-t border-b px-4 py-2">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.tamu[0].type}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.pax}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">Rp. {Number(orderDetail.priceSatuan).toLocaleString('id-ID')}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">Rp. {Number(orderDetail.fee).toLocaleString('id-ID')}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">{orderDetail?.insurance || 0}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">Rp. {Number(orderDetail.tax).toLocaleString('id-ID')}</td>
                                                                            <td className="border-t border-b text-center px-4 py-2">Rp. {Number(orderDetail.subtotalPrice).toLocaleString('id-ID')}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}

                                                </div>
                                        )}

                                    </CardBody>
                                </Card>

                               
                                
                                </div>

                                <div className='w-full md:w-1/3'>
                                    <div className='bg-[#3f6ad8] rounded-lg'>
                                        <div className='p-8'>
                                        <div className='text-white mt-2 mb-2'>
                                            <p className='text-lg'>
                                            Total
                                            </p>
                                            <p className='text-3xl font-semibold'>
                                            Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='w-full'>
                                    <Button className='w-full h-14 bg-[#3ac47d]  text-white font-semibold text-lg'>
                                    CREATE INVOICE
                                    </Button>
                                    <Button className='w-full mt-2 h-14 bg-[#3f6ad8] text-white font-semibold text-lg'>
                                        Cetak eTicket
                                    </Button>
                                    
                                </div>
                                <br />
                                <div className='w-full '>
                                    
                                </div>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <div className='p-5'>
                                        <div className='text-sm text-gray-500'>
                                            SPECIAL REQUEST
                                        </div>
                                        <p className='text-base mt-2'>
                                            {orderDetail.product.detailProduct.specialRequest}
                                        </p>
                                    </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <div className='p-5'>
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                                NO PESANAN
                                            </div>
                                            <p className='text-base mt-2'>
                                                {orderDetail.order_code}
                                            </p>
                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            STATUS PESANAN
                                            </div>
                                            <Tag color='orange' className='text-base mt-2'>
                                                {orderDetail.status.name}
                                            </Tag>
                                            <p className='mt-1'>
                                                {orderDetail.status.description}
                                            </p>
                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            METODE PEMBAYARAN
                                            </div>
                                            
                                            <Tag color='green' className='mt-1'>
                                                {orderDetail.metode_pembayaran ? orderDetail.metode_pembayaran : 0}
                                            </Tag>

                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                                HISTORY TOKEN
                                            </div>
                                            
                                            <p className='mt-1'>
                                                -
                                            </p>
                                        </div>
                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            RIWAYAT PESANAN
                                            </div>
                                            
                                            <div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/3'>
                                                        New Order
                                                        </div>
                                                        <div className='w-full text-end'>
                                                            {orderDetail.dateCreated}
                                                        </div>
                                                </div>
                                               
                                            </div>
                                        </div>

                                        <hr className='mt-5 mb-5' />
                                        <div>
                                            <div className='text-sm text-gray-500'>
                                            RINCIAN PEMBAYARAN
                                            </div>
                                            
                                            <div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Subtotal
                                                        </div>
                                                        <div className='w-full flex justify-end'>
                                                        Rp. {Number(orderDetail.subtotalPrice).toLocaleString('id-ID')}
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Pajak
                                                        </div>
                                                        <div className='w-full flex justify-end text-green-400 font-bold'>
                                                        Include
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Point
                                                        </div>
                                                        <div className='w-full flex justify-end '>
                                                        {orderDetail.point}
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Fee
                                                        </div>
                                                        <div className='w-full flex justify-end '>
                                                        Rp. {Number(orderDetail.fee).toLocaleString('id-ID')}
                                                        </div>
                                                </div>
                                                <div className='mt-2 flex w-full'>
                                                    <div className='w-1/2'>
                                                        Total Tagihan
                                                        </div>
                                                        <div className='w-full flex justify-end '>
                                                        Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
                                                        </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <h1 className='mt-4 text-2xl mb-2'>Ubah Pemesan</h1>
                                    <div className='w-full flex flex-col md:flex-row justify-center'>
                                        <div className='w-full md:w-2/3'>
                                        <Select
                                            className="w-full h-10"
                                            placeholder="Pilih Status"
                                            value={orderDetail?.guest?.pic?.first_name + ' - ' + orderDetail?.guest?.pic?.last_name}
                                        >
                                            <Option value="All">All</Option>
                                            <Option value="New Order">New Order</Option>
                                            <Option value="Issued">Issued</Option>
                                        </Select>
                                        </div>
                                        <div className='w-full sm:w-1/3 flex sm:justify-end mt-2 md:mt-0'>
                                        <Button className='bg-[#3ac47d]   h-10 text-white font-semibold sm:w-1/2 w-full'>
                                            UBAH
                                        </Button>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>
                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-2">
                                    <h1 className='mt-4 text-2xl mb-2'>Ubah Status Order</h1>
                                    <div className='w-full flex flex-col md:flex-row justify-center'>
                                        <div className='w-full md:w-2/3'>
                                        <Select
                                            className="w-full h-10"
                                            placeholder="Pilih Status"
                                            value={orderDetail?.status?.name}
                                        >
                                            <Option value="All">All</Option>
                                            <Option value="New Order">New Order</Option>
                                            <Option value="Issued">Issued</Option>
                                        </Select>
                                        </div>
                                        <div className='w-full sm:w-1/3 flex sm:justify-end mt-2 md:mt-0'>
                                        <Button className='bg-[#3f6ad8] h-10 text-white font-semibold sm:w-1/2 w-full'>
                                            UBAH
                                        </Button>
                                        </div>
                                    </div>
                                    </CardBody>
                                </Card>

                                <br />
                                <Card>
                                    <CardBody className="px-5 pt-0 pb-5">
                                    <h1 className='mt-4 text-2xl mb-2'>History</h1>
                                    <hr className='mb-3'/>
                                        {orderDetail.history.length > 0 && (
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                        {orderDetail.history[0].name}
                                                        </div>
                                                        <div className='w-full text-end'>
                                                        {orderDetail.history[0].date}
                                                        </div>
                                                    </div>
                                                    )}
                                                    
                                                    {orderDetail.history.length > 1 && (
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                        {orderDetail.history[1].name}
                                                        </div>
                                                        <div className='w-full text-end'>
                                                        {orderDetail.history[1].date}
                                                        </div>
                                                    </div>
                                                    )}
                                                    {orderDetail.history.length > 2 && (
                                                    <div className='mt-2 flex w-full'>
                                                        <div className='w-1/3'>
                                                        {orderDetail.history[2].name}
                                                        </div>
                                                        <div className='w-full text-end'>
                                                        {orderDetail.history[2].date}
                                                        </div>
                                                    </div>
                                                    )}
                                    </CardBody>
                                </Card>
                                </div>

                               
                        </div>
                    </>
                </>
            );
        default:
            return <div>Unknown product type</div>;
    }
};

// Di bagian return atau render
return (
    <div>
        {renderContent()}
    </div>
);



 
}

export default DetailOrderNew;
