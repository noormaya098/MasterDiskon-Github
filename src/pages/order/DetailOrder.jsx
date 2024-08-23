import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Button, Select, Tag } from 'antd';
import React from 'react';

const { Option } = Select;

const gradientColors = 'from-orange-600 via-orange-400 to-yellow-400';
  const gradientColors2 = 'from-[#3f6ad8] via-blue-500 to-blue-400';
  const gradientColors3 = 'from-[#16aaff] via-blue-400 to-blue-300';

function DetailOrder({ orderDetail }) {
  if (!orderDetail) {
    return <div>Tidak ada detail order.</div>;
  }

  console.log(orderDetail, "ini detail");

  return (
    <div className="mt-12 mb-8">
  <Card className='mb-10 p-10 text-xl font-bold'>
    Detail Order
  </Card>
  <div className='flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6'>
    <div className='w-full md:w-2/3'>
      <Card>
        <CardHeader
          variant="gradient"
          className={`bg-gradient-to-b ${gradientColors} mb-8 p-6 text-center`}
        >
          <Typography variant="h6" color="white">
            Detail Order
          </Typography>
        </CardHeader>
        <CardBody className="px-5 pt-0 pb-2">
          <h3>
            Order #{orderDetail.order_code}
            <span className='ml-2'>
              {/* <Tag color='#3f6ad8'>
                Corporate
              </Tag> */}
              <Tag color='#16aaff'>
              {orderDetail.status.name}
              </Tag>
            </span>
          </h3>
          <br />
          <div className="mb-4 w-full mt-4 overflow-auto">
            <div>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border-t border-b px-4 py-2">Title</th>
                    <th className="border-t border-b px-4 py-2">First Name</th>
                    <th className="border-t border-b px-4 py-2">Last Name</th>
                    <th className="border-t border-b px-4 py-2">Phone</th>
                    <th className="border-t border-b px-4 py-2">Email</th>
                    <th className="border-t border-b px-4 py-2">Corporate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-t border-b text-center px-4 py-2"> {orderDetail?.guest?.pic?.title}</td>
                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.first_name}</td>
                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.last_name}</td>
                    <td className="border-t border-b text-center px-4 py-2">+{orderDetail?.guest?.pic?.phone_code} {orderDetail?.guest?.pic?.phone_number}</td>
                    <td className="border-t border-b text-center px-4 py-2">{orderDetail?.guest?.pic?.email}</td>
                    <td className="border-t border-b text-center px-4 py-2 w-12">{orderDetail?.guest?.pic?.corporate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <h1 className='font-bold text-xl'>Produk</h1>
          <div className="mb-4 w-full mt-4 overflow-auto">
            <div>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border-t border-b px-4 py-2">No.</th>
                    <th className="border-t border-b px-4 py-2">Product Name</th>
                    {/* <th className="border-t border-b px-4 py-2">Description</th> */}
                    <th className="border-t border-b px-4 py-2">Qty</th>
                    <th className="border-t border-b px-4 py-2">Unit</th>
                    <th className="border-t border-b px-4 py-2">Price</th>
                    {/* <th className="border-t border-b px-4 py-2">Pajak</th> */}
                    {/* <th className="border-t border-b px-4 py-2">Amount</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-t border-b text-center px-4 py-2">1.</td>
                    <td className="border-t border-b px-4 py-2">{orderDetail.productType}</td>
                    {/* <td className="border-t border-b px-4 py-2">
                    
                    </td> */}
                    <td className="border-t border-b text-center px-4 py-2">{orderDetail.pax}</td>
                    <td className="border-t border-b text-center px-4 py-2">Pax</td>
                    <td className="border-t border-b text-center px-4 py-2">{orderDetail.subtotalPrice}</td>
                    {/* <td className="border-t border-b text-center px-4 py-2">1.1</td> */}
                    {/* <td className="border-t border-b text-center px-4 py-2">968.300</td> */}
                  </tr>
                  <tr>
                    <td colSpan={4} className='border-t border-b text-end px-4 py-2'>SUBTOTAL</td>
                    <td colSpan={5} className='border-t border-b text-end px-4 py-2'>{orderDetail.subtotalPrice}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className='border-t border-b text-end px-4 py-2'>TAX</td>
                    <td colSpan={5} className='border-t border-b text-end px-4 py-2'>{orderDetail.tax}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className='border-t border-b text-end px-4 py-2'>DISCOUNT</td>
                    <td colSpan={5} className='border-t border-b text-end px-4 py-2'>{orderDetail.promo}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className='border-t border-b text-end px-4 py-2'>POINT</td>
                    <td colSpan={5} className='border-t border-b text-end px-4 py-2'>{orderDetail.point}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className='border-t text-end px-4 py-2'>GRAND TOTAL</td>
                    <td colSpan={5} className='border-t text-end px-4 py-2'>{orderDetail.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <div className='w-full md:w-1/3'>
      <div className='bg-[#3f6ad8] rounded-lg'>
        <div className='p-8'>
          <div className='text-white mt-2 mb-2'>
            <p className='text-lg'>
              Total
            </p>
            <p className='text-3xl font-semibold'>
            Rp. {Number(orderDetail.totalPrice).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className='w-full'>
        <Button className='w-full h-14 bg-[#3f6ad8] text-white font-semibold text-lg'>
          CREATE INVOICE
        </Button>
      </div>
      <br />
      <div className='w-full space-x-3 flex'>
        <Button className='w-1/2 h-12 bg-[#3ac47d] text-white font-semibold text-lg'>
          EDIT ORDER
        </Button>
        <Button className='w-1/2 h-12 bg-[#3ac47d] text-white font-semibold text-lg'>
          PRINT
        </Button>
      </div>
      <br />
      <Card>
        <CardBody className="px-5 pt-0 pb-2">
          <table className="w-full table-auto mt-5">
            <tbody>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  Vendor Code
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                  {orderDetail.code_product}
                </td>
              </tr>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  Sales
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                  {orderDetail.sales}
                </td>
              </tr>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  Date Created
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                  {orderDetail.tgl_input}
                </td>
              </tr>
              <tr>
                <td className='border-t text-start px-4 py-2'>
                  From
                </td>
                <td className='border-t text-end px-4 py-2'>
                  {orderDetail.tgl_awal}
                </td>
              </tr>
              <tr>
                <td className='border-t text-start px-4 py-2'>
                  To
                </td>
                <td className='border-t text-end px-4 py-2'>
                  {orderDetail.tgl_akhir}
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody className="px-5 pt-0 pb-2">
          <h1 className='mt-4 text-2xl mb-2'>Ubah Status Order</h1>
          <div className='w-full flex flex-col md:flex-row justify-center'>
            <div className='w-full md:w-2/3'>
              <Select
                className="w-full h-10"
                placeholder="Pilih Status"
                value={orderDetail.status.name}
              >
                <Option value="All">All</Option>
                <Option value="New Order">New Order</Option>
                <Option value="Issued">Issued</Option>
              </Select>
            </div>
            <div className='w-full sm:w-1/3 flex sm:justify-end mt-2 md:mt-0'>
              <Button className='bg-[#3f6ad8] h-10 text-white font-semibold sm:w-1/2 w-full'>
                UBAH
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody className="px-5 pt-0 pb-2">
          <h1 className='mt-4 text-2xl mb-2'>Pembayaran</h1>
          <table className="w-full table-auto mt-5">
            <tbody>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  Metode
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                {orderDetail.metode_pembayaran}
                </td>
              </tr>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  Exp
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                {orderDetail.tgl_JatuhTempo}
                </td>
              </tr>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  Payment
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                  {orderDetail.payment}
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody className="px-5 pt-0 pb-2">
          <h1 className='mt-4 text-2xl mb-2'>History</h1>
          <table className="w-full table-auto mt-5">
            <tbody>
              <tr>
                <td className='border-t border-b text-start px-4 py-2'>
                  {/* Issued */}
                </td>
                <td className='border-t border-b text-end px-4 py-2'>
                  {/* 2024-05-17 15:05:54 */}
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  </div>
</div>

  );
}

export default DetailOrder;
