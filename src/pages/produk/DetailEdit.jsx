import { Button, Col, Input, Row } from 'antd'
import React from 'react'

function DetailEdit() {
  return (
    <div>
        <Row gutter={[16,16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
         <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Produk :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="nama_bahan"
            placeholder="Input Nama Bahan yang dibutuhkan"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
         <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Stock :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="nama_bahan"
            placeholder="Input Nama Bahan yang dibutuhkan"
          />
        </Col>
       </Row>
        <Row gutter={[16,16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
         <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Satuan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="nama_bahan"
            placeholder="Input Nama Bahan yang dibutuhkan"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
         <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Satuan :</label>
          {/* Menghubungkan input tarif dengan state tarif */}
          <Input
            type="text"
            className="mt-2 mb-2"
            name="nama_bahan"
            placeholder="Input Nama Bahan yang dibutuhkan"
          />
        </Col>
       </Row>
       <div className='sm:w-full flex justify-end items-end mt-5'>
        <Button className='bg-blue-500 text-white'>
            Simpan
        </Button>
        </div>
    </div>
  )
}

export default DetailEdit
