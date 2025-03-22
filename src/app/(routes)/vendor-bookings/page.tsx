// 'use client'

// import MyBookingsCard from '@/components/myBookings/MyBookingsCard'
// import VendorCalendar from '@/components/vendorTabs/VendorCalendar'
// import { Tabs } from 'antd'
// import { useState } from 'react'

// type Client = {
//   id: number
//   bookingType: string
//   image: string
//   name: string
//   email: string
//   phone: string
//   bookingFor: string
//   selectServices: string[]
//   eventName?: string
//   eventLocation?: string
//   eventTime?: string
//   numberOfGuests?: number
//   eventDuration?: string
//   additionalRequirements?: string
//   additionalNote?: string
//   amountPaid?: string
//   timeLeft?: string
// }[]

// const Clients: Client = [
//   {
//     id: 1,
//     bookingType: 'ongoing',
//     image: '/entertainment.jpg',
//     name: 'Ahsan Mahfuz',
//     email: 'YlYHw@example.com',
//     phone: '+27 55745 2567 125',
//     bookingFor: 'weeding',
//     selectServices: ['Music', 'Dance', 'Party'],

//     eventName: 'Weeding Party',
//     eventLocation: 'New York',
//     eventTime: '10:00 AM',
//     numberOfGuests: 100,
//     eventDuration: '2 hours',
//     additionalRequirements:
//       'I need a special stage for the performers. Please arrange that.',
//     additionalNote: 'Please make sure to bring your own food and drinks.',
//     amountPaid: '',
//     timeLeft: '2 day 14 hours 45 minutes',
//   },
//   {
//     id: 2,
//     bookingType: 'requested',
//     image: '/dJs.jpg',
//     name: 'Jasmine Lawrence',
//     email: 'example@example.com',
//     phone: '+1 234 567 890',
//     bookingFor: 'corporate event',
//     selectServices: ['Music', 'DJ', 'Sound System'],

//     eventName: 'Corporate Event',
//     eventLocation: 'Los Angeles',
//     eventTime: '1:00 PM',
//     numberOfGuests: 50,
//     eventDuration: '3 hours',
//     additionalRequirements:
//       'I need a special stage for the performers. Please arrange that.',
//     additionalNote: 'Please make sure to bring your own food and drinks.',
//     amountPaid: '',
//     timeLeft: '',
//   },
//   {
//     id: 3,
//     bookingType: 'paymentRequest',
//     image: '/bar.jpg',
//     name: 'Michael Smith',
//     email: 'example@example.com',
//     phone: '+1 234 567 891',
//     bookingFor: 'birthday party',
//     selectServices: ['Drinks', 'Bartending', 'Cocktails'],

//     eventName: 'Birthday Party',
//     eventLocation: 'San Francisco',
//     eventTime: '8:00 PM',
//     numberOfGuests: 150,
//     eventDuration: '4 hours',
//     additionalRequirements:
//       'I need a special stage for the performers. Please arrange that.',
//     additionalNote: 'Please make sure to bring your own food and drinks.',
//     amountPaid: '$500',
//     timeLeft: '',
//   },
//   {
//     id: 4,
//     bookingType: 'completed',
//     image: '/food.jpg',
//     name: 'Sophia Brown',
//     email: 'example@example.com',
//     phone: '+1 234 567 892',
//     bookingFor: 'wedding',
//     selectServices: ['Catering', 'Desserts', 'Buffet'],

//     eventName: 'Wedding Reception',
//     eventLocation: 'New York',
//     eventTime: '12:00 PM',
//     numberOfGuests: 200,
//     eventDuration: '6 hours',
//     additionalRequirements:
//       'I need a special stage for the performers. Please arrange that.',
//     additionalNote: 'Please make sure to bring your own food and drinks.',
//     amountPaid: '$1000',
//     timeLeft: '',
//   },

//   {
//     id: 5,
//     bookingType: 'canceled',
//     image: '/photography.jpg',
//     name: 'Liam Johnson',
//     email: 'example@example.com',
//     phone: '+1 234 567 893',
//     bookingFor: 'concert',
//     selectServices: ['Photography', 'Videography', 'Editing'],

//     eventName: 'Concert',
//     eventLocation: 'Los Angeles',
//     eventTime: '6:00 PM',
//     numberOfGuests: 100,
//     eventDuration: '3 hours',
//     additionalRequirements:
//       'I need a special stage for the performers. Please arrange that.',
//     additionalNote: 'Please make sure to bring your own food and drinks.',
//     amountPaid: '',
//     timeLeft: '',
//   },
// ]

