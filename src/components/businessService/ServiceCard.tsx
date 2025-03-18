// // 'use client'
// // import { useState } from 'react'
// // import Image from 'next/image'
// // import Link from 'next/link'
// // import { PiPlusCircleBold } from 'react-icons/pi'
// // import { Modal, Button, Select, Upload, message } from 'antd'
// // import {
// //   UploadOutlined,
// //   DeleteOutlined,
// // } from '@ant-design/icons'

// // interface Service {
// //   id: number
// //   serviceType: string
// //   categories: string[]
// //   images: string[]
// // }

// // const ServiceCard = () => {
// //   const [services, setServices] = useState<Service[]>([])
// //   const [showModal, setShowModal] = useState(false)
// //   const [editServiceId, setEditServiceId] = useState<number | null>(null)
// //   const [serviceCategories] = useState([
// //     { id: 1, name: 'Catering' },
// //     { id: 2, name: 'Entertainment' },
// //     { id: 3, name: 'Decoration' },
// //   ])
// //   const [serviceTypes] = useState([
// //     { id: 1, name: 'DJ' },
// //     { id: 2, name: 'Photography' },
// //     { id: 3, name: 'Lighting' },
// //   ])
// //   const [newService, setNewService] = useState<Service>({
// //     id: 0,
// //     serviceType: '',
// //     categories: [],
// //     images: [],
// //   })
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
// //   const [deleteServiceId, setDeleteServiceId] = useState<number | null>(null)

// //   const showDeleteConfirm = (id: number) => {
// //     setDeleteServiceId(id)
// //     setIsDeleteModalOpen(true)
// //   }

// //   const confirmDeleteService = () => {
// //     if (deleteServiceId !== null) {
// //       setServices((prev) =>
// //         prev.filter((service) => service.id !== deleteServiceId)
// //       )
// //       message.success('Service deleted successfully')
// //       setIsDeleteModalOpen(false)
// //       setDeleteServiceId(null)
// //     }
// //   }

// //   const cancelDeleteService = () => {
// //     setIsDeleteModalOpen(false)
// //     setDeleteServiceId(null)
// //   }

// //   const addOrUpdateService = () => {
// //     if (!newService.serviceType)
// //       return message.error('Service name and type are required')

// //     if (editServiceId !== null) {
// //       setServices(
// //         services.map((service) =>
// //           service.id === editServiceId
// //             ? { ...service, ...newService, id: service.id }
// //             : service
// //         )
// //       )
// //     } else {
// //       setServices([
// //         ...services,
// //         {
// //           ...newService,
// //           id:
// //             services.length > 0
// //               ? Math.max(...services.map((s) => s.id)) + 1
// //               : 1,
// //         },
// //       ])
// //     }

// //     setNewService({
// //       id: 0,
// //       serviceType: '',
// //       categories: [],
// //       images: [],
// //     })
// //     setShowModal(false)
// //     setEditServiceId(null)
// //   }

// //   const handleImageUpload = (file: File) => {
// //     const url = URL.createObjectURL(file)
// //     setNewService((prev) => ({ ...prev, images: [...prev.images, url] }))
// //     return false
// //   }

