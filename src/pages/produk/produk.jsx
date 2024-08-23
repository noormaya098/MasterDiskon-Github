import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Drawer, Input, Modal, Space, Tag } from 'antd';
import React, { useState } from 'react'
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import DetailEdit from './DetailEdit';
import Swal from 'sweetalert2';
import TambahProduk from './TambahProduk';


const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';


const produk = [
    {
      namaProduk: 'Tiket Kereta Api',
      stock : '10',
      satuan: 'pcs',
    },
    {
      namaProduk: 'Tiket Pesawat',
      stock : '10',
      satuan: 'pcs',
    },
    {
      namaProduk: 'Hotel',
      stock : '10',
      satuan: 'pcs',
    },
  ];


function Produk() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus saja!',
        cancelButtonText: 'Batalkan'
    }).then((result) => {
        if (result.isConfirmed) {
            // Hapus item di sini
            Swal.fire(
                'Dihapus!',
                'Item berhasil dihapus.',
                'success'
            );
        }
    });
};

const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  



  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader 
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography variant="h6" color="white">
                    Table Produk
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2">
            <div className='flex flex-col md:flex-row justify-center'>
                <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                    <Input
                        placeholder="Search"
                        className='w-full md:w-1/3' // Menyesuaikan lebar input pada layar yang lebih kecil
                        suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />} // Menambahkan ikon search sebagai suffix
                    />
                </div>
                <div className='w-full md:w-1/2 text-end sm:text-end'>
                    <Button 
                        onClick={showModal} 
                        className={`bg-gradient-to-b ${gradientColors2} text-white hover:bg-white hover:text-brown-500 hover:border-transparent active:bg-brown-500 active:text-white active:border-brown-500`} 
                        style={{ height: '40px' }}
                    >
                        + Tambahkan List
                    </Button>
                </div>
            </div>
           
            <div className=" mb-4 w-full mt-4">
                <div  className='overflow-x-scroll '>
                    <table className="w-full table-auto">
                        <thead>
                        <tr >
                            <th className="border px-4 py-2">No.</th>
                            <th className="border px-4 py-2">Nama Produk</th>
                            <th className="border px-4 py-2">Stock</th>
                            <th className="border px-4 py-2">Satuan</th>
                            <th className="border px-4 py-2">
                            Aksi
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {produk.map((item, index) => {
                                const expirationDate = new Date(item.exp);
                                const currentDate = new Date();
                                const isExpired = expirationDate <= currentDate;
                                const tagColor = isExpired ? 'red' : 'green';

                                return (
                                <tr key={index} >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.namaProduk}</td>
                                    <td className="border px-4 py-2 text-center">
                                    <Tag color="green">{item.stock}</Tag>
                                    </td>
                                    <td className="border px-4 py-2 text-center">{item.satuan}</td>
                                    <td className="border px-4 py-2 text-center ">
                                   <div className='space-x-1 '>
                                    <Button onClick={showDrawer} className='bg-blue-700 text-white '>
                                        <EditOutlined />
                                    </Button>
                                    <Button className='border border-red-800 text-red-800' onClick={handleDelete}>
                                      <DeleteOutlined />
                                    </Button>          
                                   </div>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            </CardBody>
        </Card>
        <Drawer
            title={
              [
                <p className="text-xl ">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold ">Detail dan Edit Produk</h2>
                </div>
                </p>
              ]
            }
            placement="bottom"
            width={500}
            onClose={onClose}
            open={open}
            // extra={
            //   <Space>
            //     <Button className='bg-blue-600 text-white' onClick={onClose}>
            //       OK
            //     </Button>
            //   </Space>
            // }
          >
           <DetailEdit/>
      </Drawer>

      {/* modal tambah list */}
      <Modal width={800}  open={isModalOpen} footer={false} onCancel={handleCancel}>
        <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Tambah Produk</h2>
          </div>
        <hr />
        <br />
        <TambahProduk/>
      </Modal>
    </div>
  )
}

export default Produk
