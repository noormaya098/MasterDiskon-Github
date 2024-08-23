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

const dataReportLeaderboard = [
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
    {
        name: 'KAROLINA KLARA',
        country: 'PT. PENERBIT ERLANGGA MAHAMERU',
        total: '3.324.603.603',
        qty: '433'
    },
]
function Ledearboard() {
  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Table Report Leaderboard (by B2B User)
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
                                    <th className="border px-4 py-2">Nama</th>
                                    <th className="border px-4 py-2">Perusahaan</th>
                                    <th className="border px-4 py-2">Total</th>
                                    <th className="border px-4 py-2">Qty</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {dataReportLeaderboard.map((item, index) => (
                                    <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{item.name}</td>
                                    <td className="border px-4 py-2 text-center">{item.country}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.total}
                                    
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.qty}
                                    
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

export default Ledearboard
