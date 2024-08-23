import { Button, Col, Input, Row } from 'antd'

import React from 'react'

function TambahProduk() {
  return (
    <div>
        <Row gutter={[16,16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Produk :</label>
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
            <Col xs={24} sm={24} md={24} lg={24}>
            <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Stock Masuk :</label>
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
            <Col xs={24} sm={24} md={24} lg={24}>
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
        <Row gutter={[16,16]} className=' flex justify-end items-end mt-2'>
            <Col xs={24} sm={24} md={24} lg={24}>
                <Button className='bg-blue-600 text-white w-full'>
                    Simpan 
                </Button>
            </Col>
        </Row>
</div>
  )
}

export default TambahProduk
