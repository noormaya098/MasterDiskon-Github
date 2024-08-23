
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Pagination, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

  const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
  const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
  const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';

function DetailCoupon() {
    const { id_coupon } = useParams();
    const [DataDetail, setDataDetail] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // jumlah item per halaman

  
      

    const GetDetailCoupon = async () => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${Baseurl}backend/master/data-coupon-detail?id_coupon=${id_coupon}`,
          headers: { 
            'Authorization': `Bearer ${Token}`
          }
        };
    
        try {
          Swal.fire({
            title: 'Loading...',
            text: 'Please wait while we fetch the hotel details.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
    
          const response = await axios.request(config);
          setDataDetail(response?.data?.data);
        

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
        GetDetailCoupon();
      }, [id_coupon]);

      const currentData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return DataDetail?.coupon_history.slice(start, end);
      };
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

      const couponCodes = DataDetail.coupon_code.split(',');

       

  return (
    <div className="mt-12 mb-8  ">
      <div className="w-full flex flex-col lg:flex-row lg:space-x-5">
    <div className="w-full lg:w-2/3">
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography variant="h6" color="white">
                    Detail Coupon
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2">
                <div className="mb-4 w-full mt-4">
                    <div>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-start px-4 py-2 w-[25%]">Nama Voucher</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Nilai Promo</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Minimum Belanja</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">
                                        {DataDetail.coupon_name}
                                    </td>
                                    <td className="px-4 py-2">Rp. {Number(DataDetail.amount).toLocaleString('id-ID')} ({DataDetail.percent})</td>
                                    <td className="px-4 py-2">Rp. {Number(DataDetail.minimum).toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-2">
                                        <Tag color={DataDetail.status === 'Aktif' ? 'green' : 'red'}>
                                            {DataDetail.status}
                                        </Tag>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-start px-4 py-2 w-[25%]">Berlaku di</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Berlaku</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Jenis potongan</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Tgl register</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">{DataDetail.platform}</td>
                                    <td className="px-4 py-2">
                                        <Tag color='green' className='text-base'>{DataDetail.start_date}</Tag> 
                                        
                                        <p className='mt-2'><Tag color='red' className='text-base'>{DataDetail.end_date}</Tag></p></td>
                                    <td className="px-4 py-2">
                                            <Tag className='text-base mt-1' color='orange'>Category : {DataDetail.category}</Tag> 
                                        <p>
                                            <Tag className='text-base mt-1' color='magenta'>Tipe : {DataDetail.type}</Tag>
                                        </p>
                                    </td>
                                    <td className="px-4 py-2">{DataDetail.date_added}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-start px-4 py-2 w-[25%]">Metode Pembayaran</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Kupon Digunakan</th>
                                    <th className="text-start px-4 py-2 w-[25%]">Ketentuan</th>
                                    <th className="text-start px-4 py-2 w-[25%]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">
                                        {DataDetail.payment_method}
                                    </td>
                                    <td className="px-4 py-2">
                                        {DataDetail.coupon_used}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Tag color={DataDetail.term === 'Dapat digabung dengan promo lain' ? 'green' : 'red'}>
                                            {DataDetail.term}
                                        </Tag>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardBody>
        </Card>
        <br />
        <Card className='mt-10'>
            <CardBody className="px-5 pt-0 pb-2">
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography variant="h6" color="white">
                    Coupon History
                </Typography>
            </CardHeader>
                <div className="mb-4 w-full mt-4 ">
                    <div>
                        <table className="w-full table-auto overflow-auto">
                            <thead>
                                <tr>
                                    <th className="border border-solid px-4 py-2 text-center">No.</th>
                                    <th className="border border-solid px-4 py-2 text-center">Nama</th>
                                    <th className="border border-solid px-4 py-2 text-center">Kode</th>
                                    <th className="border border-solid px-4 py-2 text-center">Nilai</th>
                                    <th className="border border-solid px-4 py-2 text-center">Produk</th>
                                    <th className="border border-solid px-4 py-2 text-center">Tgl Pakai</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {currentData().map((history, index) => (
                                        <tr key={history.id_coupon_history}>
                                        <td className="border border-solid px-4 py-2 text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td className="border border-solid px-4 py-2 text-center">{history.contact_name}</td>
                                        <td className="border border-solid px-4 py-2 text-center"><Tag color='blue'>{history.coupon_code}</Tag></td>
                                        <td className="border border-solid px-4 py-2 text-center">Rp. {Number(history.amount).toLocaleString('id-ID')}</td>
                                        <td className="border border-solid px-4 py-2 text-center">
                                            <Tag color={
                                            history.product === 'train' ? 'green' :
                                            history.product === 'hotel' ? 'magenta' :
                                            history.product === 'flight' ? 'blue' : 'default'
                                            }>
                                            {history.product}
                                            </Tag>
                                        </td>
                                        <td className="border border-solid px-4 py-2 text-center">{history.date_used}</td>
                                        </tr>
                                    ))}
                                </tbody>
                               
                        </table>
                        <Pagination
                                current={currentPage}
                                pageSize={itemsPerPage}
                                total={DataDetail?.coupon_history.length}
                                onChange={handlePageChange}
                                style={{ marginTop: '16px', textAlign: 'center' }}
                            />
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
    <div className="w-full lg:w-1/3 sm:pt-0 pt-10">
        <div className="bg-[#3f6ad8]">
            <div className="p-5 text-white">
                <p className="text-sm">Jumlah kupon</p>
                <br />
                <p className="text-3xl font-semibold">{DataDetail.quantity} / 120</p>
            </div>
        </div>
        <br />
        <Card>
            <CardBody>
                <div>
                    <p className="font-bold">Kode Promo</p>
                    <p>
                        {couponCodes.map((code, index) => (
                            <Tag color="blue" className="mb-2" key={index}>{code}</Tag>
                        ))}
                    </p>
                </div>
            </CardBody>
        </Card>
    </div>
</div>

    </div>
  )
}

export default DetailCoupon
