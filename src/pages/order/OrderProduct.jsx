import { Button, Pagination, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import DetailOrder from './DetailOrder';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    CloudDownloadOutlined
  } from '@ant-design/icons';
import Baseurl from '@/API/BaseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
  
  const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
  const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
  const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';

const dataOrderAll = [
  {
    title: 'Mrs',
    first_name: 'DERA RATNA',
    last_name: 'PUTRI',
    phone: '62 87887968274',
    email: 'sekretariat.editorbupel@erlangga.co.id',
    code:'MD2405170037',
    company: 'PT. PENERBIT ERLANGGA EDITOR',
    user: 'DERA RATNA PUTRI',
    sales: 'Mario',
    contact: 'Mrs. DERA RATNA PUTRI',
    product: 'Flight',
    code_product: 'FMNID31CI6I7F7',
    total_price: '978.951',
    tgl_input: '17/05/24 10:31',
    status: 'issued',
    corporate: 'corporate',
    kode_booking: 'NQTAKS',
    tujuan: 'BWX - CGK',
    nama: 'Mr. Yolanda Gussel',
    tgl_keberangkatan: '18/05/2024',
    jam: '10:55 - 12:40',
    qty: '1',
    unit: 'pax',
    pajak: '1.1',
    amount: '968.300',
    subtotal: '968.300',
    tax: '10.651',
    discount: '0',
    point: '0',
    grand_total: '978.951',
    from: 'direct',
    total: 'Rp978.951',
    metode: 'Transfer',
    exp: '2024-05-31 00:00:00',
    sisa: '978951'
  },
  {
    code:'MD2405170035',
    company: 'PT. PENERBIT ERLANGGA (LOGISTIC PUSAT)',
    user: 'JAMI NURAHMAN',
    sales: 'Mario',
    contact: 'Mr. JAMI NURAHMAN',
    product: 'Hotel',
    code_product: 'FMNID01CI3EX8D',
    total_price: '2.517.390',
    tgl_input: '17/05/24 10:29',
    status: 'issued'
  },
  // Tambahkan data lainnya jika perlu
];

const { Option } = Select;

function OrderProduct() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleNavigate = async (id_order) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Baseurl}backend/order/data-order-detail?id_order=${id_order}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setSelectedOrder(response.data.data);
        setShowDetail(true);
    } catch (error) {
        console.error('Error fetching order details:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat detail order', 'error');
    }
};


  const [DataFilter, setDataFilter] = useState([]);

   // Fungsi untuk memanggil API data alamat
   const GetFilter = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Baseurl}backend/order/filter-order`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setDataFilter(response.data.data);
        console.log("ini filter",response.data.data );
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
    }
};

useEffect(() => {
  GetFilter();
}, []);


  const [DataAll, setDataAll] = useState([]);

    // Fungsi untuk memanggil API data order
  const GetDataOrderProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Baseurl}backend/order/data-order?page=${currentPage}&limit=${limit}&keyword=&product=&platform=&sales=&status=`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDataAll(response.data.data.data);
      setTotalPage(response.data.data.totalPage); // Set total page from API response
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
    }
  };

useEffect(() => {
  GetDataOrderProduct();
}, [currentPage,limit]);

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
};

 // Fungsi untuk menangani perubahan halaman pada Pagination
 const handleChangePage = (page) => {
    setCurrentPage(page);
};

const navigate = useNavigate();