// //   return (
// //     <div className="p-4 flex flex-wrap w-full justify-start items-center gap-4">
// //       {services.map((service) => (
// //         <div
// //           key={service.id}
// //           className="bg-white hover:bg-slate-200 shadow-md rounded-lg p-5 flex flex-col sm:flex-row gap-4 max-w-[400px] w-full border border-gray-200 relative"
// //         >
// //           <Link
// //             href={`/service/${service.id}`}
// //             className="flex-shrink-0 w-full sm:w-48 "
// //           >
// //             <Image
// //               src={service.images[0] || '/placeholder.jpg'}
// //               alt="service image"
// //               width={5000}
// //               height={150}
// //               className="rounded-md object-cover object-center max-sm:w-full w-[200px] h-[200px]"
// //             />
// //           </Link>
// //           <div className="flex-1">
// //             <p className="text-gray-800 font-medium text-sm mt-2">
// //               Service Type:
// //             </p>
// //             <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs">
// //               {service.serviceType}
// //             </span>
// //             <p className="text-gray-800 font-medium text-sm mt-2">
// //               Categories:
// //             </p>
// //             <div className="flex gap-2 mt-1 flex-wrap mb-6">
// //               {service.categories.map((category, index) => (
// //                 <span
// //                   key={index}
// //                   className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs"
// //                 >
// //                   {category}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //           <Button
// //             type="text"
// //             onClick={() => showDeleteConfirm(service.id)}
// //             className="absolute bottom-1 left-5    "
// //           >
// //             <DeleteOutlined className=" rounded-md text-white hover:bg-white hover:text-black bg-red-500 px-5 py-3" />
// //           </Button>
// //           <Button
// //             type="text"
// //             onClick={() => {
// //               setNewService(service)
// //               setEditServiceId(service.id)
// //               setShowModal(true)
// //             }}
// //             className="absolute bottom-1  left-20 sm:bottom-1 sm:left-20    "
// //           >
// //             <div className=" rounded-md text-white hover:bg-white hover:text-black bg-blue-800 px-5 py-2">
// //               Edit
// //             </div>
// //           </Button>
// //         </div>
// //       ))}
// //       <div
// //         onClick={() => {
// //           setNewService({
// //             id: 0,
// //             serviceType: '',
// //             categories: [],
// //             images: [],
// //           })
// //           setEditServiceId(null)
// //           setShowModal(true)
// //         }}
// //         className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-[300px] border border-gray-200 cursor-pointer hover:shadow-lg transition"
// //       >
// //         <PiPlusCircleBold className="text-blue-500 w-28 h-24" />
// //         <p className="text-gray-700 mt-2 text-sm text-center">
// //           Add new service
// //         </p>
// //       </div>
// //       <Modal
// //         title={
// //           <div className="text-2xl text-center">
// //             {editServiceId ? 'Edit Service' : 'Add A New Service'}
// //           </div>
// //         }
// //         open={showModal}
// //         onCancel={() => setShowModal(false)}
// //         footer={null}
// //         centered
// //         width={600}
// //       >
// //         <Select
// //           className="w-full mb-2 h-[36px]"
// //           placeholder="Select Service Type"
// //           onChange={(value) =>
// //             setNewService({ ...newService, serviceType: value })
// //           }
// //           value={newService.serviceType || undefined}
// //         >
// //           {serviceTypes.map((item) => (
// //             <Select.Option key={item.id} value={item.name}>
// //               {item.name}
// //             </Select.Option>
// //           ))}
// //         </Select>
// //         <Select
// //           mode="multiple"
// //           className="w-full mb-2 h-[36px]"
// //           placeholder="Select Service Categories"
// //           onChange={(value) =>
// //             setNewService({ ...newService, categories: value })
// //           }
// //           value={newService.categories}
// //         >
// //           {serviceCategories.map((item) => (
// //             <Select.Option key={item.id} value={item.name}>
// //               {item.name}
// //             </Select.Option>
// //           ))}
// //         </Select>
// //         <Upload beforeUpload={handleImageUpload} className="mt-5" multiple>
// //           <Button icon={<UploadOutlined />}>Upload Images</Button>
// //         </Upload>
// //         <Button
// //           type="primary"
// //           className="w-full mt-2 h-[36px]"
// //           onClick={addOrUpdateService}
// //         >
// //           {editServiceId ? 'Update Service' : 'Add New Service'}
// //         </Button>
// //       </Modal>

// //       <Modal
// //         title="Confirm Delete"
// //         open={isDeleteModalOpen}
// //         onOk={confirmDeleteService}
// //         onCancel={cancelDeleteService}
// //         okText="Yes"
// //         cancelText="No"
// //         centered
// //       >
// //         <p>Are you sure you want to delete this service?</p>
// //       </Modal>
// //     </div>
// //   )
// // }

// // export default ServiceCard

// 'use client'
// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { PiPlusCircleBold } from 'react-icons/pi'
// import { Modal, Button, Select, Upload, message } from 'antd'
// import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'

// import { useSelector } from 'react-redux'
// import Cookies from 'js-cookie'
// import { useGetBusinessDataQuery } from '@/redux/businessApis'

