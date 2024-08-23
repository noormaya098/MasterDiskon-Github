import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Input, Select, Tag, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';
import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';
import axios from 'axios';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white';
const gradientColors3 = 'from-red-600 via-red-400 to-pink-300';
const gradientColors4 = 'from-green-800 via-green-600 to-green-400';
const { Option } = Select;

function DetailEditUser() {
    const location = useLocation();
    const { userDetail } = location.state || {};
    

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

    // Daftar opsi negara, provinsi, dan kota yang dapat diisi
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(userDetail?.address?.country || '');
    const [selectedProvince, setSelectedProvince] = useState(userDetail?.address?.province || '');
    const [selectedCity, setSelectedCity] = useState(userDetail?.address?.city || '');

    const GetSelect = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${Baseurl}backend/master/data-select?id_province=`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setCountries(response.data.data.country);
          setProvinces(response.data.data.province);
          setCities(response.data.data.city);
      } catch (error) {
          console.error('Error fetching data:', error);
          Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
      }
  };
  
      useEffect(() => {
      GetSelect();
    }, []);

    const handleCountryChange = (value) => {
      setSelectedCountry(value);
      // Filter provinces based on the selected country
      // Assuming you have an API endpoint for provinces based on the country
    };
  
    const handleProvinceChange = (value) => {
      setSelectedProvince(value);
      // Filter cities based on the selected province
      // Assuming you have an API endpoint for cities based on the province
    };
  
    const handleCityChange = (value) => {
      setSelectedCity(value);
    };

    const provincess = [
      { code: '31', name: 'DKI Jakarta' },
      // Tambahkan opsi provinsi lain jika perlu
    ];

    const citiess = [
      { code: '3172', name: 'Jakarta Timur' },
      // Tambahkan opsi kota lain jika perlu
    ];

  return (
    <div className="mt-10 mb-8 ">
         <div>
            <Card className='mb-10 p-10 text-xl font-bold'>
                Detail User Corporate
            </Card>
         </div>
     {/* <>
     <Card>
        <CardBody className="px-5 pt-0 pb-2 mb-5">
           
        </CardBody>
     </Card>
     </> */}

        <>
        <div className='mt-12 mb-8'>
            <Card>
            <CardHeader
                variant="gradient"
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography variant="h6" color="white">
                DATA CORPORATE
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2 mb-5">
                <div className='w-full flex flex-col md:flex-row md:justify-between'>
                <div className='w-full md:w-1/2'>
                    <p className='text-lg'>Akun ini belum terverifikasi</p>
                    <Button className='bg-blue-500 text-white mt-2 text-lg h-10 w-full sm:w-1/3'>
                    VERIFIKASI AKUN 
                    </Button>
                </div>
                <div className='w-full sm:w-1/2 flex justify-end space-x-5 mt-6 sm:mt-10'>
                    <Button className={`bg-gradient-to-b ${gradientColors3} text-white text-lg h-10 font-bold sm:w-1/4 w-full`}>
                    KODE UNIK
                    </Button>
                    <Button className={`bg-gradient-to-b ${gradientColors2} text-white text-lg h-10 sm:w-1/4 w-full`}>
                    Ganti Password
                    </Button>
                </div>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
                <div className='w-full'>
                    <label className='font-bold text-base'>Nama Perusahaan</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' value={userDetail.company_name} />
                </div>
                <div className='w-full'>
                    <label className='font-bold text-base'>Industri</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' value={userDetail.industry_type} />
                </div>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                <div className='w-full'>
                    <label className='font-bold text-base'>Email</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' value={userDetail.email}  />
                </div>
                <div className='w-full'>
                    <label className='font-bold text-base'>Telpon</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' value={userDetail.phone}  />
                </div>
                <div className='w-full'>
                    <label className='font-bold text-base'>Website</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' value={userDetail.website}  />
                </div>
                </div>

                <div className='w-full mt-2'>
                <label className='font-bold text-base'>Alamat</label>
                <Input.TextArea className='w-full border border-gray-300 rounded-md p-2 mt-2 h-36' type='text' value={userDetail.address.alamatLengkap}  />
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                <div className='w-full'>
                                <label className='font-bold text-base'>Negara</label>
                                 <Select
                                    className="w-full mt-2 h-10"
                                    value={selectedCountry}
                                    placeholder="Pilih opsi"
                                    onChange={(value) => setSelectedCountry(value)}
                                  >
                                    {countries.map((country) => (
                                      <Option key={country.id_country} value={country.code}>
                                        {country.country_name}
                                      </Option>
                                    ))}
                                  </Select>
                            </div>
                            <div className='w-full'>
                                <label className='font-bold text-base'>Provinsi</label>
                                <Select
                                    className="w-full mt-2 h-10"
                                    value={selectedProvince}
                                    placeholder="Pilih opsi"
                                    onChange={handleProvinceChange}
                                  >
                                    {provinces.map((province) => (
                                      <Option key={province.id_province} value={province.code}>
                                        {province.province_name}
                                      </Option>
                                    ))}
                                  </Select>
                            </div>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                      <div className='w-full'>
                                <label className='font-bold text-base'>Kota</label>
                                <Select
                                    className="w-full mt-2 h-10"
                                    value={selectedCity}
                                    placeholder="Pilih opsi"
                                    onChange={handleCityChange}
                                  >
                                    {cities.map((city) => (
                                      <Option key={city.id_city} value={city.code}>
                                        {city.city_name}
                                      </Option>
                                    ))}
                                  </Select>
                            </div>
                            <div className='w-full'>
                                <label className='font-bold text-base'>Kode Pos</label>
                                <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Kode Pos' value={userDetail.address.zipcode} />
                            </div>
                </div>
            </CardBody>
            </Card>
        </div>
        </>

        <>
        <div className='mt-14 mb-8'>
            <Card>
            <CardHeader
                variant="gradient"
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography variant="h6" color="white">
                DATA PIC
                </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2 mb-5">
                <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-4 mt-2'>
                {/* <div className='sm:col-span-1'>
                    <label className='font-bold text-base'>Title</label>
                    <Select
                    className="w-full mt-2 h-10"
                    placeholder="Pilih opsi"
                    >
                    <Option value="Mr">Mr</Option>
                    <Option value="Mrs">Mrs</Option>
                    <Option value="Ms">Ms</Option>
                    </Select>
                </div> */}
                <div className='sm:col-span-2'>
                    <label className='font-bold text-base'>First Name</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='First Name' value={userDetail.pic.first} />
                </div>
                <div className='md:col-span-2'>
                    <label className='font-bold text-base'>Last Name</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Last Name' value={userDetail.pic.last} />
                </div>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                <div className='col-span-1 md:col-span-1'>
                    <label className='font-bold text-base'>Position</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='Position' value={userDetail.pic.position} />
                </div>
                <div className='col-span-1 md:col-span-1'>
                    <label className='font-bold text-base'>PIC Phone</label>
                    <Input className='w-full border border-gray-300 rounded-md p-2 mt-2' type='text' placeholder='PIC Phone' value={userDetail.pic.pic_phone} />
                </div>
                </div>
            </CardBody>
            </Card>
        </div>
        </>


        <>
  <div className='mt-14 mb-8 flex flex-wrap -mx-4'>
    <div className='w-full md:w-1/2 px-4'>
      <Card>
        <CardHeader
          variant="gradient"
          className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
        >
          <Typography variant="h6" color="white">
            PLAFON
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2 mt-10">
          <div className={`bg-gradient-to-b ${gradientColors4} mb-8 p-6 text-white`}>
            <div className='p-5 ml-4'>
              <div className='text-base font-medium'>
                Sisa Saldo
              </div>
              <p className='text-3xl font-bold'>
              {userDetail.sisa_saldo}
              </p>
            </div>
          </div>
          <div className='p-5 ml-4 flex mb-5'>
            <div className='w-1/2 text-base font-bold'>
              Status 
               <Tag className='ml-2' color={userDetail.status === 'Aktif' ? 'green' : 'Tidak Aktif'}>
                 {userDetail.status}
              </Tag>
            </div>
            {/* <div className='w-1/2 flex justify-end'>
              <Button className='bg-red-400 text-white font-bold'>
                X Reject
              </Button>
            </div> */}
          </div>
          <div className='p-5 ml-4'>
            <label className='text-base font-bold'>Plafon</label>
            <Input type='number' className='mt-2 h-10' value={userDetail.plafon}/>
          </div>
        </CardBody>
      </Card>
    </div>
    {/* <div className='w-full md:w-1/2 px-4'>
      <Card className='h-full'>
        <CardHeader
          variant="gradient"
          className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
        >
          <Typography variant="h6" color="white">
            FOTO PROFIL & DOCUMENT
          </Typography>
        </CardHeader>
        <CardBody className="px-5 pt-0 pb-2 mb-5">
          <div className="flex w-full justify-center">
            <Upload
              name='avatar'
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={handleUpload}
              onRemove={handleRemove}
            >
              <Button icon={<UploadOutlined />} className="w-full h-full">Upload</Button>
            </Upload>
          </div>
          <hr className='mt-10 mb-8' />
          <Card>
            <CardHeader
              variant="gradient"
              className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
              <Typography variant="h6" color="white">
                DOCUMENT
              </Typography>
            </CardHeader>
            <CardBody className="px-5 pt-0 pb-2 mb-5">
              <div className='w-full flex space-y-4 md:space-y-0 md:space-x-4'>
              <div className='w-full flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
                <div className='w-full md:w-1/2'>
                    <div className='bg-gray-500 text-center flex justify-center items-center rounded-md text-white w-full h-10' >
                         AKTA PENDIRIAN
                    </div>
                    <div className='bg-gray-500 text-center flex justify-center items-center rounded-md text-white w-full h-10 mt-2 md:mt-4' >
                        NPWP
                    </div>
                </div>
                <div className='w-full md:w-1/2'>
                    <div className='bg-gray-500 text-center flex justify-center items-center rounded-md text-white w-full h-10' >
                        SKT PAJAK
                    </div>
                    <div className='bg-gray-500 text-center flex justify-center items-center rounded-md text-white w-full h-10 mt-2 md:mt-4' >
                        NIB
                    </div>
                </div>
                </div>

              </div>
              <div className='bg-gray-500 text-center flex justify-center items-center rounded-md text-white w-full h-10 mt-2' >
                MOU
              </div>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div> */}
  </div>
  <div className='w-full'>
    <Button className='h-12 w-full bg-blue-500 text-white font-bold'>
      SIMPAN DATA
    </Button>
  </div>
</>

    </div>
  )
}

export default DetailEditUser
