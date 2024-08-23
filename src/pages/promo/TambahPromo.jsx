import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Checkbox, DatePicker, Input, Select, Upload } from 'antd';
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const { Option } = Select;

const { Dragger } = Upload;

function TambahPromo() {
const [editorData, setEditorData] = useState('');
const options = [
    { label: 'Mobile', value: 'Mobile' },
    { label: 'Web', value: 'Web' },
  ];

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // URL untuk mengunggah gambar (gantikan dengan URL server Anda)
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
        <>
    
        <div className='mt-14'>
        <div className='flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5'>
        <div className='w-full lg:w-2/3'>
            <Card>
                <CardHeader
                    variant="gradient" 
                    className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                    <Typography variant="h6" color="white">
                        Tambah Promo
                    </Typography>
                </CardHeader>
                <CardBody>
                    <div className='w-full'>
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Title
                        </label>
                        <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                        />
                        <i>slug :</i>
                    </div>
                    <br />
                    <div className='w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
                        <div className='w-full md:w-1/3'>
                            <label 
                                className="font-plus-jakarta-sans font-bold block md:inline-block"
                                style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                            >
                                Mulai
                            </label>
                            <DatePicker className='h-10 w-full mt-2'/>
                        </div>
                        <div className='w-full md:w-1/3'>
                            <label 
                                className="font-plus-jakarta-sans font-bold block md:inline-block"
                                style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                            >
                                Berakhir
                            </label>
                            <DatePicker className='h-10 w-full mt-2'/>
                        </div>
                        <div className='w-full md:w-1/3'>
                            <label 
                                className="font-plus-jakarta-sans font-bold block md:inline-block"
                                style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                            >
                                Kupon
                            </label>
                            <Input className='h-10 w-full mt-2'/>
                        </div>
                    </div>
                    <br />
                    <div>
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px', marginBottom: '10px' }}
                        >
                            Deskripsi
                        </label>
                        <div className='h-auto mt-2'>
                            <CKEditor 
                                editor={ClassicEditor}
                                data={editorData}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setEditorData(data);
                                }}  
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px', marginBottom: '10px' }}
                        >
                            Syarat
                        </label>
                        <div className='h-auto mt-2'>
                            <CKEditor 
                                editor={ClassicEditor}
                                data={editorData}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setEditorData(data);
                                }}  
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
            
        </div>

        <div className='w-full lg:w-1/3 pt-10 sm:pt-0'>
            <Card>
                <CardHeader
                    variant="gradient" 
                    className={`bg-gradient-to-b ${gradientColors2} mb-8 p-6 text-center`}
                >
                    <Typography variant="h5" color="white">
                        Pengaturan
                    </Typography>
                </CardHeader>
                <CardBody className="px-5 pt-0 pb-2">
                    <div>
                        <h1 className='text-lg font-semibold'>PENGATURAN</h1>
                        <hr />
                        <br />
                        <div>
                            <h1 className='text-lg mb-2'>Platform</h1>
                            <div className="flex flex-col space-y-2">
                                <Checkbox value="Mobile" className='text-lg'>Mobile</Checkbox>
                                <Checkbox value="Web" className='text-lg'>Web</Checkbox>
                            </div>
                        </div>
                        <br />
                        <div>
                            <label 
                                className="font-plus-jakarta-sans font-bold"
                                style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                            >
                                Status
                            </label>
                            <Select
                                className="w-full mt-2 h-12"
                                placeholder="Pilih Status"
                            >
                                <Option value="Aktif">Aktif</Option>
                                <Option value="Non Aktif">Non Aktif</Option>
                            </Select> 
                        </div>
                        <br />
                        <div>
                            <label 
                                className="font-plus-jakarta-sans font-bold"
                                style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                            >
                                Kategori
                            </label>
                            <Select
                                className="w-full mt-2 h-12"
                                placeholder="Pilih Kategori"
                            >
                                <Option value="Pengguna Baru">Pengguna Baru</Option>
                                <Option value="Produk">Produk</Option>
                                <Option value="Pembayaran">Pembayaran</Option>
                                <Option value="Pengiriman">Pengiriman</Option>
                                <Option value="Evoucher">Evoucher</Option>
                                <Option value="Flashdeal">Flashdeal</Option>
                                <Option value="Verified">Verified</Option>
                                <Option value="Spesial">Spesial</Option>
                                <Option value="Custome">Custome</Option>
                            </Select> 
                        </div>
                    </div>
                </CardBody>
            </Card>

            <br />

            <div className="mt-12 mb-8">
                <Card>
                    <CardHeader
                        variant="gradient" 
                        className={`bg-gradient-to-b ${gradientColors2} mb-8 p-6 text-center`}
                    >
                        <Typography variant="h5" color="white">
                            Gambar
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <Dragger {...props} className="border-gray-300 rounded-lg">
                                <p className="ant-upload-drag-icon">
                                    <UploadOutlined />
                                </p>
                                <p className="ant-upload-text">Masukkan gambar yang diperlukan</p>
                            </Dragger>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
        
        </div>
            <Button className='mt-10 w-full h-12 bg-blue-500 text-lg text-white'>
                Simpan 
            </Button>
        </div>
        </>
  )
}

export default TambahPromo
