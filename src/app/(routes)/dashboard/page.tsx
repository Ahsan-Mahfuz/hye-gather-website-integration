// 'use client'
// import Loader from '@/components/loading/ReactLoader'
// import EarningStatics from '@/components/vendorBusinessProfile/EarningStatics'
// import ProVendorPlan from '@/components/vendorBusinessProfile/ProVendorPlan'
// import VendorBusinessCard from '@/components/vendorBusinessProfile/VendorBusinessCard'
// import VendorBusinessInformation from '@/components/vendorBusinessProfile/VendorBusinessInformation'
// import { url } from '@/redux/main/server'
// import { useGetProfileDataQuery } from '@/redux/profileApis'

// const Dashboard = () => {
//   const { data: businessResponse, isLoading } = useGetProfileDataQuery()
//   console.log(businessResponse)
//   if (isLoading) return <Loader />

//   if (!businessResponse?.data || businessResponse.data.length === 0) {
//     return (
//       <p className="text-center text-2xl mt-2">No business data available</p>
//     )
//   }

//   const vendorBusinessData = {
//     id: businessResponse?.data?.business_profile?._id,
//     logo: businessResponse?.data?.business_profile?.logo,
//     // rating: businessResponse?.data?.business_profile?.rating,
//     businessName: businessResponse?.data?.business_profile?.name,
//     about: businessResponse?.data?.business_profile?.desc,
//     // reviews: businessResponse?.data.total_rated,
//     vendorType: businessResponse?.data?.use_type,
//     // services: businessResponse?.data.business_services,
//   }

//   // const vendorBusinessInfo = {
//   //   stats: [
//   //     {
//   //       id: 1,
//   //       label: 'New Booking Requests',
//   //       value: businessResponse?.data.new_booking_requests || 0,
//   //       icon: '/new-booking.svg',
//   //     },
//   //     {
//   //       id: 2,
//   //       label: 'Total Services',
//   //       value: businessResponse?.data.business_services
//   //         ? businessResponse.data.business_services.length
//   //         : 0,
//   //       icon: '/total-service.svg',
//   //     },
//   //     {
//   //       id: 3,
//   //       label: 'Total Bookings',
//   //       value: businessResponse?.data.total_booking || 0,
//   //       icon: '/total-booking.svg',
//   //     },
//   //     {
//   //       id: 4,
//   //       label: 'Total Ratings',
//   //       value: businessResponse?.data.total_rated || 0,
//   //       icon: '/total-rating.svg',
//   //     },
//   //     {
//   //       id: 5,
//   //       label: 'Total Earnings',
//   //       value: `$${businessResponse?.data.total_earnings || 0}`,
//   //       icon: '/total-earning.svg',
//   //     },
//   //   ],
//   // }

//   return (
//     <div className="responsive-width ">
//       <VendorBusinessCard {...vendorBusinessData} />
//       {/* <VendorBusinessInformation stats={vendorBusinessInfo.stats} /> */}
//       <EarningStatics />
//       <ProVendorPlan />
//     </div>
//   )
// }

// export default Dashboard

'use client'
import Loader from '@/components/loading/ReactLoader'
import EarningStatics from '@/components/vendorBusinessProfile/EarningStatics'
import ProVendorPlan from '@/components/vendorBusinessProfile/ProVendorPlan'
import VendorBusinessCard from '@/components/vendorBusinessProfile/VendorBusinessCard'
import VendorBusinessInformation from '@/components/vendorBusinessProfile/VendorBusinessInformation'
import { useGetProfileDataQuery } from '@/redux/profileApis'

const Dashboard = () => {
  const { data: businessResponse, isLoading } = useGetProfileDataQuery()

  if (isLoading) return <Loader />

  if (!businessResponse?.data) {
    return (
      <p className="text-center text-2xl mt-2">No business data available</p>
    )
  }

  const vendorBusinessInfo = {
    stats: [
      {
        id: 1,
        label: 'New Booking Requests',
        value: businessResponse?.data?.bookings[0]?.pending || 0,
        icon: '/new-booking.svg',
      },
      {
        id: 2,
        label: 'Total Services',
        value: businessResponse?.data?.total_service || 0,
        icon: '/total-service.svg',
      },
      {
        id: 3,
        label: 'Total Bookings',
        value: businessResponse?.data?.bookings[0]?.accepted || 0,
        icon: '/total-booking.svg',
      },
      // {
      //   id: 4,
      //   label: 'Total Ratings',
      //   value: businessResponse?.data.total_rated || 0,
      //   icon: '/total-rating.svg',
      // },
      {
        id: 5,
        label: 'Total Earnings',
        value: businessResponse?.data?.earnings || 0,
        icon: '/total-earning.svg',
      },
    ],
  }

  const vendorBusinessData = {
    id: businessResponse?.data?.business_profile?.[0]?._id,
    logo: businessResponse?.data?.business_profile?.[0]?.banner,
    businessName: businessResponse?.data?.business_profile?.[0]?.name,
    about: businessResponse?.data?.business_profile?.[0]?.desc,
    vendorType: businessResponse?.data?.use_type,
  }

  return (
    <div className="responsive-width">
      <VendorBusinessCard {...vendorBusinessData} />
      <VendorBusinessInformation stats={vendorBusinessInfo.stats} />
      <EarningStatics />
      <ProVendorPlan />
    </div>
  )
}

export default Dashboard
