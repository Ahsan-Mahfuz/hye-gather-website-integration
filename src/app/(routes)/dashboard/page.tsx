'use client'
import Loader from '@/components/loading/ReactLoader'
import EarningStatics from '@/components/vendorBusinessProfile/EarningStatics'
import ProVendorPlan from '@/components/vendorBusinessProfile/ProVendorPlan'
import VendorBusinessCard from '@/components/vendorBusinessProfile/VendorBusinessCard'
import VendorBusinessInformation from '@/components/vendorBusinessProfile/VendorBusinessInformation'
import { useGetBusinessDataQuery } from '@/redux/businessApis'

const Dashboard = () => {
  const {
    data: businessResponse,
    isLoading,
    isError,
  } = useGetBusinessDataQuery({
    vendor_type: 'PREMIUM',
  })

  if (isLoading) return <Loader />
  if (isError) return <p>Error loading business data</p>

  if (!businessResponse?.data || businessResponse.data.length === 0) {
    return <p>No business data available</p>
  }

  const vendorBusinessData = {
    id: businessResponse?.data[0]._id,
    logo: businessResponse?.data[0].user_details.img,
    rating: businessResponse?.data[0].rating,
    businessName: businessResponse?.data[0].user_details.name,
    about: '',
    startPrice: businessResponse?.data[0].price,
    reviews: businessResponse?.data[0].total_rated,
    vendorType: businessResponse?.data[0].vendor_type,
    services: businessResponse?.data[0].business_services,
  }

  const vendorBusinessInfo = {
    stats: [
      {
        id: 1,
        label: 'New Booking Requests',
        value: businessResponse.data[0].new_booking_requests || 0,
        icon: '/new-booking.svg',
      },
      {
        id: 2,
        label: 'Total Services',
        value: businessResponse.data[0].business_services
          ? businessResponse.data[0].business_services.length
          : 0,
        icon: '/total-service.svg',
      },
      {
        id: 3,
        label: 'Total Bookings',
        value: businessResponse.data[0].total_booking || 0,
        icon: '/total-booking.svg',
      },
      {
        id: 4,
        label: 'Total Ratings',
        value: businessResponse.data[0].total_rated || 0,
        icon: '/total-rating.svg',
      },
      {
        id: 5,
        label: 'Total Earnings',
        value: `$${businessResponse.data[0].total_earnings || 0}`,
        icon: '/total-earning.svg',
      },
    ],
  }

  return (
    <div className="responsive-width ">
      <VendorBusinessCard {...vendorBusinessData} />
      <VendorBusinessInformation stats={vendorBusinessInfo.stats} />
      <EarningStatics />
      <ProVendorPlan />
    </div>
  )
}

export default Dashboard
