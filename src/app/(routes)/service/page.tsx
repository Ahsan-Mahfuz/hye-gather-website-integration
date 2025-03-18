import ServiceCard from '@/components/businessService/ServiceCard'
import { useGetProfileDataQuery } from '@/redux/profileApis'

const page = () => {
  const { data: profileData, isLoading } = useGetProfileDataQuery()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="responsive-width flex flex-wrap items-center justify-start">
      <ServiceCard businessId={data?.data?.business_profile?._id} />
    </div>
  )
}

export default page
