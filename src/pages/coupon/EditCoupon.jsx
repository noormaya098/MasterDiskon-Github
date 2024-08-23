import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Checkbox, DatePicker, Input, Select, TimePicker } from 'antd';
import React from 'react'

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const { Option } = Select;

function EditCoupon() {
    const onChange = (time, timeString) => {
        console.log(time, timeString);
      };
    const onChange2 = (time2, timeString2) => {
        console.log(time2, timeString2);
      };

  return (
    <div className="mt-14 mb-4  ">
         <div>
            <Card className='mb-10 p-10 text-xl font-bold'>
                Edit Coupon
            </Card>
         </div>
      <div className='w-full'>
        <>
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-4 p-6 text-center`}
                >
                    <Typography variant="h6" color="white">
                        Edit Coupon
                    </Typography>
            </CardHeader>
            <CardBody>
                <div className="w-full flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="w-full sm:w-1/2">
                        <label 
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} 
                            className="font-plus-jakarta-sans font-bold"
                        >
                            Nama Voucer
                        </label>
                        <Input
                            type="text"
                            className="mt-2 mb-2 h-10 w-full"
                            name="nama_bahan"
                            placeholder='Tulis nama voucher'
                        />
                    </div>
                    <div className="w-full md:w-1/4">
                        <label 
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} 
                            className="font-plus-jakarta-sans font-bold"
                        >
                            Jenis
                        </label>
                        <Select
                            className="w-full mt-2 h-10" 
                            placeholder="Pilih Jenis"
                        >
                            <Option value="Potongan">Potongan</Option>
                            <Option value="Point">Point</Option>
                            <Option value="Fix Total">Fix Total</Option>
                        </Select> 
                    </div>
                    <div className="w-full md:w-1/4">
                        <label 
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} 
                            className="font-plus-jakarta-sans font-bold"
                        >
                            Produk
                        </label>
                        <Select
                            className="w-full mt-2 h-10" 
                            placeholder="Pilih Produk"
                        >
                            <Option value="Semua">Semua</Option>
                            <Option value="Spesifik">Spesifik</Option>
                            <Option value="Flight">Flight</Option>
                            <Option value="Trip">Trip</Option>
                            <Option value="Hotel">Hotel</Option>
                            <Option value="HotelPackage">HotelPackage</Option>
                            <Option value="Activities">Activities</Option>
                        </Select> 
                    </div>
                </div>

                <div className="w-full flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-[23%]">
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Nilai
                        </label>
                        <Select
                            className="w-full mt-2 h-10" 
                            placeholder="Pilih Nilai"
                        >
                            <Option value="Tetap">Tetap</Option>
                            <Option value="Persen">Persen</Option>
                        </Select>
                    </div>
                    <div className="w-full md:w-[25%]">
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Nilai potongan
                        </label>
                        <Input addonBefore="Point" size="large" className="mt-2" placeholder="Hanya Angka" />
                    </div>
                    <div className="w-full md:w-[26%]">
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Kuota Kupon
                        </label>
                        <Input addonAfter="lbr" size="large" className="mt-2" placeholder="Hanya Angka" />
                    </div>
                    <div className="w-full md:w-1/4">
                        <label 
                            className="font-plus-jakarta-sans font-bold"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Tidak dapat digabung
                        </label>
                        <Select
                            className="w-full mt-2 h-10" 
                            placehandleAddSearcher="Pilih"
                        >
                            <Option value="Tidak dapat digabungkan">Tidak dapat digabungkan</Option>
                            <Option value="Dapat digabungkan">Dapat digabungkan</Option>
                        </Select>
                    </div>
                </div>

                <div className="w-full flex flex-col space-y-6 mt-2 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-[23%]">
                    {/* Empty div for possible future content or spacing */}
                </div>
                <div className="w-full md:w-[24%]">
                    <label 
                        className="font-plus-jakarta-sans font-bold"
                        style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                    >
                        Mulai
                    </label>
                    <DatePicker size="large" className="mt-2 w-full" />
                </div>
                <div className="w-full md:w-1/4">
                    <label 
                        className="font-plus-jakarta-sans font-bold"
                        style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                    >
                        Hingga
                    </label>
                    <DatePicker size="large" className="mt-2 w-full" />
                </div>
                <div className="w-full md:w-1/4">
                    <label 
                        className="font-plus-jakarta-sans font-bold"
                        style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                    >
                        Jenis Voucher
                    </label>
                    <Select
                        className="w-full mt-2 h-10"
                        placeholder="Pilih"
                    >
                        <Option value="Kode Kupon Umum (Diketik)">Kode Kupon Umum (Diketik)</Option>
                        <Option value="Kode Kupon Umum (Klaim)">Kode Kupon Umum (Klaim)</Option>
                        <Option value="User Baru">User Baru</Option>
                        <Option value="Referral">Referral</Option>
                    </Select>
                </div>
            </div>


                <br />
                <div className='w-full'>
                    <div>
                        <h1 className='text-lg'>
                            Kupon Promo 
                            <span>
                                <Button className='ml-2 bg-blue-500 text-white'>
                                    Buat Kode Promo
                                </Button>
                            </span>
                        </h1>
                        <div className='mt-2'>
                            <Input.TextArea />
                        </div>
                        <i>
                            *pisahkan dengan koma
                        </i>
                    </div>
                    <br />
                    <div>
                        <h1 className='text-lg'>
                        Syarat dan Ketentuan
                            
                        </h1>
                        <div className='mt-2'>
                            <Input.TextArea />
                        </div>
                        
                    </div>
                </div>
            </CardBody>
        </Card>
        </>

        <>
            <div className='mt-14 mb-4 '>
                <Card>
                    <CardHeader
                        variant="gradient" 
                        className={`bg-gradient-to-b ${gradientColors} mb-4 p-6 text-center`}
                        >
                            <Typography variant="h6" color="white">
                                Data Lain
                            </Typography>
                    </CardHeader>
                    <CardBody>
                    <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-lg">
                                Pemberian Ke Cabang
                            </h1>
                            <Select
                                className="w-full mt-2 h-10" 
                                placeholder="Pilih Cabang"
                            >
                                <Option value="Semua">Semua</Option>
                                <Option value="PT MASTERDISKON TIKETING PUSAT">PT MASTERDISKON TIKETING PUSAT</Option>
                                <Option value="PT PENERBIT ERLANGGA ACEH">PT PENERBIT ERLANGGA ACEH</Option>
                                <Option value="PT PENERBIT ERLANGGA SURABAYA">PT PENERBIT ERLANGGA SURABAYA</Option>
                                <Option value="PT PENERBIT ERLANGGA CABANG MALANG RAYA">PT PENERBIT ERLANGGA CABANG MALANG RAYA</Option>
                            </Select>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-lg">
                                Berlaku di
                            </h1>
                            <Select
                                className="w-full mt-2 h-10" 
                                placeholder="Pilih Platform"
                            >
                                <Option value="Semua Platform">Semua Platform</Option>
                                <Option value="Website">Website</Option>
                                <Option value="Aplikasi">Aplikasi</Option>
                            </Select>
                        </div>
                    </div>

                    <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-lg">
                                Minimal Belanja
                            </h1>
                            <div className="w-full">
                                <Input
                                    size="large"
                                    placeholder="Tulis Minimum"
                                    className="w-full mt-2 h-10"
                                    addonBefore="Rp"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-lg">
                                Maksimal Belanja
                            </h1>
                            <div className="w-full">
                                <Input
                                    size="large"
                                    placeholder="Tulis Minimum"
                                    className="w-full mt-2 h-10"
                                    addonBefore="Rp"
                                />
                            </div>
                        </div>
                    </div>


                   
                    <br />
                    <div className='sm:w-1/2 w-full'>
                        <h1 className='text-lg'>
                            Jenis Potongan
                        </h1>
                        <Select
                            className="w-full sm:w-full mt-2 h-10" 
                            placeholder="Pilih Jenis Potongan"
                            >
                            <Option value="Total">Total</Option>
                            <Option value="Asuransi">Asuransi</Option>
                            <Option value="Produk">Produk</Option>
                            <Option value="Fee">Fee</Option>
                        
                        </Select> 
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-lg">
                                Berlaku Hari
                            </h1>
                            <p>
                                biarkan kosong jika berlaku setiap hari
                            </p>
                            <div className="flex flex-col space-y-2">
                                <Checkbox value="Senin" className='text-lg'>Senin</Checkbox>
                                <Checkbox value="Selasa" className='text-lg'>Selasa</Checkbox>
                                <Checkbox value="Rabu" className='text-lg'>Rabu</Checkbox>
                                <Checkbox value="Kamis" className='text-lg'>Kamis</Checkbox>
                                <Checkbox value="Jumat" className='text-lg'>Jumat</Checkbox>
                                <Checkbox value="Sabtu" className='text-lg'>Sabtu</Checkbox>
                                <Checkbox value="Minggu" className='text-lg'>Minggu</Checkbox>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <h1 className="text-lg">
                                Berlaku jam (dari - sampai)
                            </h1>
                            <p>
                                biarkan kosong jika berlaku setiap hari
                            </p>
                            <div className="mt-2 flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5 w-full">
                                <TimePicker onChange={onChange} className="border-2 border-blue-500 rounded-md p-2 w-full md:w-auto" />
                                <TimePicker onChange={onChange2} className="border-2 border-blue-500 rounded-md p-2 w-full md:w-auto" />
                            </div>
                        </div>
                    </div>

                   <br />
                   <hr />
                    <br />
                    <br />
                        <>
                        <div className='w-full'>
                            <Button className='w-full bg-blue-500 text-white text-lg h-12'>
                                SIMPAN VOUCHER
                            </Button>
                        </div>
                        </>
                </CardBody>
                </Card>
            </div>
        </>
      </div>


      
       
    </div>
  )
}

export default EditCoupon
