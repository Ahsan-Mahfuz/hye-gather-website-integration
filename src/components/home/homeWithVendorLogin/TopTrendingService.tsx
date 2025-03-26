'use client'
import Loader from '@/components/loading/ReactLoader'
import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { url } from '@/redux/main/server'
import { Carousel } from 'antd'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const contentStyle: React.CSSProperties = {
  maxWidth: '300px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  backgroundColor: '#fff',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
}

const cardImageStyle: React.CSSProperties = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
}

const cardTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginTop: '15px',
  color: '#333',
}

const TopTrendingService = () => {
  const { data, isLoading } = useGetBusinessDataQuery({
    vendor_type: 'PREMIUM',
  })

  if (isLoading) return <Loader />

  return (
    <div className="responsive-width">
      <div className="mt-48 mb-20">
        <h2 className="text-center text-3xl font-bold mb-8 max-sm:mt-[400px]">
          Top Trending Services
        </h2>

        <Carousel
          slidesToShow={4}
          autoplaySpeed={1200}
          autoplay
          responsive={[
            {
              breakpoint: 1524,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          className="flex items-center justify-center gap-10 w-full mx-auto text-black"
        >
          {/* Iterate over the fetched data */}
          {data?.data?.map(
            (
              service: {
                id: number
                rating: number
                price: number
                business_category: { name: string; img: string }
                business_services: { name: string }[]
              },
              index: number
            ) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
                    <StarIcon className="w-3 h-3 text-yellow-500" />
                    <span>{service?.rating}</span>
                  </div>
                  <Image
                    src={`${url}/${service?.business_category?.img}`}
                    alt={service?.business_category?.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {service?.business_category?.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service?.business_services?.map((item) => item?.name)}
                  </p>
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(service?.rating))].map((_, i) => (
                        <StarIcon
                          key={`filled-${i}`}
                          className="w-6 h-6 text-yellow-500"
                        />
                      ))}
                      {[...Array(5 - Math.floor(service?.rating))].map(
                        (_, i) => (
                          <StarIcon
                            key={`empty-${i}`}
                            className="w-6 h-6 text-gray-300"
                          />
                        )
                      )}
                      {/* <span className="!text-xl text-gray-500">
                        ({service?.rating})
                      </span> */}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-gray-600 ">
                      <div className="font-bold">starting price :</div>
                      <div className="font-bold text-lg text-blue-600">
                        ${service?.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center justify-center">
                  <Link
                    href={`/service/${service?.id}`}
                    className="w-full py-3 flex mx-auto items-center justify-center bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default TopTrendingService
