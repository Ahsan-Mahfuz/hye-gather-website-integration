'use client'
import Loader from '@/components/loading/ReactLoader'
import { useGetPrivacyQuery } from '@/redux/privacyApis'

const PrivacyAndPolicy = () => {
  const { data, isLoading, isError } = useGetPrivacyQuery()
  const content = data?.data?.result?.desc

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-[85vh]">
        <p>Failed to load privacy policy. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col  justify-center responsive-width">
      <div className="text-3xl font-bold mb-1.5">Privacy and Policy</div>
      <div className="text-justify">
        {content || 'No privacy policy available.'}
      </div>
    </div>
  )
}

export default PrivacyAndPolicy