// const VendorBookings = () => {
//   const [activeTab, setActiveTab] = useState('1')

//   const handleTabChange = (key: string) => {
//     setActiveTab(key)
//   }

//   const tabItems = [
//     {
//       key: '1',
//       label: 'Ongoing',
//       children: (
//         <div>
//           <div className="text-lg font-semibold ">Your Ongoing Activities</div>
//           {Clients.map(
//             (client, index) =>
//               client.bookingType === 'ongoing' && (
//                 <div key={index}>
//                   <MyBookingsCard {...client} />
//                 </div>
//               )
//           )}
//         </div>
//       ),
//     },
//     {
//       key: '2',
//       label: 'Requests',
//       children: (
//         <div>
//           <div className="text-lg font-semibold ">Your Ongoing Activities</div>
//           {Clients.map(
//             (client, index) =>
//               client.bookingType === 'requested' && (
//                 <div key={index}>
//                   <MyBookingsCard {...client} />
//                 </div>
//               )
//           )}
//         </div>
//       ),
//     },
//     {
//       key: '3',
//       label: <div className="text-red-700">Payment Request</div>,
//       children: (
//         <div>
//           <div className="text-lg font-semibold ">Your Ongoing Activities</div>
//           {Clients.map(
//             (client, index) =>
//               client.bookingType === 'paymentRequest' && (
//                 <div key={index}>
//                   <MyBookingsCard {...client} />
//                 </div>
//               )
//           )}
//         </div>
//       ),
//     },
//     {
//       key: '4',
//       label: 'Completed',
//       children: (
//         <div>
//           <div className="text-lg font-semibold ">Your Ongoing Activities</div>
//           {Clients.map(
//             (client, index) =>
//               client.bookingType === 'completed' && (
//                 <div key={index}>
//                   <MyBookingsCard {...client} />
//                 </div>
//               )
//           )}
//         </div>
//       ),
//     },
//     {
//       key: '5',
//       label: 'Canceled',
//       children: (
//         <div>
//           <div className="text-lg font-semibold ">Your Ongoing Activities</div>
//           {Clients.map(
//             (client, index) =>
//               client.bookingType === 'canceled' && (
//                 <div key={index}>
//                   <MyBookingsCard {...client} />
//                 </div>
//               )
//           )}
//         </div>
//       ),
//     },
//   ]

//   return (
//     <div className="responsive-width px-2 pt-5 bg-white rounded-lg  space-y-6 poppins pb-20">
//       <VendorCalendar />

//       <Tabs
//         activeKey={activeTab}
//         onChange={handleTabChange}
//         className="!border-b-0 poppins "
//         items={tabItems}
//       />
//     </div>
//   )
// }

// export default VendorBookings

'use client'

import Loader from '@/components/loading/ReactLoader'
import MyBookingsCard from '@/components/myBookings/MyBookingsCard'
import MyBookingsCardVendor from '@/components/myBookingsVendor/MyBookingsCardVendor'
import VendorCalendar from '@/components/vendorTabs/VendorCalendar'
import { useGetBookingsQuery } from '@/redux/bookingsApis'
import { Tabs } from 'antd'
import { useState } from 'react'

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
  event_name: string
  status: string
  paid_to_vendor: boolean
  price: number
  location: string
  services: Service[]
  is_paid: boolean
}

const VendorBookings = () => {
  const { data: getAllBookings, isLoading } = useGetBookingsQuery()
  const [activeTab, setActiveTab] = useState('1')

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
          return booking.status === 'pending' && !booking.is_paid
        case 'completed':
          return booking.status === 'completed'
        case 'canceled':
          return booking.status === 'canceled'
        default:
          return false
      }
    })
  }

  const tabItems = [
    {
      key: '1',
      label: 'Ongoing',
      children: (
        <div>
          <div className="text-lg font-semibold">Your Ongoing Activities</div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('ongoing').length > 0 ? (
              getBookingsByStatus('ongoing').map((booking: BookingData) => (
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
      label: 'Requests',
      children: (
        <div>
          <div className="text-lg font-semibold">Your Booking Requests</div>
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
      label: <div className="text-red-700">Payment Pending</div>,
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
          <div className="text-lg font-semibold">Your Completed Bookings</div>

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
          <div className="text-lg font-semibold">Your Canceled Bookings</div>

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
    </div>
  )
}

export default VendorBookings
