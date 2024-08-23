import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Input, Select, Upload } from 'antd'
import React, { useState } from 'react'
import { UploadOutlined } from "@ant-design/icons";


const { Option } = Select;
const { Dragger } = Upload;
const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';

function TambahUserCorporate() {

    const [fileList, setFileList] = useState([]);
    const handleUpload = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1); // Hanya mengizinkan satu file
        fileList = fileList.map(file => {
          if (file.response) {
            // Transformasi gambar URL dari server jika diperlukan
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(fileList);
      };
    
      const handleRemove = () => {
        setFileList([]);
      };

      const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // URL untuk upload file
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            console.log(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
          }
        },
      };
  return (
    <div className="mt-5 mb-8 ">
        <Card className='p-10'>
        <h1 className='font-bold text-xl'>
            Tambah Data User Corporate
        </h1>
        </Card>
        
        <>
        <Card className='mt-10'>
         <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                    Data Perusahaan
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2 mb-5">

            <>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                    <div>
                    <label className='font-bold text-base'>Nama Perusahaan</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Industri</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Jumlah Karyawan</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Email</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Password</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Ulangi Password</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Kontak</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>Telephone</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                    <div>
                    <label className='font-bold text-base'>No. HP</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                    </div>
                </div>
                <div className='w-full mt-2'>
                    <label className='font-bold text-base'>Referensi</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name' />
                </div>
            </>

            </CardBody>
        </Card>
        </>

        {/* Lokasi */}
        <>
       <div className='mt-12 mb-8'>
       <Card>
         <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h6" color="white">
                   Lokasi
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2 mb-5">

                <>
                 <div className='w-full flex space-x-4 mt-2'>
                    <div className='w-full'>
                        <label className='font-bold text-base'>Alamat</label>
                        <Input.TextArea className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Corporate Name'/>
                    </div>
                   
                </div>
                <>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                        <div>
                        <label className='font-bold text-base'>Negara</label>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih opsi"
                        >
                            <Option value="1">Indonesia</Option>
                            <Option value="2">Iran</Option>
                            <Option value="3">Australia</Option>
                        </Select>
                        </div>
                        <div>
                        <label className='font-bold text-base'>Provinsi</label>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih opsi"
                        >
                            <Option value="1">Indonesia</Option>
                            <Option value="2">Iran</Option>
                            <Option value="3">Australia</Option>
                        </Select>
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                        <div>
                        <label className='font-bold text-base'>Kota</label>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih opsi"
                        >
                            <Option value="1">Indonesia</Option>
                            <Option value="2">Iran</Option>
                            <Option value="3">Australia</Option>
                        </Select>
                        </div>
                        <div>
                        <label className='font-bold text-base'>Kode Pos</label>
                        <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Kode Pos'/>
                        </div>
                    </div>
                </>

              
                </>
            </CardBody>
        </Card>
       </div>
        </>

        {/* Foto Profil */}
        <>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='mt-12 mb-8'>
                <Card>
                    <CardHeader
                    variant="gradient"
                    className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                    >
                    <Typography variant="h6" color="white">
                        Foto Profil
                    </Typography>
                    </CardHeader>
                    <CardBody className="px-5 pt-0 pb-2 mb-5">
                    <div className="flex w-full justify-center">
                        <Upload
                        name='avatar'
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // URL untuk mengirimkan gambar ke server (gantilah dengan yang sesuai)
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUpload}
                        onRemove={handleRemove}
                        >
                        <Button icon={<UploadOutlined />} className="w-full h-full">Upload</Button>
                        </Upload>
                    </div>
                    </CardBody>
                </Card>
                </div>

                <div className='mt-12 mb-8'>
                <Card>
                    <CardHeader
                    variant="gradient"
                    className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                    >
                    <Typography variant="h6" color="white">
                        Extra
                    </Typography>
                    </CardHeader>
                    <CardBody className="px-5 pt-0 pb-2 mb-5">
                    <div className="px-5 pt-0 pb-2 mb-5">
                        <label className='font-bold text-base'>Document</label>
                        <br />
                        <Dragger {...props}>
                        <div className="ant-upload-drag-icon">
                            <UploadOutlined className="text-xl" /> <span>Upload Document</span>
                        </div>
                        </Dragger>
                    </div>
                    <div className="px-5 pt-0 pb-2 mb-5">
                        <label className='font-bold text-base'>Status</label>
                        <Select
                        className="w-full mt-2 h-10"
                        placeholder="Pilih opsi"
                        >
                        <Option value="Pending">Pending</Option>
                        <Option value="Aktif">Aktif</Option>
                        <Option value="Reject">Reject</Option>
                        </Select>
                    </div>
                    <div className="px-5 pt-0 pb-2 mb-5">
                        <label className='font-bold text-base'>Plafon</label>
                        <Input className='w-full h-10 mt-2' />
                    </div>
                    </CardBody>
                </Card>
                </div>
            </div>
        </>

        <br />
        <div className='w-full flex justify-end '>

            <Button className='w-full bg-blue-500 text-white h-10'>
                Simpan
            </Button>
        </div>
    </div>
  )
}

export default TambahUserCorporate