// interface Service {
//   id: string
//   serviceType: string
//   categories: string[]
//   images: string[]
// }

// const ServiceCard = () => {
//   const { data: servicesData, isLoading } = useGetBusinessDataQuery({
//     business: Cookies.get('businessId'),
//   }) // Assuming you store businessId in cookies
//   const [showModal, setShowModal] = useState(false)
//   const [editServiceId, setEditServiceId] = useState<string | null>(null)
//   const [newService, setNewService] = useState<Service>({
//     id: '',
//     serviceType: '',
//     categories: [],
//     images: [],
//   })
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null)

//   const [createBusinessService] = useCreateBusinessServiceMutation()
//   const [updateBusinessService] = useUpdateBusinessServiceMutation()
//   const [deleteBusinessService] = useDeleteBusinessServiceMutation()

//   const showDeleteConfirm = (id: string) => {
//     setDeleteServiceId(id)
//     setIsDeleteModalOpen(true)
//   }

//   const confirmDeleteService = async () => {
//     if (deleteServiceId) {
//       try {
//         await deleteBusinessService({
//           businessServiceId: deleteServiceId,
//           businessId: Cookies.get('businessId'),
//         })
//         message.success('Service deleted successfully')
//         setIsDeleteModalOpen(false)
//         setDeleteServiceId(null)
//       } catch (error) {
//         message.error('Failed to delete service')
//       }
//     }
//   }

//   const cancelDeleteService = () => {
//     setIsDeleteModalOpen(false)
//     setDeleteServiceId(null)
//   }

//   const addOrUpdateService = async () => {
//     if (!newService.serviceType)
//       return message.error('Service name and type are required')

//     if (editServiceId) {
//       try {
//         await updateBusinessService({
//           businessCategory: newService.categories[0],
//           businessServices: [newService.serviceType],
//           price: 500, // Set price here
//           business: Cookies.get('businessId'),
//           businessServiceId: editServiceId,
//           businessId: Cookies.get('businessId'),
//         })
//         message.success('Service updated successfully')
//       } catch (error) {
//         message.error('Failed to update service')
//       }
//     } else {
//       try {
//         await createBusinessService({
//           business_category: newService.categories[0], // Choose the category you want to send
//           business_services: [newService.serviceType],
//           price: 500, // Set price here
//           business: Cookies.get('businessId'),
//         })
//         message.success('Service added successfully')
//       } catch (error) {
//         message.error('Failed to add service')
//       }
//     }

//     setNewService({
//       id: '',
//       serviceType: '',
//       categories: [],
//       images: [],
//     })
//     setShowModal(false)
//     setEditServiceId(null)
//   }

//   const handleImageUpload = (file: File) => {
//     const url = URL.createObjectURL(file)
//     setNewService((prev) => ({ ...prev, images: [...prev.images, url] }))
//     return false
//   }