const handleDetail = (id_order) => {
    navigate(`/dashboard/order/orderProduct/detail-order-product/${id_order}`);
}
 

  return (
    <div className="mt-12 mb-8 ">
       
      {showDetail ? (
        <DetailOrder orderDetail={selectedOrder} />
      ) : (
            <Card> 
              <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table All Order
                </Typography>
                </CardHeader>


            <CardBody className=" px-5 pt-0 pb-2">
            <>
            <div className='w-full flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-2'>
                
                <div className='w-full sm:w-1/5'>
                    <label className="font-plus-jakarta-sans font-bold block mt-4 sm:mt-10">Produk</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Produk">
                        <Option value="All">All</Option>
                        {DataFilter.productType?.map((item) => (
                            <Option key={item.value} value={item.value}>{item.productName}</Option>
                        ))}
                    </Select>
                </div>
                <div className='w-full sm:w-1/5'>
                    <label className="font-plus-jakarta-sans font-bold block mt-4 sm:mt-10">Platform</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Platform">
                        <Option value="All">All</Option>
                        {DataFilter.platformType?.map((item) => (
                            <Option key={item.value} value={item.value}>{item.productName}</Option>
                        ))}
                    </Select>
                </div>
               
                <div className='w-full sm:w-1/6'>
                    <label className="font-plus-jakarta-sans font-bold block mt-4 sm:mt-10">Sales</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Sales">
                        <Option value="All">All</Option>
                        {DataFilter.salesAdmin?.map((item) => (
                            <Option key={item.value} value={item.value}>{item.name}</Option>
                        ))}
                    </Select>
                </div>
                <div className='w-full sm:w-1/5'>
                    <label className="font-plus-jakarta-sans font-bold block mt-4 sm:mt-10">Status</label>
                    <Select className="w-full mt-2 h-10" placeholder="Pilih Status">
                        <Option value="All">All</Option>
                        {DataFilter.statusType?.map((item) => (
                            <Option key={item.value} value={item.value}>{item.statusName}</Option>
                        ))}
                    </Select>
                </div>
                
            </div>
            <div className='w-full flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-2 mt-4 justify-end'>
                <div className='w-full sm:w-1/6 flex space-x-2'>
                    <Button className={`bg-gradient-to-b ${gradientColors2} text-white w-1/2`} style={{ height: '40px' }}>
                        Search
                    </Button>
                    <Button className={`bg-gradient-to-b ${gradientColors3} text-white w-1/3`} style={{ height: '40px' }}>
                        <CloudDownloadOutlined className='font-bold' />
                    </Button>
                </div>
            </div>
            </>


            <>
            <div className='overflow-auto'>
                <div className="mb-4 w-full mt-4">
                    <div>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">No.</th>
                                    <th className="border px-4 py-2">Order Kode</th>
                                    <th className="border px-4 py-2">Company</th>
                                    <th className="border px-4 py-2">Costumer Name</th>
                                   
                                    <th className="border px-4 py-2">Product</th>
                                    <th className="border px-4 py-2">Total Price</th>
                                    <th className="border px-4 py-2">Tgl Input</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DataAll.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2">{item.order_code} 
                                            <p>
                                                <Tag color={item.platform === 'direct' ? 'orange' : item.platform === 'web' ? 'blue' : item.platform === 'android' ? 'green' : 'defaultColor'}>
                                                    {item.platform}
                                                </Tag>
                                            </p>
                                                    
                                                    </td>
                                        <td className="border px-4 py-2 w-12 truncate">{item.company}</td>
                                        <td className="border px-4 py-2">{item.customerName}</td>
                                  
                                        <td className="border px-4 py-2 text-center">
                                            <div>
                                                {item.productType}
                                              
                                            </div>
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            Rp. {formatNumber(item.totalPrice)}
                                        </td>
                                        <td className="border px-4 py-2 text-center">{item.dateCreated}</td>
                                        <td className="border px-4 py-2 text-center">
                                        <Tag color={item.status === 'Issued' ? 'green' : item.status === 'Expired' ? 'red' : 'blue'}>
                                            {item.status}
                                        </Tag>
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <div className="space-x-1">
                                                <Button onClick={() => handleDetail(item.id_order)} className='bg-blue-500 text-white'>
                                                    Detail
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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
                </div>
            </div>
        </>
            </CardBody>
    
        </Card> 
      )}
       
    </div>
  );
}

export default OrderProduct;
