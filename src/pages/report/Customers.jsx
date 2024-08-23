import React from 'react'
import {
    CloudDownloadOutlined
  } from '@ant-design/icons';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Select } from 'antd';


const { Option } = Select;

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';


const dataReportCustomer = [
    {
        month: 'January',
        sales: 'PT. PENERBIT ERLANGGA MAHAMERU',
        flight: '268.064.108',
        totalFlight: '58',
        hotel: '178.680.290',
        totalHotel : '55',
        activities: '2.057.385',
        totalActivities: '3',
        tour: '598.141.738',
        totalTour: '3',
        document: '18.812.688',
        totalDocument: '2',
        train: '13.001.460',
        totalTrain: '8',
        total: '1.078.757.669',
        totalTotal: '129' 
    },
    {
        month: 'January',
        sales: 'PT. PENERBIT ERLANGGA MAHAMERU',
        flight: '268.064.108',
        totalFlight: '58',
        hotel: '178.680.290',
        totalHotel : '55',
        activities: '2.057.385',
        totalActivities: '3',
        tour: '598.141.738',
        totalTour: '3',
        document: '18.812.688',
        totalDocument: '2',
        train: '13.001.460',
        totalTrain: '8',
        total: '1.078.757.669',
        totalTotal: '129' 
    },
    {
        month: 'January',
        sales: 'PT. PENERBIT ERLANGGA MAHAMERU',
        flight: '268.064.108',
        totalFlight: '58',
        hotel: '178.680.290',
        totalHotel : '55',
        activities: '2.057.385',
        totalActivities: '3',
        tour: '598.141.738',
        totalTour: '3',
        document: '18.812.688',
        totalDocument: '2',
        train: '13.001.460',
        totalTrain: '8',
        total: '1.078.757.669',
        totalTotal: '129' 
    },
    {
        month: 'January',
        sales: 'PT. PENERBIT ERLANGGA MAHAMERU',
        flight: '268.064.108',
        totalFlight: '58',
        hotel: '178.680.290',
        totalHotel : '55',
        activities: '2.057.385',
        totalActivities: '3',
        tour: '598.141.738',
        totalTour: '3',
        document: '18.812.688',
        totalDocument: '2',
        train: '13.001.460',
        totalTrain: '8',
        total: '1.078.757.669',
        totalTotal: '129' 
    },
]
function Customers() {
  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Report Sales
                </Typography>
            </CardHeader>
            <CardBody className=" px-5 pt-0 pb-2">
            <>
                <div className='w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
                    <div className='w-full sm:w-1/4'>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih Tahun"
                        >
                            <Option value="2024">2024</Option>
                            <Option value="2023">2023</Option>
                            <Option value="2022">2022</Option>
                            <Option value="2021">2021</Option>
                            <Option value="2020">2020</Option>
                        </Select>
                    </div>
                    <div className='w-full sm:w-1/4'>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih Bulan"
                        >
                            <Option value="Semua Bulan">Semua Bulan</Option>
                            <Option value="Januari">Januari</Option>
                            <Option value="Februari">Februari</Option>
                            <Option value="Maret">Maret</Option>
                            <Option value="April">April</Option>
                            <Option value="Mei">Mei</Option>
                            <Option value="Juni">Juni</Option>
                            <Option value="Juli">Juli</Option>
                            <Option value="Agustus">Agustus</Option>
                            <Option value="Oktober">Oktober</Option>
                            <Option value="November">November</Option>
                            <Option value="Desember">Desember</Option>
                        </Select>
                    </div>
                    <div className='w-full flex justify-end'>
                        <div className='w-full md:w-auto flex justify-end space-x-2 mt-2'>
                            <Button className={`bg-gradient-to-b ${gradientColors2} text-white w-1/2 md:w-auto`} style={{ height: '40px' }}>
                                Search
                            </Button>
                            <Button className={`bg-gradient-to-b ${gradientColors3} text-white w-1/2 md:w-auto`} style={{ height: '40px' }}>
                                <CloudDownloadOutlined className='font-bold' />
                            </Button>
                        </div>
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
                                    <th className="border px-4 py-2">Month</th>
                                    <th className="border px-4 py-2">Sales</th>
                                    <th className="border px-4 py-2">Flight</th>
                                    <th className="border px-4 py-2">Hotel</th>
                                    <th className="border px-4 py-2">Activities</th>
                                    <th className="border px-4 py-2">Tour</th>
                                    <th className="border px-4 py-2">Document</th>
                                    <th className="border px-4 py-2">Train</th>
                                    <th className="border px-4 py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataReportCustomer.map((item, index) => (
                                    <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{item.month}</td>
                                    <td className="border px-4 py-2 ">{item.sales}</td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.flight}
                                        <p className='ml-2'>
                                        ({item.totalFlight})
                                        </p>
                                    </td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.hotel}
                                        <p className='ml-2'>
                                        ({item.totalHotel})
                                        </p>
                                    </td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.activities}
                                        <p className='ml-2'>
                                        ({item.totalActivities})
                                        </p>
                                    </td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.tour}
                                        <p className='ml-2'>
                                        ({item.totalTour})
                                        </p>
                                    </td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.document}
                                        <p className='ml-2'>
                                        ({item.totalDocument})
                                        </p>
                                    </td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.train}
                                        <p className='ml-2'>
                                        ({item.totalTrain})
                                        </p>
                                    </td>
                                    <td className="border px-4 py-2 text-end">
                                        {item.total}
                                        <p className='ml-2'>
                                        ({item.totalTotal})
                                        </p>
                                    </td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
            </CardBody>
        </Card>
    </div>
  )
}

export default Customers
