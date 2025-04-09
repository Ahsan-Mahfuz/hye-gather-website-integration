'use client'

import Loader from '@/components/loading/ReactLoader'
import MyBookingsCard from '@/components/myBookings/MyBookingsCard'
import BookingRequestVendor from '@/components/myBookingsVendor/BookingRequestVendor'
import MyBookingsCardVendor from '@/components/myBookingsVendor/MyBookingsCardVendor'
import VendorCalendar from '@/components/vendorTabs/VendorCalendar'
import { useGetBookingsQuery } from '@/redux/bookingsApis'
import { Button, Modal, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'

interface User {
  name: string
  email: string
  phone: string
  img: string
  _id: string
}
interface Vendor {
  name: string
  email: string
  phone: string
  img: string
  _id: string
}

interface Category {
  name: string
  img: string
  _id: string
}

interface Service {
  _id: string
  name: string
}

interface BookingData {
  _id: string
  user: User[]
  vendor: Vendor[]
  category: Category[]
  date: string
  time: string
  number_of_guests: string
  duration: string
  additional_services?: string
  additional_note?: string
  event_name: string
  status: string
  paid_to_vendor: boolean
  price: number
  location: string
  services: Service[]
  is_paid: boolean
  requested_by: string
}

const VendorBookings = () => {
  const [click, setClicked] = useState('USER')
  const [isClickCustomBooking, setIsClickCustomBooking] = useState(false)

  const { data: getAllBookings, isLoading, refetch } = useGetBookingsQuery()
  // const {
  //   data: getAllBookings,
  //   isLoading,
  //   refetch,
  // } = useGetBookingsQuery({
  //   requested_by: click,
  // })
  const [activeTab, setActiveTab] = useState('1')

  useEffect(() => {
    if (activeTab === '2') {
      setClicked('USER')
    } else if (activeTab === '3') {
      setClicked('VENDOR')
    }
    if (!getAllBookings) {
      refetch()
    }
  }, [activeTab, getAllBookings, refetch])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  if (isLoading) {
    return <Loader />
  }

  const getBookingsByStatus = (status: string) => {
    if (!getAllBookings?.data) return []


    return getAllBookings?.data?.filter((booking: BookingData) => {
      switch (status) {
        case 'ongoing':
          return booking.status === 'accepted'
        case 'requested':
          return booking.status === 'pending'
        case 'paymentRequest':
          return booking.status === 'pending'
        case 'completed':
          return booking.status === 'completed'
        case 'canceled':
          return booking.status === 'canceled'
        default:
          return false
      }
    })
  }
  const handleClickCustomBooking = () => {
    setIsClickCustomBooking(true)
  }
  const handleCancelCustomBooking = () => {
    setIsClickCustomBooking(false)
  }
  const tabItems = [
    {
      key: '1',
      label: 'Ongoing',
      children: (
        <div>
          <div className="text-lg font-semibold">Ongoing Activities</div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('ongoing').length > 0 ? (
              getBookingsByStatus('ongoing')?.map((booking: BookingData) => (
                <div key={booking._id} className="flex ">
                  <MyBookingsCardVendor booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No ongoing bookings found
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'User Requests',
      children: (
        <div>
          <div className="text-lg font-semibold">Booking Requests</div>
          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('requested').length > 0 ? (
              getBookingsByStatus('requested').map((booking: BookingData) => (
                <div key={booking._id}>
                  <MyBookingsCardVendor booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No booking requests found
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: <div>Your Request</div>,
      children: (
        <div>
          <div className="text-lg font-semibold">Bookings Awaiting Payment</div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('paymentRequest').length > 0 ? (
              getBookingsByStatus('paymentRequest').map(
                (booking: BookingData) => (
                  <div key={booking._id}>
                    <MyBookingsCardVendor booking={booking} />
                  </div>
                )
              )
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No payment pending bookings found
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Completed',
      children: (
        <div>
          <div className="text-lg font-semibold">Completed Bookings</div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('completed').length > 0 ? (
              getBookingsByStatus('completed').map((booking: BookingData) => (
                <div key={booking._id}>
                  <MyBookingsCardVendor booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No completed bookings found
              </div>
            )}
            <div />
          </div>
          <div />
        </div>
      ),
    },
    {
      key: '5',
      label: 'Canceled',
      children: (
        <div>
          <div className="text-lg font-semibold">Canceled Bookings</div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('canceled').length > 0 ? (
              getBookingsByStatus('canceled').map((booking: BookingData) => (
                <div key={booking._id}>
                  <MyBookingsCardVendor booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No canceled bookings found
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: '6',
      label: 'Create Bookings',
      children: (
        <div>
          <div className="text-lg font-semibold">Create a New Bookings</div>
          <div>
            <Button
              onClick={handleClickCustomBooking}
              className="py-32 px-10 transition-all mt-3"
            >
              <div>
                <div className="flex items-center flex-col gap-2 ">
                  <FiPlusCircle className="text-5xl" />
                  <span className="font-semibold ">Create Custom Booking</span>
                </div>
              </div>
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="responsive-width px-2 pt-5 bg-white rounded-lg  space-y-6 poppins pb-20">
      <VendorCalendar />

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        className="!border-b-0 poppins "
        items={tabItems}
      />

      <Modal
        title="Create Custom Booking"
        open={isClickCustomBooking}
        onCancel={handleCancelCustomBooking}
        footer={null}
        width={500}
        centered
      >
        <BookingRequestVendor onClose={handleCancelCustomBooking} />
      </Modal>
    </div>
  )
}

export default VendorBookings
