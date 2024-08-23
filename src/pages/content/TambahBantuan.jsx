import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Input, Select } from 'antd';
import React, { useState } from 'react'

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';

const { Option } = Select;


function TambahBantuan() {
    const [editorData, setEditorData] = useState('');
  return (
    <div className="mt-12 mb-8 ">
      <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                >
                <Typography variant="h5" color="white">
                    Artikel
                </Typography>
            </CardHeader>
            <CardBody className=" px-5 pt-0 pb-2">
              <h1 className='font-bold text-lg mb-2'>
                EDIT ARTIKEL
              </h1>
              <hr />
              <div className='mt-5'>
                <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans s">Title</label>
                  {/* Menghubungkan input tarif dengan state tarif */}
                  <Input
                      type="text"
                      className="mt-2 mb-2 h-14"
                      name="nama_bahan"
                  />
              </div>
              <br />
                <div>
                <i> slug: </i>
                  <div className='h-auto'>
                    <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px', marginBottom: '10px' }} className="font-plus-jakarta-sans text-blue-500">Content</label>
                        <div className='h-auto'>
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
                </div>

                
            </CardBody>
      </Card>

      <div className="mt-12 mb-8 ">
                  <Card>
                  <CardHeader
                        variant="gradient" 
                        className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
                        >
                        <Typography variant="h5" color="white">
                            Category
                        </Typography>
                  </CardHeader>
                  <CardBody>
                    <label label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Daftar Topik</label>
                                <Select
                                    className="w-full mt-2 h-12" // Contoh penggunaan kelas Tailwind untuk mengatur lebar
                                    placeholder="Pilih Negara"
                                >
                                    <Option value="Info Populer">Info Populer</Option>
                                    <Option value="Info Pemesanan">Info Pemesanan</Option>
                                    <Option value="Info Tiket Pesawat">Info Tiket Pesawat</Option>
                                    <Option value="Info Hotel">Info xHotel</Option>
                                    <Option value="Info Kereta Api">Info  Kereta Api</Option>
                                    <Option value="Info Promo">Info  Promo</Option>
                                    <Option value="Info Pembayaran">Info  Pembayaran</Option>
                                    
                                </Select> 
                  </CardBody>
                  </Card>
                </div>
              <div className='w-full'>
                <Button className='w-full bg-blue-500 text-white h-12'>
                  Simpan
                </Button>
              </div>
    </div>
  )
}

export default TambahBantuan