//   return (
//     <div className="p-4 flex flex-wrap w-full justify-start items-center gap-4">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         servicesData?.data?.map((service: any) => (
//           <div
//             key={service._id}
//             className="bg-white hover:bg-slate-200 shadow-md rounded-lg p-5 flex flex-col sm:flex-row gap-4 max-w-[400px] w-full border border-gray-200 relative"
//           >
//             <Link
//               href={`/service/${service._id}`}
//               className="flex-shrink-0 w-full sm:w-48 "
//             >
//               <Image
//                 src={service.img || '/placeholder.jpg'}
//                 alt="service image"
//                 width={5000}
//                 height={150}
//                 className="rounded-md object-cover object-center max-sm:w-full w-[200px] h-[200px]"
//               />
//             </Link>
//             <div className="flex-1">
//               <p className="text-gray-800 font-medium text-sm mt-2">
//                 Service Type:
//               </p>
//               <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs">
//                 {service.business_services.map((s: any) => s.name).join(', ')}
//               </span>
//               <p className="text-gray-800 font-medium text-sm mt-2">
//                 Categories:
//               </p>
//               <div className="flex gap-2 mt-1 flex-wrap mb-6">
//                 <span
//                   key={service.business_category._id}
//                   className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs"
//                 >
//                   {service.business_category.name}
//                 </span>
//               </div>
//             </div>
//             <Button
//               type="text"
//               onClick={() => showDeleteConfirm(service._id)}
//               className="absolute bottom-1 left-5"
//             >
//               <DeleteOutlined className="rounded-md text-white hover:bg-white hover:text-black bg-red-500 px-5 py-3" />
//             </Button>
//             <Button
//               type="text"
//               onClick={() => {
//                 setNewService({
//                   id: service._id,
//                   serviceType: service.business_services[0]?.name || '',
//                   categories: [service.business_category.name],
//                   images: service.photos || [],
//                 })
//                 setEditServiceId(service._id)
//                 setShowModal(true)
//               }}
//               className="absolute bottom-1 left-20 sm:bottom-1 sm:left-20"
//             >
//               <div className="rounded-md text-white hover:bg-white hover:text-black bg-blue-800 px-5 py-2">
//                 Edit
//               </div>
//             </Button>
//           </div>
//         ))
//       )}
//       <div
//         onClick={() => {
//           setNewService({
//             id: '',
//             serviceType: '',
//             categories: [],
//             images: [],
//           })
//           setEditServiceId(null)
//           setShowModal(true)
//         }}
//         className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-[300px] border border-gray-200 cursor-pointer hover:shadow-lg transition"
//       >
//         <PiPlusCircleBold className="text-blue-500 w-28 h-24" />
//         <p className="text-gray-700 mt-2 text-sm text-center">
//           Add new service
//         </p>
//       </div>
//       <Modal
//         title={editServiceId ? 'Edit Service' : 'Add A New Service'}
//         open={showModal}
//         onCancel={() => setShowModal(false)}
//         footer={null}
//         centered
//         width={600}
//       >
//         <Select
//           className="w-full mb-2 h-[36px]"
//           placeholder="Select Service Type"
//           onChange={(value) =>
//             setNewService({ ...newService, serviceType: value })
//           }
//           value={newService.serviceType || undefined}
//         >
//           {servicesData?.data?.map((item: any) => (
//             <Select.Option key={item._id} value={item.name}>
//               {item.name}
//             </Select.Option>
//           ))}
//         </Select>
//         <Select
//           mode="multiple"
//           className="w-full mb-2 h-[36px]"
//           placeholder="Select Service Categories"
//           onChange={(value) =>
//             setNewService({ ...newService, categories: value })
//           }
//           value={newService.categories}
//         >
//           {servicesData?.data?.map((item: any) => (
//             <Select.Option key={item._id} value={item.name}>
//               {item.name}
//             </Select.Option>
//           ))}
//         </Select>
//         <Upload beforeUpload={handleImageUpload} className="mt-5" multiple>
//           <Button icon={<UploadOutlined />}>Upload Images</Button>
//         </Upload>
//         <Button
//           type="primary"
//           className="w-full mt-2 h-[36px]"
//           onClick={addOrUpdateService}
//         >
//           {editServiceId ? 'Update Service' : 'Add New Service'}
//         </Button>
//       </Modal>

//       <Modal
//         title="Confirm Delete"
//         open={isDeleteModalOpen}
//         onOk={confirmDeleteService}
//         onCancel={cancelDeleteService}
//         okText="Yes"
//         cancelText="No"
//         centered
//       >
//         <p>Are you sure you want to delete this service?</p>
//       </Modal>
//     </div>
//   )
// }

// export default ServiceCard

'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiPlusCircleBold } from 'react-icons/pi'
import { Modal, Button, Select, Upload, message, InputNumber, Spin } from 'antd'
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  DollarOutlined,
  TagOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import {
  useCreateBusinessServiceMutation,
  useDeleteBusinessServiceMutation,
  useGetBusinessDataQuery,
  useUpdateBusinessServiceMutation,
} from '@/redux/businessApis'
import { useGetCategoryWithServicesDataQuery } from '@/redux/categoryWithServicesApis'
import Loader from '../loading/ReactLoader'
import toast from 'react-hot-toast'

