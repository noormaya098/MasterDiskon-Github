import { Button, Input, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from 'react-router-dom';
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';
import Swal from 'sweetalert2';
import axios from 'axios';

const { Option } = Select;

function DetailEditHotel() {
    const { id_hotel } = useParams();
    const [hotelDetail, setHotelDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
      const fetchHotelDetail = async () => {
        try {
          const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${Baseurl}backend/master/data-hotel-detail?id_hotel=${id_hotel}`,
            headers: { 
              'Authorization': `Bearer ${Token}` // Replace with your actual token
            }
          };
          const response = await axios.request(config);
          setHotelDetail(response?.data?.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  

      useEffect(() => {
      fetchHotelDetail();
    }, [id_hotel]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const [fileList, setFileList] = useState([]);
    const handleUpload = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1); 
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(fileList);
      };
    
      const handleRemove = () => {
        setFileList([]);
      };

  return (
    <div className='w-full space-y-4'>
      <div className='w-full flex flex-col sm:flex-row sm:space-x-2'>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>Nama Hotel :</label>
          <Input type="text" className="mt-2 mb-2" name="nama_bahan" placeholder="Input Nama Bahan yang dibutuhkan" />
        </div>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>ID :</label>
          <Input type="text" className="mt-2 mb-2" name="nama_bahan" placeholder="Input Nama Bahan yang dibutuhkan" />
        </div>
      </div>

      <div className='w-full flex flex-col sm:flex-row sm:space-x-2'>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>Kota :</label>
          <Select className="w-full mt-2" placeholder="Pilih opsi">
            <Option value="1">Jakarta</Option>
            <Option value="2">Jawa</Option>
            <Option value="3">Kuningan</Option>
          </Select>
        </div>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>Negara :</label>
          <Select className="w-full mt-2" placeholder="Pilih opsi">
            <Option value="1">Arab</Option>
            <Option value="2">Indonesia</Option>
            <Option value="3">Australia</Option>
          </Select>
        </div>
      </div>

      <div className='w-full flex flex-col sm:flex-row sm:space-x-2 mt-2'>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>Rating :</label>
          <Input type="text" className="mt-2 mb-2" name="nama_bahan" placeholder="Input Nama Bahan yang dibutuhkan" />
        </div>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>Lokasi :</label>
          <Input.TextArea type="text" className="mt-2 mb-2 h-auto" name="nama_bahan" placeholder="Input Nama Bahan yang dibutuhkan" />
        </div>
      </div>

      <div className='w-full flex flex-col sm:flex-row sm:space-x-2 mt-2'>
        <div className='w-full sm:w-1/2'>
          <label className="font-plus-jakarta-sans font-bold" style={{ marginTop: '40px', marginRight: '10px' }}>Upload Document :</label>
          <div className="m-4">
            <Upload name='avatar' action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={fileList} onChange={handleUpload} onRemove={handleRemove}>
              <Button icon={<UploadOutlined />} className="w-full h-full">Upload</Button>
            </Upload>
          </div>
        </div>
        <div className='w-full sm:w-1/2 flex justify-end items-end'>
          <Button className='bg-blue-500 text-white'>
            Simpan
          </Button>
        </div>
      </div>
    </div>

  )
}

export default DetailEditHotel
