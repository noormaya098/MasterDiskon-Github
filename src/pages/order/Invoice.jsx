import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Modal, Pagination, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    CloudDownloadOutlined
  } from '@ant-design/icons';
import Baseurl from '@/API/BaseUrl';
import axios from 'axios';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';

const { Option } = Select;


const dataInvoiceAll = [
    
    {
     date_created: '17/05/24 15:03',
     noInvoice: 'MDINV240500120',
     no_order: 'MD2405170037',
     name: 'Mrs. DERA RATNA PUTRI',
     status: 'OPEN',
     tag: 'Sales - Mario,Flight,Offline',
     total: '978.951',
     dibayarkan: '978.951',
    },
    {
     date_created: '17/05/24 15:03',
     noInvoice: 'MDINV240500120',
     no_order: 'MD2405170037',
     name: 'Mrs. DERA RATNA PUTRI',
     status: 'OPEN',
     tag: 'Sales - Mario,Flight,Offline',
     total: '978.951',
     dibayarkan: '978.951',
    },
    {
     date_created: '17/05/24 15:03',
     noInvoice: 'MDINV240500120',
     no_order: 'MD2405170037',
     name: 'Mrs. DERA RATNA PUTRI',
     status: 'OPEN',
     tag: 'Sales - Mario,Flight,Offline',
     total: '978.951',
     dibayarkan: '978.951',
    },
    {
     date_created: '17/05/24 15:03',
     noInvoice: 'MDINV240500120',
     no_order: 'MD2405170037',
     name: 'Mrs. DERA RATNA PUTRI',
     status: 'OPEN',
     tag: 'Sales - Mario,Flight,Offline',
     total: '978.951',
     dibayarkan: '978.951',
    },
   
  ];

