import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { Button, Checkbox, DatePicker, Input, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Baseurl from '@/API/BaseUrl';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
const gradientColors2 = 'from-blue-600 via-blue-400 to-white-400';

const { Option } = Select;

const { Dragger } = Upload;


function EditDetailPromo() {
    const { id_promo } = useParams();
    const [editorData, setEditorData] = useState('');
    const [editorDataDesc, setEditorDataDesc] = useState('');
    const [editorDataTerm, setEditorDataTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [DataDetail, setDataDetail] = useState([])
    const [validStartDate, setValidStartDate] = useState(null);
    const [validEndDate, setValidEndDate] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [dataDetailCoupon, setDataDetailCoupon] = useState([])
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [dataOptions, setDataOptions] = useState({ platform: [], status: [], category: [] });
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    

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

      // Fungsi untuk memanggil API data alamat
      const GetDetailPromo = async () => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${Baseurl}backend/master/data-promo-detail?id_promo=${id_promo}`,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
    
        try {
          Swal.fire({
            title: 'Loading...',
            text: 'Please wait while we fetch the hotel details.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
    
          const response = await axios.request(config);
          const data = response?.data?.data;
          setDataDetail(data);

          // Set editor data for description and terms
            setEditorDataDesc(data.content_promo || '');
            setEditorDataTerm(data.term || '');

            
          // Pastikan data valid_start_date dan valid_end_date diubah menjadi objek moment
          setValidStartDate(data.valid_start_date ? moment(data.valid_start_date) : null);
          setValidEndDate(data.valid_end_date ? moment(data.valid_end_date) : null);
          console.log("ini detail", data);

           // Set the coupons data
           setCoupons(response?.data?.dataOptions?.coupon || []);
           setDataDetailCoupon(data.coupon || [])

            // Set dataOptions
            setDataOptions(response?.data?.dataOptions || { platform: [], status: [], category: [] });

            // Set selected platforms, status, and category based on the response
            if (data.platform) {
                setSelectedPlatforms([data.platform.toLowerCase()]);
            }
            if (data.status) {
                setSelectedStatus(data.status);
            }
            if (data.category) {
                setSelectedCategory(data.category);
            }
    
          setLoading(false);
          Swal.close();
        } catch (error) {
          setError(error);
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      };
    
      useEffect(() => {
        GetDetailPromo();
      }, [id_promo]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

      const handleChange = (value) => {
        setSelectedCoupons(value);
    };


     // Function to handle checkbox changes
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedPlatforms(prev => {
        if (prev.includes(value)) {
            return prev.filter(v => v !== value);
        } else {
            return [...prev, value];
        }
        });
    };

     // Function to handle status selection changes
    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };
        
    // Function to handle category selection changes
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

  return (
    <>    
    <div className='mt-14'>
    <div className='flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5'>
    <div className='w-full lg:w-2/3'>
        <Card>
            <CardHeader
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-2 p-6 text-center`}
            >
                <Typography variant="h6" color="white">
                    Edit dan Detail Promo
                </Typography>
            </CardHeader>
            <CardBody>
                <div className='w-full'>

                    <img src={DataDetail.img_featured} alt="" />

                </div>
                <div className='w-full mt-5'>
                    <label 
                        className="font-plus-jakarta-sans font-bold"
                        style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                    >
                        Title
                    </label>
                    <Input
                        type="text"
                        className="mt-2 mb-2  w-full"
                        name="nama_bahan"
                        value={DataDetail.title_promo}
                    />
                    <i>slug : {DataDetail.slug_promo}</i>
                </div>
               
                <div className='w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
                    <div className='w-full md:w-1/3'>
                        <label 
                            className="font-plus-jakarta-sans font-bold block md:inline-block"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Mulai
                        </label>
                        <DatePicker
                            className=' w-full mt-2'
                            value={validStartDate}
                            format="YYYY-MM-DD"
                            onChange={(date) => setValidStartDate(date)}
                        />
                    </div>
                    <div className='w-full md:w-1/3'>
                        <label 
                            className="font-plus-jakarta-sans font-bold block md:inline-block"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Berakhir
                        </label>
                        <DatePicker
                            className=' w-full mt-2'
                            value={validEndDate}
                            format="YYYY-MM-DD"
                            onChange={(date) => setValidEndDate(date)}
                        />
                    </div>
                    <div className='w-full md:w-1/3'>
                        <label
                            className="font-plus-jakarta-sans font-bold block md:inline-block"
                            style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }}
                        >
                            Kupon
                        </label>
                       
                        <Select
                            mode="multiple"
                            className='h-auto w-full mt-2'
                            onChange={handleChange}
                            value={dataDetailCoupon.map(coupon => coupon.id_coupon)}
                            
                        >
                            {coupons.map((coupon) => (
                                <Option key={coupon.id_coupon} value={coupon.id_coupon}>
                                    {coupon.coupon_name}
                                </Option>
                            ))}
                        </Select>
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
                            data={editorDataTerm}
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditorDataTerm(data);
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
                        Deskripsi
                    </label>
                    <div className='h-auto mt-2'>
                        <CKEditor 
                            editor={ClassicEditor}
                            data={editorDataDesc}
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditorDataDesc(data);
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
                            {dataOptions.platform.map((option) => (
                                <Checkbox
                                    key={option.value}
                                    value={option.value}
                                    className='text-lg'
                                    checked={selectedPlatforms.includes(option.value)}
                                    onChange={handleCheckboxChange}
                                >
                                    {option.name}
                                </Checkbox>
                            ))}
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
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            >
                            {dataOptions.status.map((option) => (
                                <Option key={option.value} value={option.value}>
                                {option.name}
                                </Option>
                            ))}
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
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            >
                            {dataOptions.category.map((option) => (
                                <Option key={option.id_promo_category} value={option.category_name}>
                                {option.category_name}
                                </Option>
                            ))}
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

export default EditDetailPromo
