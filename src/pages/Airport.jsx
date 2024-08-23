import { CardBody, CardHeader } from '@material-tailwind/react';
import { Card, Input, Pagination, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    
    SearchOutlined
  } from '@ant-design/icons';
import Baseurl from '@/API/BaseUrl';
import axios from 'axios';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';

function Airport() {
    const ListBandara = [
        {
          name_airport: '9 de Maio - Teixeira de Freitas Airport',
          code: 'TXF',
          code4: 'SNTF',
          city: 'Teixeira de Freitas',
          country: 'Brazil',
        },
        {
          name_airport: '9 de Maio - Teixeira de Freitas Airport',
          code: 'TXF',
          code4: 'SNTF',
          city: 'Teixeira de Freitas',
          country: 'Brazil',
        },
        {
          name_airport: '9 de Maio - Teixeira de Freitas Airport',
          code: 'TXF',
          code4: 'SNTF',
          city: 'Teixeira de Freitas',
          country: 'Brazil',
        },
       
      ];

  const [DataAirport, setDataAirport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');


      // Fungsi untuk memanggil API data Customer
  const GetAirport = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${Baseurl}backend/master/data-airport?page=${currentPage}&limit=${limit}&keyword=${keyword}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setDataAirport(response?.data?.data?.data )
        setTotalPage(response?.data?.data?.totalPage); 
        console.log("ini data airport",response?.data?.data?.data );
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
    }
  };

  useEffect(() => {
    GetAirport();
    }, [currentPage,limit, keyword]);

       // Fungsi untuk menangani perubahan halaman pada Pagination
 const handleChangePage = (page) => {
  setCurrentPage(page);
};

  return (
    <div className="mt-12 mb-8 ">
       <Card>
            <CardHeader 
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography className='text-white font-bold text-lg' variant="h6" color="white">
                    Table Bandara
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
            <div className=" mb-4 w-full mt-4 overflow-x-scroll" >
                <div>
                    <table className="w-full table-auto">
                        <thead>
                        <tr >
                            <th className="border px-4 py-2">No.</th>
                            <th className="border px-4 py-2">Airport Name </th>
                            <th className="border px-4 py-2">Kode</th>
                            <th className="border px-4 py-2">Kode4</th>
                            <th className="border px-4 py-2">Kota</th>
                            <th className="border px-4 py-2">Negara</th>
                        </tr>
                        </thead>
                        <tbody>
                            {DataAirport.map((item, index) => {

                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.airport_name}</td>
                                    <td className="border px-4 py-2 text-center">
                                    <Tag color="green">{item.code_airport}</Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                    <Tag color="blue">{item.code_airport_4}</Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center">{item.city}</td>
                                    <td className="border px-4 py-2 text-center">{item.country_name}</td>
                                    
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
    </div>
  )
}

export default Airport
