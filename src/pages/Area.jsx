import { CardBody, CardHeader } from '@material-tailwind/react';
import { Card, Input, Pagination, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import {  
  SearchOutlined
} from '@ant-design/icons';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';


function Area() {
    const ListArea = [
        {
          name_area: 'Gambir',
          code: 'Gmb',
          city: 'Jakarta',
          country: 'Indonesia',
        },
       
        
       
      ];

      const [DataArea, setDataArea] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPage, setTotalPage] = useState(0);
      const [limit, setLimit] = useState(10);
      const [keyword, setKeyword] = useState('');
  
      
       // Fungsi untuk memanggil API data alamat
       const GetDataArea = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Baseurl}backend/master/data-geolist?page=${currentPage}&limit=${limit}&keyword=${keyword}&type=AREA`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataArea(response?.data?.data?.data );
            setTotalPage(response?.data?.data?.totalPage); 
            console.log("ini data region",response?.data?.data?.data );
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
    GetDataArea();
    }, [currentPage,limit, keyword]);
  

  return (
    <div className="mt-12 mb-8 ">
    <Card>
    <CardHeader 
              variant="gradient" 
              className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
          >
               <Typography className='text-white font-bold text-lg' variant="h6" color="white">
                  Table Area
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
              <div  className='overflow-auto'>
                  <table className="w-full table-auto">
                      <thead>
                      <tr >
                            <th className="border px-4 py-2">No.</th>
                            <th className="border px-4 py-2">Nama Wilayah </th>
                            <th className="border px-4 py-2">Geo Id</th>
                            
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">ParentId</th>
                        </tr>
                      </thead>
                      <tbody>
                          {DataArea.map((item, index) => {

                              return (
                                <tr key={index} >
                                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                                  <td className="border px-4 py-2">{item.name}</td>
                                  <td className="border px-4 py-2 text-center">
                                  <Tag color="green">{item.geoId}</Tag>
                                  </td>
                                
                                  <td className="border px-4 py-2 text-center">{item.type}</td>
                                  <td className="border px-4 py-2 text-center">{item.parentId}</td>
                             
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

export default Area
