import { Card, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Input, Tag } from 'antd';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';

const RiwayatPesanan = [
  {
   order_code : '12345',
   type: 'tiket pesawat',
   product: 'tiket',
   price: '150.000',
   pax: '2',
   status: 'lunas',
   date_created: '2019-09-24 07:20:27',
  },
];

function DetailEditCustomer({ customer }) {
  if (!customer) return null;

  return (
    <div>
      <h1 className='text-xl font-bold'>Perjalanan</h1>
      <div className="mt-12 mb-8 ">
        <Card>
              <CardHeader
                  variant="gradient" 
                  className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                  >
                  <Typography variant="h6" color="white">
                      Detail Customer
                  </Typography>
              </CardHeader>
             <>
             <div className='p-6'>
              <div className='w-full'>
                <Tag color={customer.verified === 'Sudah terverifikasi' ? 'green' : 'red'}>
                  {customer.verified}
                </Tag>
              </div>
                <div className='w-full flex mt-4'>
                  <div className='sm:w-1/4 '>
                    <p className='text-base font-bold'>
                      Nama Lengkap 
                    </p>
                  </div>
                  <div className='w-1/6  flex justify-center'>
                    <p className='text-base'>
                      :
                    </p>
                  </div>
                  <div className='w-full'>
                   <p className='text-base ml-2'>
                    {customer.firstname} {customer.lastname}
                   </p>
                  </div>
                </div>
                <br />
                <div className='w-full flex'>
                  <div className='w-1/6'>
                    <p className='text-base font-bold'>
                      Username
                    </p>
                  </div>
                  <div className='w-1/6 flex justify-center'>
                    <p className='text-base ml-2'>
                      :
                    </p>
                  </div>
                  <div className='w-3/4 flex'>
                    <div className='w-1/2'>
                      <p className='text-base'>
                      {customer.username}
                      </p>
                    </div>
                    <div className='w-1/5'>
                      <p className='text-base  font-bold'>
                        Birthday
                      </p>
                    </div>
                    <div className='w-1/6 flex justify-center'>
                    <p className='text-base'>
                      :
                    </p>
                  </div>
                    <div className='w-1/2'>
                      <p className='text-base'>
                      <p className='text-base'>
                        {customer.birthdate}
                      </p>
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <div className='w-full flex'>
                  <div className='w-1/6'>
                    <p className='text-base font-bold'>
                      Email
                    </p>
                  </div>
                  <div className='w-1/6 flex justify-center'>
                    <p className='text-base ml-2'>
                      :
                    </p>
                  </div>
                  <div className='w-3/4 flex'>
                    <div className='w-1/2'>
                      <p className='text-base'>
                     {customer.email}
                      </p>
                    </div>
                    <div className='w-1/5'>
                      <p className='text-base  font-bold'>
                        Phone
                      </p>
                    </div>
                    <div className='w-1/6 flex justify-center'>
                    <p className='text-base'>
                      :
                    </p>
                  </div>
                    <div className='w-1/2'>
                      <p className='text-base'>
                      <p className='text-base'>
                       {customer.phone}
                      </p>
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <div className='w-full flex'>
                  <div className='w-1/6'>
                    <p className='text-base font-bold'>
                      Nationality
                    </p>
                  </div>
                  <div className='w-1/6 flex justify-center'>
                    <p className='text-base ml-2'>
                      :
                    </p>
                  </div>
                  <div className='w-3/4 flex'>
                    <div className='w-1/2'>
                      <p className='text-base'>
                     {customer.nationality}
                      </p>
                    </div>
                    <div className='w-1/5'>
                      <p className='text-base  font-bold'>
                      Date Created
                      </p>
                    </div>
                    <div className='w-1/6 flex justify-center'>
                    <p className='text-base'>
                      :
                    </p>
                  </div>
                    <div className='w-1/2'>
                      <p className='text-base'>
                      <p className='text-base'>
                     {customer.date_created}
                      </p>
                      </p>
                    </div>
                  </div>
                </div>
               
              </div>
             </>
        </Card>


        {/* Tabel Riwayat Pesanan */}
          {/* <>
          <div className="mt-12 mb-8 ">
            <Card>
                  <CardHeader
                      variant="gradient" 
                      className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                      >
                      <Typography variant="h6" color="white">
                        Riwayat Pesanan
                      </Typography>
                  </CardHeader>
                  <div className='p-6'>
                    <div className='flex '>
                      <div className='w-full flex justify-end'>
                          <Input
                          placeholder="Search"
                          className='w-1/3 ' // Menambahkan padding kanan untuk membuat ruang untuk ikon
                          suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />} // Menambahkan ikon search sebagai suffix
                          />  
                      </div>
                  
                  </div>
                  <div className=" mb-4 w-full mt-4">
                        <table className="w-full table-auto">
                          <thead>
                              <tr >
                                    <th className="border px-4 py-2">No.</th>
                                    <th className="border px-4 py-2">Order Code</th>
                                    <th className="border px-4 py-2">Type</th>
                                    <th className="border px-4 py-2">Product</th>
                                    <th className="border px-4 py-2">Price</th>
                                    <th className="border px-4 py-2">Pax</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Date Created</th>
                                    <th className="border px-4 py-2">
                                    Aksi
                                    </th>
                                </tr>
                          </thead>
                          <tbody>
                          {RiwayatPesanan.map((item, index) => {
                                    return (
                                    <tr key={index} >
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2">{item.order_code}</td>
                                        <td className="border px-4 py-2">{item.type}</td>
                                        <td className="border px-4 py-2">{item.product}</td>
                                        <td className="border px-4 py-2 text-center">{item.price}</td>
                                        <td className="border px-4 py-2 text-center">{item.pax}</td>
                                        <td className="border px-4 py-2 text-center">{item.status}</td>
                                        <td className="border px-4 py-2 text-center">{item.date_created}</td>
                                        <td className="border px-4 py-2 text-center ">
                                      <div className='space-x-1 flex'>
                                        <Button className='bg-blue-700 text-white' >
                                            <EditOutlined />
                                        </Button>
                                        <Button className='border border-red-800 text-red-800'  >
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
            </Card>
            </div>
          </> */}


        {/* Tabel DAFTAR QUICKPICK */}
          {/* <>
                <div className="mt-12 mb-8 ">
                  <Card>
                        <CardHeader
                            variant="gradient" 
                            className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                            >
                            <Typography variant="h6" color="white">
                              Riwayat Pesanan
                            </Typography>
                        </CardHeader>
                        <div className='p-6'>
                          <div className='flex '>
                            <div className='w-full flex justify-end'>
                                <Input
                                placeholder="Search"
                                className='w-1/3 ' // Menambahkan padding kanan untuk membuat ruang untuk ikon
                                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />} // Menambahkan ikon search sebagai suffix
                                />  
                            </div>
                        
                        </div>
                        <div className=" mb-4 w-full mt-4 overflow-auto">
                              <table className="w-full table-auto ">
                                <thead>
                                    <tr >
                                          <th className="border px-4 py-2">No.</th>
                                          <th className="border px-4 py-2">Name</th>
                                          <th className="border px-4 py-2">Email</th>
                                          <th className="border px-4 py-2">Phone</th>
                                          <th className="border px-4 py-2">Nationality</th>
                                          <th className="border px-4 py-2">Birthday	</th>
                                          <th className="border px-4 py-2 text-center">Passport Number</th>
                                          <th className="border px-4 py-2">Passport expiry date</th>
                                          <th className="border px-4 py-2">Passport country</th>
                                          <th className="border px-4 py-2">Identity card number</th>
                                          <th className="border px-4 py-2">Identity country</th>
                                          <th className="border px-4 py-2">Identity date issue</th>
                                          <th className="border px-4 py-2">Identity date expiry</th>
                                          <th className="border px-4 py-2">Driving license number	</th>
                                          <th className="border px-4 py-2">Driving country		</th>
                                          <th className="border px-4 py-2">Driving date issue	</th>
                                          <th className="border px-4 py-2">Driving date expiry	</th>
                                          <th className="border px-4 py-2">Other document	</th>
                                          <th className="border px-4 py-2">Other country	</th>
                                          <th className="border px-4 py-2">Other date issue	</th>
                                          <th className="border px-4 py-2">Other date expiry	</th>

                                      </tr>
                                </thead>
                                <tbody>
                              
                                </tbody>
                              </table>
                            </div>
                      </div>
                  </Card>
                  </div>
          </> */}

      </div>
    </div>
  )
}

export default DetailEditCustomer
