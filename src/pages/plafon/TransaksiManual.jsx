import { Button, Input, Select } from 'antd'
import React from 'react'

const { Option } = Select;

function TransaksiManual() {
  return (
    <div>
        <div className='w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            <div className='w-full md:w-1/2'>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">User :</label>
            <Select
                className="w-full mt-2 h-10"
                placeholder="Pilih User"
            >
                <Option value="PT ABC">PT ABC</Option>
                <Option value="PT JAJA USAHA LAKU">PT JAJA USAHA LAKU</Option>
                <Option value="PT ERLANGGA CABANG PAPUA">PT ERLANGGA CABANG PAPUA</Option>
            </Select>      
            </div>
            <div className='w-full md:w-1/2'>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Sisa Saldo :</label>
            <Input
                disabled
                type="number"
                className="mt-2 mb-2 h-10"
                placeholder="10.000.000"
            />
            </div>
        </div>
        <div className='w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            <div className='w-full md:w-1/2'>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Jenis Transaksi :</label>
            <Select
                className="w-full mt-2 h-10"
                placeholder="-"
            >
                <Option value="Penambahan">Penambahan</Option>
                <Option value="Pengurangan">Pengurangan</Option>
            </Select>      
            </div>
            <div className='w-full md:w-1/2'>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nominal Transaksi :</label>
            <Input
                type="number"
                className="mt-2 mb-2 h-10"
                placeholder="10.000.000"
            />
            </div>
        </div>
        <div className='w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            <div className='w-full md:w-1/2'>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Plafon :</label>
            <Input
                disabled
                type="number"
                className="mt-2 mb-2 h-10"
                placeholder="10.000.000"
            />  
            </div>
            <div className='w-full md:w-1/2'>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Saldo Akhir :</label>
            <Input
                type="number"
                className="mt-2 mb-2 h-10"
                placeholder="10.000.000"
            />
            </div>
        </div>
        <div className='w-full'>
            <div>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Keterangan :</label>
            <Input.TextArea className="w-full mt-2 mb-2 h-24" />
            </div>
        </div>
        <br />
        <hr />
        <div className='w-full flex justify-end mt-5 space-x-2'>
            {/* <Button className='bg-gray-600 text-white h-10'>
            Close
            </Button> */}
            <Button className='bg-blue-500 text-white h-10'>
            Save Set Plafon
            </Button>
            <Button className='bg-blue-900 text-white h-10'>
            Save Changed
            </Button>
        </div>
</div>

  )
}

export default TransaksiManual
