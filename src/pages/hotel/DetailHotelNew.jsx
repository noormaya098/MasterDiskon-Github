import Baseurl from '@/API/BaseUrl';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconHotel from "../../assets/IconHotel.png"
import pin from "../../assets/pin.png"
import { Button, Carousel, DatePicker, Image, Input, Upload } from 'antd';
import { LeftOutlined, RightOutlined,UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

function DetailHotelNew() {
    const { id_hotel } = useParams();
    const [DataDetail, setDataDetail] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    // const [previewImage, setPreviewImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
    // Fungsi untuk memanggil API data alamat
    const GetDetailHotel = async () => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${Baseurl}backend/master/data-hotel-detail?id_hotel=${id_hotel}`,
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
          setDataDetail(response?.data?.data);

          // Convert dataDetail.images (or equivalent) to fileList format
            const images = response?.data?.data?.image || [];
            const formattedFileList = images.map((url) => ({
                uid: url,
                name: url,
                status: 'done',
                url
            }));
            setFileList(formattedFileList);

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
        GetDetailHotel();
      }, [id_hotel]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      const StarRating = ({ rating }) => {
        return (
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`text-xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                {index < rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        );
      };
      

    //   const fileList = DataDetail?.image?.map((url, index) => ({
    //     uid: index.toString(), 
    //     name: `image${index}`,
    //     status: 'done', 
    //     url: url, 
    // })) || [];
      

  return (
    <div className="mt-12 mb-8 ">
        <Card>
            <CardHeader 
                variant="gradient" 
                className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
            >
                <Typography className='text-white font-bold text-lg' variant="h6" color="white">
                    Detail Hotel 
                    <p className='text-xl'>
                    {DataDetail.name}
                    </p>
                </Typography>
            </CardHeader>

            <CardBody className=" px-5 pt-0 pb-2">
                <div className='w-full flex space-x-5'>
                    <div className='w-1/2 '>
                        <div className='w-full flex space-x-5'>
                            <div className='w-1/3'>
                                <img src={IconHotel} alt="" className=' flex items-center justify-center h-full w-full' />
                            </div>
                            <div className='w-full p-2'>
                                <Input className="border-none text-xl font-bold text-blue-700" value={DataDetail.name}/>
                                <div className=' ml-2 mt-1 flex space-x-2 '>
                                    <div>
                                        <StarRating rating={DataDetail.starRating} /> 
                                    </div>
                                    <div className='flex justify-center items-center mt-1'>
                                        {DataDetail.reviewScore} Review
                                    </div>
                                </div>

                                <div className='w-full flex mt-2 space-x-2'>
                                    <div >
                                        <img src={pin} alt="" className='w-8 h-8'/>
                                    </div>
                                    <div>
                                        <Input
                                            className="border-none text-base"
                                            value={DataDetail.city}
                                        />
                                    </div>
                                </div>
                                <div>
                                        <Input
                                            className="border-none h-12 text-base truncate"
                                            value={DataDetail.address}
                                        />
                                    </div>
                            </div>
                        </div>

                        <h1 className='text-xl mt-2 font-bold'>
                            Spesifikasi Hotel
                        </h1>

                        <hr className='mb-2 mt-2'/>

                        <div className='w-full  flex space-x-2 mt-4'>
                        
                            <div className='w-1/2'>
                                <label>Price :</label>
                                <Input value={Number(DataDetail.price).toLocaleString('id-ID')} className='mt-2 h-12 text-lg'/>
                            </div>
                           
                            <div className='w-1/2'>
                                <label>Promo Price :</label>
                                <Input className='w-full mt-2 h-12  text-lg'  value={Number(DataDetail.promoPrice).toLocaleString('id-ID')} />
                            </div>
                        </div>

                        <div className='w-full  flex space-x-2 mt-4'>
                        
                            <div className='w-1/2'>
                                <label>Hotel Id :</label>
                                <Input value={DataDetail.hotelId_trav} className='mt-2 h-12 text-lg'/>
                            </div>
                            <div className='w-1/4'>
                                <label>Tipe :</label>
                                <Input value={DataDetail.propertyType} className='mt-2 h-12 text-lg'/>
                            </div>
                            <div className='w-1/4'>
                                <label>Created At :</label>
                                <Input className='w-full mt-2 h-12 disabled:text-black text-lg'  value={DataDetail.createdAt} disabled/>
                            </div>
                        </div>
                        
                        <div className='w-full  flex space-x-2 mt-2 h-12 mb-10'>
                            <div className='w-1/2'>
                                <label>Check-In :</label>
                                <Input value={DataDetail.checkInTime} className='mt-2 h-12 text-lg'/>
                            </div>
                            <div className='w-1/2'>
                                <label>Check-Out :</label>
                                <Input value={DataDetail.checkOutTime} className='mt-2 h-12 text-lg'/>
                            </div>
                            <div className='w-1/2'>
                                <label>Longitude :</label>
                                <Input type='number' value={DataDetail.longitude} className='mt-2 h-12 text-lg'/>
                            </div>
                            <div className='w-1/2'>
                                <label>Latitude :</label>
                                <Input type='number' value={DataDetail.latitude} className='mt-2 h-12 text-lg'/>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 '>
                        {DataDetail && DataDetail.image && (
                            <Carousel
                                arrows
                                autoplay
                            >
                            {DataDetail.image.map((imgUrl, index) => (
                                <div key={index}>
                                    <img src={imgUrl} alt={`Hotel Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                                </div>
                            ))}
                            </Carousel>
                        )}
                    </div>
                </div>

               
            </CardBody>
        </Card>

        


        <br />
        <Card >
            <CardBody>
            <h1 className='text-xl font-bold'>
                            Gambar Hotel
                        </h1>
                        <div className='w-full mt-2'>
                     <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                        />
                    )}
                    </div>`
            </CardBody>
        </Card>
       

        <br />
        <Card >
            <CardBody>
            <h1 className='text-xl font-bold'>
                            Deskripsi Hotel
                        </h1>
                <div className='w-full mt-2'>
                        <div className="mb-4">
                            <CKEditor
                            editor={ClassicEditor}
                            data={DataDetail.description}
                            config={{
                                toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                            }}
                           
                            />
                        </div>
                    </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default DetailHotelNew
