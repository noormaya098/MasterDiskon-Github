import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Input, Select, Upload } from 'antd';
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const { Option } = Select;

const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

function EditDetailVendor() {
    const [editorData, setEditorData] = useState('');
  return (
    <div>
        <hr />
        <div className="mt-14 mb-8 ">
            <div>
                <Card className='mb-10 p-10 text-xl font-bold'>
                    Detail Vendor
                </Card>
            </div>
            <>
            <Card>
                <CardHeader
                    variant="gradient" 
                    className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                    >
                    <Typography variant="h6" color="white">
                        Informasi Vendor
                    </Typography>
                </CardHeader>
                <CardBody className=" px-5 pt-0 pb-2">
                <div>
                    <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Vendor :</label>
                        <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder="masukkan nama vendor"
                        />
                        </div>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Telepon :</label>
                        <Input
                            type="number"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder="+62 8231379812"
                        />
                        </div>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Email :</label>
                        <Input
                            type="email"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder="example@gmail.com"
                        />
                        </div>
                    </div>
                    <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Negara :</label>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih Negara"
                        >
                            <Option value="Indonesia">Indonesia</Option>
                            <Option value="Afganistan">Afganistan</Option>
                            <Option value="Irak">Irak</Option>
                        </Select> 
                        </div>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Provinsi :</label>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih Provinsi"
                        >
                            <Option value="Indonesia">Indonesia</Option>
                            <Option value="Afganistan">Afganistan</Option>
                            <Option value="Irak">Irak</Option>
                        </Select> 
                        </div>
                    </div>
                    <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Kota :</label>
                        <Select
                            className="w-full mt-2 h-10"
                            placeholder="Pilih Kota"
                        >
                            <Option value="Indonesia">Indonesia</Option>
                            <Option value="Afganistan">Afganistan</Option>
                            <Option value="Irak">Irak</Option>
                        </Select> 
                        </div>
                        <div className='w-full md:w-1/2'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Kecamatan :</label>
                        <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder=""
                        />
                        </div>
                    </div>
                    <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                        <div className='w-full md:w-1/3'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Kelurahan :</label>
                        <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder=""
                        />
                        </div>
                        <div className='w-full md:w-2/3'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Alamat :</label>
                        <Input.TextArea
                            type="text"
                            className="mt-2 mb-2 w-full h-24"
                            name="nama_bahan"
                            placeholder=""
                        />
                        </div>
                    </div>
                </div>


                    <div className='w-full flex space-x-3'>
                        <div className='w-full'>
                        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Deskripsi :</label>
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
            </>


            <>
            <div className="mt-14 mb-8 ">
                <Card>
                    <CardHeader
                        variant="gradient" 
                        className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                        >
                        <Typography variant="h6" color="white">
                            Informasi Pimpinan
                        </Typography>
                    </CardHeader>
                    <CardBody className=" px-5 pt-0 pb-2">
                    <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                        <div className='w-full md:w-1/2'>
                            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Direktur :</label>
                            <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder="masukkan nama direktur"
                            />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nomor Direktur :</label>
                            <Input
                            type="number"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder="masukkan nomor direktur"
                            />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Email Direktur :</label>
                            <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder="masukkan email direktur"
                            />
                        </div>
                        </div>

                    </CardBody>
                </Card>
            </div>
            </>

            <>
            <div className="mt-14 mb-8 ">
                <Card>
                    <CardHeader
                        variant="gradient" 
                        className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                        >
                        <Typography variant="h6" color="white">
                            Informasi PIC
                        </Typography>
                    </CardHeader>
                    <CardBody className=" px-5 pt-0 pb-2">
                    <div className='w-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0'>
                            <div className='w-full lg:w-1/3'>
                                <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Title :</label>
                                <Select
                                className="w-full mt-2 h-10"
                                placeholder=""
                                >
                                <Option value="Mr">Mr</Option>
                                <Option value="Mrs">Mrs</Option>
                                </Select>
                            </div>
                            <div className='w-full lg:w-1/2'>
                                <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Depan :</label>
                                <Input
                                type="text"
                                className="mt-2 mb-2 h-10 w-full"
                                name="nama_bahan"
                                placeholder="masukkan nama depan"
                                />
                            </div>
                            <div className='w-full lg:w-1/2'>
                                <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Belakang :</label>
                                <Input
                                type="text"
                                className="mt-2 mb-2 h-10 w-full"
                                name="nama_bahan"
                                placeholder="masukkan nama belakang"
                                />
                            </div>
                            <div className='w-full lg:w-1/2'>
                                <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">No. Telp :</label>
                                <Input
                                type="number"
                                className="mt-2 mb-2 h-10 w-full"
                                name="nama_bahan"
                                placeholder="Exp: 08231383474"
                                />
                            </div>
                        </div>

                        <br />
                        <hr className='border ' />
                        <br />
                        <div className='w-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0'>
                        <div className='w-full lg:w-[45%]'>
                            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Logo Vendor :</label>
                            <div className='w-full'>
                            <Upload {...props}>
                                <Button className='mt-2 mb-2 h-10 w-[22rem] sm:w-[36rem] ' icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            </div>
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Pilih Kategori :</label>
                            <div className='w-full'>
                            <Select
                                className="w-full mt-2 h-10"
                                placeholder="Pilih Kategori"
                            >
                                <Option value="Pilih Kategori">Pilih Kategori</Option>
                                <Option value="Hotel">Hotel</Option>
                                <Option value="Restaurant">Restaurant</Option>
                                <Option value="Gym">Gym</Option>
                                <Option value="Salon">Salon</Option>
                                <Option value="Clinic">Clinic</Option>
                            </Select>
                            </div>
                        </div>
                        </div>

                    </CardBody>
                </Card>
                    <div className='w-full mt-8 mb-8 '>
                        <Button className='w-full h-12 bg-blue-500 text-white text-lg'>
                            Save
                        </Button>
                    </div>
            </div>
            </>
        </div>
    </div>
  )
}

export default EditDetailVendor
