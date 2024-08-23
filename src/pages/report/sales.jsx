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

const dataReportSales = [
    {
        month: 'January',
        sales: 'Dandi',
        flight: '110.445.258',
        totalFlight: '4',
        hotel: '0',
        totalHotel : '0',
        activities: '0',
        totalActivities: '0',
        tour: '58.800.000',
        totalTour: '1',
        document: '0',
        totalDocument: '0',
        train: '0',
        totalTrain: '0',
        total: '169.245.258',
        totalTotal: '5' 
    },
    {
        month: 'January',
        sales: 'Dandi',
        flight: '110.445.258',
        totalFlight: '4',
        hotel: '0',
        totalHotel : '0',
        activities: '0',
        totalActivities: '0',
        tour: '58.800.000',
        totalTour: '1',
        document: '0',
        totalDocument: '0',
        train: '0',
        totalTrain: '0',
        total: '169.245.258',
        totalTotal: '5' 
    },
    {
        month: 'January',
        sales: 'Dandi',
        flight: '110.445.258',
        totalFlight: '4',
        hotel: '0',
        totalHotel : '0',
        activities: '0',
        totalActivities: '0',
        tour: '58.800.000',
        totalTour: '1',
        document: '0',
        totalDocument: '0',
        train: '0',
        totalTrain: '0',
        total: '169.245.258',
        totalTotal: '5' 
    },
    {
        month: 'January',
        sales: 'Dandi',
        flight: '110.445.258',
        totalFlight: '4',
        hotel: '0',
        totalHotel : '0',
        activities: '0',
        totalActivities: '0',
        tour: '58.800.000',
        totalTour: '1',
        document: '0',
        totalDocument: '0',
        train: '0',
        totalTrain: '0',
        total: '169.245.258',
        totalTotal: '5' 
    },
    {
        month: 'January',
        sales: 'Dandi',
        flight: '110.445.258',
        totalFlight: '4',
        hotel: '0',
        totalHotel : '0',
        activities: '0',
        totalActivities: '0',
        tour: '58.800.000',
        totalTour: '1',
        document: '0',
        totalDocument: '0',
        train: '0',
        totalTrain: '0',
        total: '169.245.258',
        totalTotal: '5' 
    },
    {
        month: 'January',
        sales: 'Dandi',
        flight: '110.445.258',
        totalFlight: '4',
        hotel: '0',
        totalHotel : '0',
        activities: '0',
        totalActivities: '0',
        tour: '58.800.000',
        totalTour: '1',
        document: '0',
        totalDocument: '0',
        train: '0',
        totalTrain: '0',
        total: '169.245.258',
        totalTotal: '5' 
    },
]

function Sales() {
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
                                {dataReportSales.map((item, index) => (
                                    <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{item.month}</td>
                                    <td className="border px-4 py-2 text-center">{item.sales}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.flight}
                                        <span className='ml-2'>
                                        ({item.totalFlight})
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.hotel}
                                        <span className='ml-2'>
                                        ({item.totalHotel})
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.activities}
                                        <span className='ml-2'>
                                        ({item.totalActivities})
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.tour}
                                        <span className='ml-2'>
                                        ({item.totalTour})
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.document}
                                        <span className='ml-2'>
                                        ({item.totalDocument})
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.train}
                                        <span className='ml-2'>
                                        ({item.totalTrain})
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.total}
                                        <span className='ml-2'>
                                        ({item.totalTotal})
                                        </span>
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

export default Sales
