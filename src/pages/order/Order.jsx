import { Button, Input, Select, Tag, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import DetailOrder from './DetailOrder';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Baseurl from '@/API/BaseUrl';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const dataOrder = [
  {
    order_code: 'MD2405170002',
    order: 'Saipul Bahri Surbakti',
    product: 'Flightios',
    total_price: '377.305',
    tgl_order: '17/05/24 00:00',
    tgl_created:'17/05/24 06:16',
    order_x_input: '0',
    date_invoice: '',
    input_x_inv: '-1',
    ulpoad_date: '',
    tgl_payment: '',
    tgl_tdk_bayar: '',
    inv_x_payment: '0',
    order_status: 'issued INV:',
  },
  {
    order_code: 'MD2405170002',
    order: 'Saipul Bahri Surbakti',
    product: 'Flightios',
    total_price: '377.305',
    tgl_order: '17/05/24 00:00',
    tgl_created:'17/05/24 06:16',
    order_x_input: '0',
    date_invoice: '',
    input_x_inv: '-1',
    ulpoad_date: '',
    tgl_payment: '',
    tgl_tdk_bayar: '',
    inv_x_payment: '0',
    order_status: 'issued INV:',
  },
  {
    order_code: 'MD2405170002',
    order: 'Saipul Bahri Surbakti',
    product: 'Flightios',
    total_price: '377.305',
    tgl_order: '17/05/24 00:00',
    tgl_created:'17/05/24 06:16',
    order_x_input: '0',
    date_invoice: '',
    input_x_inv: '-1',
    ulpoad_date: '',
    tgl_payment: '',
    tgl_tdk_bayar: '',
    inv_x_payment: '0',
    order_status: 'issued INV:',
  },
  // Tambahkan data lainnya jika perlu
];

const { Option } = Select;

function Order() {
  
  return (
    <div className="mt-12 mb-8 ">
       <Card>   
             <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Report Order
                </Typography>
            </CardHeader>


    
            <CardBody className=" px-5 pt-0 pb-2">
            <>
              <div className='w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                <div className='w-full md:w-1/6'>
                  <label className="font-plus-jakarta-sans font-bold  block">Tahun</label>
                  <Select className="w-full mt-2 h-10" placeholder="Pilih Tahun">
                    <Option value="2024">2024</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2022">2022</Option>
                    <Option value="2021">2021</Option>
                    <Option value="2020">2020</Option>
                  </Select>
                </div>
                <div className='w-full md:w-1/6'>
                  <label className="font-plus-jakarta-sans font-bold  block">Corporate</label>
                  <Select className="w-full mt-2 h-10" placeholder="Pilih Corporate">
                    <Option value="All">All</Option>
                    <Option value="Personal">Personal</Option>
                    <Option value="Corporate">Corporate</Option>
                  </Select>
                </div>
                <div className='w-full md:w-1/6'>
                  <label className="font-plus-jakarta-sans font-bold  block">From</label>
                  <Select className="w-full mt-2 h-10" placeholder="Pilih From">
                    <Option value="All">All</Option>
                    <Option value="Direct">Direct Offline</Option>
                    <Option value="Web">Web</Option>
                    <Option value="Android">Android</Option>
                    <Option value="iOS">iOS</Option>
                  </Select>
                </div>
                <div className='w-full md:w-1/6'>
                  <label className="font-plus-jakarta-sans font-bold  block">Export</label>
                  <Select className="w-full mt-2 h-10" placeholder="Pilih Export">
                    <Option value="All">All</Option>
                    <Option value="Sudah Dieksport">Sudah Dieksport</Option>
                    <Option value="Belum Dieksport">Belum Dieksport</Option>
                  </Select>
                </div>
                <div className='w-full md:w-1/6'>
                  <label className="font-plus-jakarta-sans font-bold  block">Status</label>
                  <Select className="w-full mt-2 h-10" placeholder="Pilih Status">
                    <Option value="All">All</Option>
                    <Option value="Open">Open</Option>
                    <Option value="Overdue">Overdue</Option>
                    <Option value="Partial">Partial</Option>
                    <Option value="Paid">Paid</Option>
                    <Option value="Unpaid">Unpaid</Option>
                  </Select>
                </div>
                <div className='w-full md:w-1/6 flex justify-end items-center'>
                  <Button className={`bg-gradient-to-b ${gradientColors2} mt-7 text-white w-full`} style={{ height: '40px' }}>
                    Search
                  </Button>
                </div>
              </div>
            </>

            <br />

            <>
              <div className='flex justify-end'>
                <div className='w-full md:w-1/2 flex justify-end'>
                  <Input
                    placeholder="Search"
                    className='w-full md:w-[31%] h-10'
                    suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                  />
                </div>
              </div>
            </>

          <div className="mb-4 w-full mt-4">
            <div className='overflow-auto'> 
              <table className="w-full table-auto over">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">No.</th>
                    <th className="border px-4 py-2">Order Code</th>
                    <th className="border px-4 py-2">Pemesanan </th>
                    <th className="border px-4 py-2">Produk </th>
                    <th className="border px-4 py-2">Total Price</th>
                    <th className="border px-4 py-2">Tanggal Order</th>
                    <th className="border px-4 py-2">Tanggal Created</th>
                    <th className="border px-4 py-2">Order x Input</th>
                    <th className="border px-4 py-2">Date Voice</th>
                    <th className="border px-4 py-2">Input x inv</th>
                    <th className="border px-4 py-2">Upload Date </th>
                    <th className="border px-4 py-2">Tanggal Payment </th>
                    <th className="border px-4 py-2">Tanggal tidak bayar </th>
                    <th className="border px-4 py-2">Inv x Payment </th>
                    <th className="border px-4 py-2">Order Status </th>
                  </tr>
                </thead>
                <tbody>
                  {dataOrder.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-center">{index + 1}</td>
                      <td className="border px-4 py-2">{item.order_code}</td>
                      <td className="border px-4 py-2">{item.order}</td>
                      <td className="border px-4 py-2">{item.product}</td>
                      <td className="border px-4 py-2">{item.total_price}</td>
                      <td className="border px-4 py-2 text-center">{item.tgl_order}</td>
                      <td className="border px-4 py-2 text-center">{item.tgl_created}</td>
                      <td className="border px-4 py-2 text-center">
                          <Tag color='red'>
                            {item.order_x_input}
                        </Tag>
                      </td>
                      <td className="border px-4 py-2 text-center">{item.date_invoice}</td>
                      <td className="border px-4 py-2 text-center">
                        <Tag color='red'>
                          {item.input_x_inv}
                        </Tag>
                      </td>
                      <td className="border px-4 py-2 text-center">{item.ulpoad_date}</td>
                      <td className="border px-4 py-2 text-center">{item.tgl_payment}</td>
                      <td className="border px-4 py-2 text-center">{item.tgl_tdk_bayar}</td>
                      <td className="border px-4 py-2 text-center">
                        <Tag color='red'>
                          {item.inv_x_payment}
                        </Tag>
                      </td>
                      <td className="border px-4 py-2 text-center">{item.order_status}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        
        </CardBody>
      </Card>
    </div>
  );
}

export default Order;