interface BusinessService {
  _id: string
  business_category: string
  business_services: string[]
  price: number
  business: string
  img: string | null
  photos: string[]
  desc: string | null
  rating?: number
  total_rated?: number
  total_booking?: number
  vendor_type?: string
  user_details?: {
    _id: string
    name: string
    img: string
    email: string
    phone: string
    block: boolean
  }
  business_services_details?: {
    _id: string
    name: string
  }[]
  business_category_details?: {
    _id: string
    name: string
    img: string
  }
}

interface Category {
  _id: string
  name: string
  img: string
  services: {
    _id: string
    name: string
  }[]
}

const ServiceCard = ({ businessId }: { businessId: string }) => {
  // States
  const [showModal, setShowModal] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null)
  const [editServiceId, setEditServiceId] = useState<string | null>(null)
  const [fileList, setFileList] = useState<any[]>([])
  const [newService, setNewService] = useState({
    business_category: '',
    business_services: [] as string[],
    price: 0,
    business: businessId,
    businessServiceId: '',
    businessId: businessId,
  })

  // API queries and mutations
  const { data: businessData, isLoading: isBusinessLoading } =
    useGetBusinessDataQuery({ businessId: businessId })
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoryWithServicesDataQuery()
  const [createBusinessService, { isLoading: isCreating }] =
    useCreateBusinessServiceMutation()
  const [updateBusinessService, { isLoading: isUpdating }] =
    useUpdateBusinessServiceMutation()
  const [deleteBusinessService, { isLoading: isDeleting }] =
    useDeleteBusinessServiceMutation()

  // Service data destructuring
  const services: BusinessService[] = businessData?.data || []
  const categories: Category[] = categoriesData?.data || []

  // Filter services from the selected category
  const [selectedServices, setSelectedServices] = useState<
    { _id: string; name: string }[]
  >([])

  // Update available services when category changes
  useEffect(() => {
    if (newService.business_category && categories.length > 0) {
      const category = categories.find(
        (cat) => cat._id === newService.business_category
      )
      setSelectedServices(category?.services || [])
    }
  }, [newService.business_category, categories])

  // Modal functions
  const showDeleteConfirm = (id: string) => {
    setDeleteServiceId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteService = async () => {
    if (deleteServiceId) {
      try {
        await deleteBusinessService({
          businessServiceId: deleteServiceId,
          businessId: businessId,
        }).unwrap()
        message.success('Service deleted successfully')
      } catch (error) {
        message.error('Failed to delete service')
      }
      setIsDeleteModalOpen(false)
      setDeleteServiceId(null)
    }
  }

  const cancelDeleteService = () => {
    setIsDeleteModalOpen(false)
    setDeleteServiceId(null)
  }

  const handleEditService = (service: BusinessService) => {
    const serviceToEdit = {
      business_category: service.business_category,
      business_services: Array.isArray(service.business_services)
        ? service.business_services
        : [service.business_services],
      price: service.price,
      business: service.business,
      businessServiceId: service._id,
      businessId: businessId,
    }

    setNewService(serviceToEdit)
    setEditServiceId(service._id)
    setShowModal(true)

    if (service.business_category && categories.length > 0) {
      const category = categories.find(
        (cat) => cat._id === service.business_category
      )
      setSelectedServices(category?.services || [])
    }
  }

  const resetForm = () => {
    setNewService({
      business_category: '',
      business_services: [],
      price: 0,
      business: businessId,
      businessServiceId: '',
      businessId: businessId,
    })
    setFileList([])
    setEditServiceId(null)
  }

  const handleAddNewService = () => {
    resetForm()
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (
      !newService.business_category ||
      newService.business_services.length === 0
    ) {
      return toast.error('Please select category and at least one service')
    }

    if (newService.price <= 0) {
      return toast.error('Please enter a valid price')
    }

    try {
      if (editServiceId) {
        await updateBusinessService(newService).unwrap()
        toast.success('Service updated successfully')
      } else {
        console.log(newService)

        await createBusinessService({
          business_category: newService.business_category,
          business_services: newService.business_services,
          price: newService.price,
          business: businessId,
        }).unwrap()
        toast.success('Service added successfully')
      }
      setShowModal(false)
      resetForm()
    } catch (error) {
      toast.error('Operation failed')
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId)
    return category?.name || 'Unknown Category'
  }

  const getServiceNames = (serviceIds: string[]) => {
    if (!Array.isArray(serviceIds)) return []

    return serviceIds.map((id) => {
      const category = categories.find((cat) =>
        cat.services.some((service) => service._id === id)
      )
      if (!category) return 'Unknown Service'

      const service = category.services.find((service) => service._id === id)
      return service?.name || 'Unknown Service'
    })
  }

  if (isBusinessLoading || isCategoriesLoading) {
    return (
      <div className="mx-auto">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Services</h2>
        <Button
          type="primary"
          onClick={handleAddNewService}
          icon={<PiPlusCircleBold />}
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all hover:shadow-xl"
          >
            <div className="relative">
              <Image
                src={
                  service.business_category_details?.img ||
                  service.img ||
                  '/placeholder.jpg'
                }
                alt={service.business_category_details?.name || 'Service image'}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              {service.rating && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                  <span>★ {service.rating.toFixed(1)}</span>
                </div>
              )}
              {service.vendor_type && (
                <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                  {service.vendor_type}
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center mb-3">
                <AppstoreOutlined className="text-blue-600 mr-2" />
                <h3 className="font-medium text-lg text-gray-800">
                  {getCategoryName(service.business_category)}
                </h3>
              </div>

              <div className="flex items-center mb-3">
                <TagOutlined className="text-green-600 mr-2" />
                <div className="flex flex-wrap gap-2">
                  {getServiceNames(service.business_services).map(
                    (name, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs"
                      >
                        {name}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <DollarOutlined className="text-red-500 mr-2" />
                <span className="text-xl font-bold text-gray-900">
                  ${service.price}
                </span>
              </div>

              {service.total_booking !== undefined && (
                <p className="text-gray-600 text-sm mb-4">
                  {service.total_booking} bookings
                </p>
              )}

              <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => showDeleteConfirm(service._id)}
                >
                  Delete
                </Button>

                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEditService(service)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && !isBusinessLoading && (
          <div className="col-span-full flex flex-col items-center justify-center p-10 h-[70vh]">
            <p className="text-gray-500 text-lg mb-4">
              You haven&apos;t added any services yet
            </p>
            <Button
              type="primary"
              onClick={handleAddNewService}
              icon={<PiPlusCircleBold />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Your First Service
            </Button>
          </div>
        )}
      </div>

      <Modal
        title={editServiceId ? 'Edit Service' : 'Add New Service'}
        open={showModal}
        onCancel={() => {
          setShowModal(false)
          resetForm()
        }}
        footer={null}
        centered
        width={600}
      >
        <div className="py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Category
            </label>
            <Select
              className="w-full"
              placeholder="Select Service Category"
              onChange={(value) => {
                setNewService({
                  ...newService,
                  business_category: value,
                  business_services: [],
                })
              }}
              value={newService.business_category || undefined}
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Services
            </label>
            <Select
              mode="multiple"
              className="w-full"
              placeholder="Select Services"
              onChange={(value) =>
                setNewService({ ...newService, business_services: value })
              }
              value={newService.business_services}
              disabled={!newService.business_category}
            >
              {selectedServices.map((service) => (
                <Select.Option key={service._id} value={service._id}>
                  {service.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <InputNumber
              className="w-full"
              min={0}
              placeholder="Enter price"
              onChange={(value) =>
                setNewService({ ...newService, price: value || 0 })
              }
              value={newService.price}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <p className="text-xs text-gray-500 mt-1">
              Images will be used to showcase your service (feature coming soon)
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isCreating || isUpdating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editServiceId ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onOk={confirmDeleteService}
        onCancel={cancelDeleteService}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, loading: isDeleting }}
        centered
      >
        <div className="py-4 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <DeleteOutlined className="text-red-500 text-xl" />
          </div>
          <div>
            <p>Are you sure you want to delete this service?</p>
            <p className="text-gray-500 text-sm mt-1">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ServiceCard