function Invoice() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [dataFetch, setDataFetch] = useState([])

     // Fungsi untuk memanggil API data Customer
        const GetDataInvoice = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${Baseurl}backend/master/data-invoice?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDataFetch(response?.data?.data?.data )
                setTotalPage(response?.data?.data?.totalPage); 
                console.log("ini data hotel",response?.data?.data?.data );
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
            }
        };

        useEffect(() => {
        GetDataInvoice();
            }, [currentPage,limit, keyword]);

            // Fungsi untuk menangani perubahan halaman pada Pagination
            const handleChangePage = (page) => {
            setCurrentPage(page);
            };


            // Modal Detail Invoice
            const [isModalVisible, setIsModalVisible] = useState(false);
            const [invoiceDetails, setInvoiceDetails] = useState(null);
            const [loading, setLoading] = useState(false);
            
            const showModal = async (id_invoice) => {
              setLoading(true);
              setIsModalVisible(true);
              
              try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${Baseurl}backend/master/data-invoice-detail?id_invoice=${id_invoice}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                setInvoiceDetails(response?.data?.data);
              } catch (error) {
                Swal.fire('Error', 'Terjadi kesalahan saat memuat data invoice', 'error');
              } finally {
                setLoading(false);
              }
            };
          
            const handleCancel = () => {
              setIsModalVisible(false);
              setInvoiceDetails(null);  // Clear previous details on close
            };
          

  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table All Invoice
                </Typography>
            </CardHeader>

            <CardBody className=" px-5 pt-0 pb-2">
            <>
                <div className='w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2'>
                    <div className='w-full md:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold mt-10 block">Tahun</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Tahun">
                        <Option value="2024">2024</Option>
                        <Option value="2023">2023</Option>
                        <Option value="2022">2022</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2020">2020</Option>
                    </Select>
                    </div>
                    <div className='w-full md:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold mt-10 block">Produk</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Produk">
                        <Option value="All">All</Option>
                        <Option value="Trip">Trip</Option>
                        <Option value="Flight">Flight</Option>
                        <Option value="Hotel">Hotel</Option>
                        <Option value="Activities">Activities</Option>
                        <Option value="Product">Product</Option>
                        <Option value="Tour">Tour</Option>
                        <Option value="Document">Document</Option>
                        <Option value="Train">Train</Option>
                    </Select>
                    </div>
                    <div className='w-full md:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold mt-10 block">Platform</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Platform">
                        <Option value="All">All</Option>
                        <Option value="Direct">Direct Offline</Option>
                        <Option value="Web">Web</Option>
                        <Option value="Android">Android</Option>
                        <Option value="iOS">iOS</Option>
                    </Select>
                    </div>
                    <div className='w-full md:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold mt-10 block">Corporate</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Corporate">
                        <Option value="All">All</Option>
                        <Option value="Personal">Personal</Option>
                        <Option value="Corporate">Corporate</Option>
                    </Select>
                    </div>
                    <div className='w-full md:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold mt-10 block">Sales</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Sales">
                        <Option value="All">All</Option>
                        <Option value="Karin">Karin</Option>
                        <Option value="Dandi">Dandi</Option>
                        <Option value="Ray">Ray</Option>
                        <Option value="Kanaya">Kanaya</Option>
                        <Option value="Mario">Mario</Option>
                        <Option value="Daniel">Daniel</Option>
                    </Select>
                    </div>
                    <div className='w-full md:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold mt-10 block">Status</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Status">
                        <Option value="All">All</Option>
                        <Option value="GROUP: Book">GROUP: Book</Option>
                        <Option value="GROUP: Fix">GROUP: Fix</Option>
                        <Option value="GROUP: Gagal">GROUP: Gagal</Option>
                        <Option value="New Order">New Order</Option>
                        <Option value="Booking">Booking</Option>
                        <Option value="Paid">Paid</Option>
                        <Option value="Issued">Issued</Option>
                        <Option value="Complated">Completed</Option>
                        <Option value="Billed">Billed</Option>
                        <Option value="Expired">Expired</Option>
                        <Option value="Canceled">Canceled</Option>
                        <Option value="Failed">Failed</Option>
                    </Select>
                    </div>
                </div>
            </>

            <>
                <div className='w-full flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-2'>
                    <div className='w-full md:w-1/6'>
                    <Button className={`bg-gradient-to-b ${gradientColors2} text-white w-full md:w-1/2`} style={{ height: '40px' }}>
                        Search
                    </Button>
                    <Button className={`bg-gradient-to-b ${gradientColors3} text-white w-full md:w-1/3 mt-2 md:mt-0`} style={{ height: '40px' }}>
                        <CloudDownloadOutlined className='font-bold' />
                    </Button>
                    </div>
                </div>
            </>


                <>
                <div>
                    <div className="mb-4 w-full mt-4 overflow-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">No.</th>
                                    <th className="border px-4 py-2">Date Created	</th>
                                    <th className="border px-4 py-2">No Invoice</th>
                                    <th className="border px-4 py-2">No Order</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Tag</th>
                                    <th className="border px-4 py-2">Total</th>
                                    <th className="border px-4 py-2">Dibayar</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dataFetch.map((item, index) => (
                                <tr key={index}>
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">{item.date_created}</td>
                                <td className="border px-4 py-2 text-center">
                                    <a href="">
                                        <u  className='text-blue-900 '>
                                            {item.no_invoice}
                                        </u>
                                    </a>
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <Tag color='#3ac47d'>
                                        {item.no_order}
                                    </Tag>
                                </td>
                                <td className="border px-4 py-2 ">{item.company_name}</td>
                                <td className="border px-4 py-2 text-center">
                                    <Tag color='#f7b924' className='text-black'>
                                        {item.status}
                                    </Tag>    
                                </td>
                                <td className="border px-4 py-2">{item.tags}</td>
                                <td className="border px-4 py-2 text-center truncate"> Rp. {Number(item.total).toLocaleString('id-ID')}</td>
                                <td className="border px-4 py-2 truncate">Rp. {Number(item.remaining_payment).toLocaleString('id-ID')}</td>
                                <td className="border px-4 py-2 text-center">
                                    <div className="space-x-1">
                                        <Button className='bg-blue-500 text-white' onClick={() => showModal(item.id_invoice)}>
                                        Tindakan
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
                </>
            </CardBody>
        </Card> 


    {/* modal detail invoice */}

    <Modal
         title={[
            <div className="flex text-2xl justify-center items-center">
                Tindakan Pembayaran
            </div>
         ]}
         visible={isModalVisible}
         onCancel={handleCancel}
         width={1000}
         footer={[
           <Button key="back" onClick={handleCancel}>
             Close
           </Button>
         ]}
       >
         {loading ? (
           <p>Loading...</p>
         ) : invoiceDetails ? (
           <div className='text-base'>
            
            <hr />
            <br />
            <div className='w-full flex space-x-5'>
               <div className='w-1/2  flex space-x-4'>
                <div className='w-1/3 font-bold'>
                        Perusahaan	
                    </div>
                    
                    <div className='w-full'>
                        {invoiceDetails.company_name}
                    </div>
               </div>
               <div className='w-1/2  flex space-x-4'>
                <div className='w-1/3 font-bold'>
                        Diterima		
                    </div>
                    
                    <div className='w-full'>
                        {invoiceDetails.order_date}
                    </div>
               </div>
            </div>
            <div className='w-full flex space-x-5 mt-2'>
               <div className='w-1/2  '>
                    <div className='flex w-full space-x-4'>
                    <div className='w-1/3 font-bold'>
                                Nama 	
                            </div>
                           
                            <div className='w-full'>
                                {invoiceDetails.client_name}
                            </div>
                    </div>
                    <div className='flex w-full space-x-4 mt-2'>
                    <div className='w-1/3 font-bold'>
                            Alamat  	
                        </div>
                          
                            <div className='w-full'>
                                {invoiceDetails.address}
                            </div>
                    </div>
               </div>
               <div className='w-1/2  flex space-x-4'>
                <div className='w-1/3 font-bold'>
                        Catatan		
                    </div>
                    
                    <div className='w-full'>
                        <Input.TextArea className='h-12'/>
                    </div>
               </div>
            </div>
            <br />
            <hr />
            <br />
            <div>
                <div className='w-full flex space-x-5 mt-2'>
                    <div className='w-1/2'>
                    <div className='w-full'>
                        <label className='font-bold'>Metode Pembayaran</label>
                        <Select className='w-full mt-2'>
                            <Select.Option value="Transfer Bank">Transfer Bank</Select.Option>
                        </Select>
                    </div>
                    </div>
                    <div className='w-1/2'>
                    <div className='w-full'>
                        <label className='font-bold'>Deposit</label>
                        <Select className='w-full mt-2'>
                            <Select.Option value="bank mandiri">Bank Mandiri</Select.Option>
                        </Select>
                    </div>
                    </div>
                </div>
            </div>
            <br />
            <hr />
            <br />
            <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Nama Produk</th>
                                    <th className="border px-4 py-2">Pax 	</th>
                                    <th className="border px-4 py-2">Tax </th>
                                    <th className="border px-4 py-2">Discount</th>
                                    <th className="border px-4 py-2">Point</th>
                                    <th className="border px-4 py-2">SubTotal</th>
                                    <th className="border px-4 py-2">Total</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {invoiceDetails.product.map((item, index) => (
                                <tr key={index}>
                                
                                <td className="border px-4 py-2 ">{item.product}</td>
                                <td className="border px-4 py-2 text-center">
                                    {item.pax} {item.unit}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <Tag color='#3ac47d'>
                                        {item.tax} %
                                    </Tag>
                                </td>
                                <td className="border px-4 py-2 text-center">{item.discount}</td>
                                <td className="border px-4 py-2 text-center">
                                   {item.point}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                Rp. {Number(item.subtotal).toLocaleString('id-ID')} 
                                </td>
                                <td className="border px-4 py-2 text-center">
                                Rp. {Number(item.total).toLocaleString('id-ID')} 
                                </td>
                                
                                </tr>
                            ))}
                        </tbody>
                        </table>
             {/* <p><strong>No Invoice:</strong> {invoiceDetails.no_invoice}</p>
             <p><strong>No Order:</strong> {invoiceDetails.no_order}</p>
             <p><strong>Status:</strong> {invoiceDetails.status}</p>
             <p><strong>Client Name:</strong> </p>
             <p><strong>Company:</strong></p>
             <p><strong>Total:</strong> {invoiceDetails.total}</p>
             <p><strong>Remaining Payment:</strong> {invoiceDetails.remaining_payment}</p>
             <p><strong>Order Date:</strong> </p>
             <p><strong>Due Date:</strong> {invoiceDetails.due_date}</p>
             <p><strong>Product Details:</strong></p>
             {invoiceDetails.product.map((product, index) => (
               <div key={index}>
                 <p><strong>Product:</strong> {product.product}</p>
                 <p><strong>Description:</strong> {product.description}</p>
                 <p><strong>Price:</strong> {product.price}</p>
               </div>
             ))} */}
           </div>
         ) : (
           <p>No details available.</p>
         )}
      </Modal>
    </div>
  )
}

export default Invoice
