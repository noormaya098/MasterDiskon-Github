import Baseurl from '@/API/BaseUrl';
import Token from '@/API/Token';
import { Button, Input, Select } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const { Option } = Select;

function TambahDataAdmin({ handleOk }) {
    const [formData, setFormData] = useState({
        username: '',
        namalengkap: '',
        email: '',
        password: '',
        role: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleRoleChange = (value) => {
        setFormData({
          ...formData,
          role: value
        });
      };

      const resetForm = () => {
        setFormData({
          username: '',
          namalengkap: '',
          email: '',
          password: '',
          role: ''
        });
      };
    
      const handleSubmit = async () => {
        try {
          const data = JSON.stringify(formData);
          const response = await axios.post(`${Baseurl}backend/auth/register`, data, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Token}`
            }
          });
    
          console.log(JSON.stringify(response.data));
          Swal.fire('Success', 'Admin data has been successfully saved!', 'success');
          handleOk(); // Memanggil fungsi handleOk setelah sukses
          resetForm();
        } catch (error) {
          console.error('Error saving data:', error);
          if (error.response && error.response.data && error.response.data.status && error.response.data.status.error) {
            const errorMessage = error.response.data.errors.map(err => `${err.message}`).join(', ');
            Swal.fire('Error', errorMessage, 'error');
          } else {
            Swal.fire('Error', 'There was an error saving the admin data.', 'error');
          }
        }
      };
    
  return (
    <div>
    <div className='w-full'>
      <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Nama Lengkap :</label>
      <Input
        type="text"
        className="mt-2 mb-2"
        name="namalengkap"
        placeholder="Input Nama Lengkap"
        onChange={handleChange}
      />
    </div>
    <div className='w-full flex space-x-4'>
      <div className='w-1/2'>
        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Username :</label>
        <Input
          type="text"
          className="mt-2 mb-2"
          name="username"
          placeholder="Input Username"
          onChange={handleChange}
        />
      </div>
      <div className='w-1/2'>
        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Role :</label>
        <Select
          className="w-full mt-2"
          placeholder="Pilih opsi"
          onChange={handleRoleChange}
        >
          <Option value="admin">Admin</Option>
          <Option value="creator">Creator</Option>
          <Option value="finance">Finance</Option>
        </Select>
      </div>
    </div>
    <div className='w-full flex space-x-4'>
      <div className='w-1/2'>
        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Email :</label>
        <Input
          type="text"
          className="mt-2 mb-2"
          name="email"
          placeholder="Input Email"
          onChange={handleChange}
        />
      </div>
      <div className='w-1/2'>
        <label style={{ fontWeight: "bold", marginTop: '40px', marginRight: '10px' }} className="font-plus-jakarta-sans font-bold">Password :</label>
        <Input
          type="password"
          className="mt-2 mb-2"
          name="password"
          placeholder="Input Password"
          onChange={handleChange}
        />
      </div>
    </div>
    <br />
    <Button className='bg-blue-600 text-white w-full' onClick={handleSubmit}>
      Simpan 
    </Button>
  </div>
  )
}

export default TambahDataAdmin
