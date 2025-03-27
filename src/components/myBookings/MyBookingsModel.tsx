// import { Button, Input, Modal, Rate } from 'antd'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react'
// import Payment from '../payment/Payment'
// import toast from 'react-hot-toast'

// interface CardProps {
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
// }

// const MyBookingsModel = ({
//   id,
//   bookingType,
//   image,
//   name,
//   email,
//   phone,
//   bookingFor,
//   selectServices,
//   eventName,
//   eventLocation,
//   eventTime,
//   numberOfGuests,
//   eventDuration,
//   additionalRequirements,
//   additionalNote,
//   amountPaid,
//   timeLeft,
// }: CardProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const [rating, setRating] = useState(0)
//   const [review, setReview] = useState('')
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

//   const handleSubmit = () => {
//     console.log('Review Submitted:', { rating, review })
//     toast.success('Review submitted successfully!')
//     setIsReviewModalOpen(false)
//     setRating(0)
//     setReview('')
//   }

//   const showModal = () => {
//     setIsModalOpen(true)
//   }

//   const handleCancel = () => {
//     setIsModalOpen(false)
//   }

//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

//   const handlePaymentClick = () => {
//     setIsPaymentModalOpen(true)
//   }

//   const handlePaymentModalCancel = () => {
//     setIsPaymentModalOpen(false)
//   }

//   const [isEditing, setIsEditing] = useState(false)

//   const [editedEventName, setEditedEventName] = useState(eventName)
//   const [editedEventLocation, setEditedEventLocation] = useState(eventLocation)
//   const [editedEventTime, setEditedEventTime] = useState(eventTime)
//   const [editedNumberOfGuests, setEditedNumberOfGuests] =
//     useState(numberOfGuests)
//   const [editedEventDuration, setEditedEventDuration] = useState(eventDuration)
//   const [editedAdditionalRequirements, setEditedAdditionalRequirements] =
//     useState(additionalRequirements)
//   const [editedAdditionalNote, setEditedAdditionalNote] =
//     useState(additionalNote)

//   const handleSaveChanges = () => {
//     console.log('Updated Booking:', {
//       editedEventName,
//       editedEventLocation,
//       editedEventTime,
//       editedNumberOfGuests,
//       editedEventDuration,
//       editedAdditionalRequirements,
//       editedAdditionalNote,
//     })

//     toast.success('Booking updated successfully!')
//     setIsEditing(false)
//     setIsModalOpen(false)
//   }

//   return (
//     <>
//       <div
//         onClick={showModal}
//         className="mt-2 cursor-pointer bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
//       >
//         View Details
//       </div>
//       <Modal
//         title={
//           <div className="flex items-center mb-5 justify-center text-center text-3xl">
//             {bookingType} booking
//           </div>
//         }
//         open={isModalOpen}
//         onCancel={handleCancel}
//         width={700}
//         okButtonProps={{
//           style: {
//             display: 'none',
//           },
//         }}
//         cancelText={
//           bookingType === 'paymentRequest' ? (
//             <div onClick={handlePaymentClick} style={{ color: 'red' }}>
//               Payment
//             </div>
//           ) : bookingType === 'completed' ? (
//             <div onClick={() => setIsReviewModalOpen(true)}>Get Rating</div>
//           ) : null
//         }
//         cancelButtonProps={{
//           style: {
//             display:
//               bookingType !== 'ongoing' &&
//               bookingType !== 'canceled' &&
//               bookingType !== 'requested'
//                 ? 'inline-block'
//                 : 'none',
//           },
//         }}
//         centered
//       >
//         <div className="mx-auto bg-white rounded-xl space-y-4">
//           <div className="flex items-center space-x-4 mb-3">
//             <Image
//               src={image}
//               alt={name}
//               className="w-20 h-20 rounded-full object-cover object-center"
//               width={5000}
//               height={50}
//             />
//             <div>
//               <h2 className="text-lg font-semibold">{name}</h2>
//               <p className="text-sm text-gray-500">{email}</p>
//               <p className="text-sm text-gray-500">{phone}</p>
//             </div>
//           </div>

//           <Link href={`/chat`}>
//             <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
//               Send Message
//             </button>
//           </Link>

//           <div className="space-y-3 text-md">
//             <p className="font-semibold">
//               Booking For:{' '}
//               <span className="font-normal bg-blue-100 px-3 py-1 rounded-lg">
//                 {bookingFor}
//               </span>
//             </p>

//             <div>
//               <p className="font-semibold">Event Name:</p>
//               {isEditing ? (
//                 <Input
//                   value={editedEventName}
//                   onChange={(e) => setEditedEventName(e.target.value)}
//                 />
//               ) : (
//                 <span>{eventName}</span>
//               )}
//             </div>
//             <div>
//               <p className="font-semibold">Event Location:</p>
//               {isEditing ? (
//                 <Input
//                   value={editedEventLocation}
//                   onChange={(e) => setEditedEventLocation(e.target.value)}
//                 />
//               ) : (
//                 <span>{eventLocation}</span>
//               )}
//             </div>
//             <div>
//               <p className="font-semibold">Event Time:</p>
//               {isEditing ? (
//                 <Input
//                   value={editedEventTime}
//                   onChange={(e) => setEditedEventTime(e.target.value)}
//                 />
//               ) : (
//                 <span>{eventTime}</span>
//               )}
//             </div>
//             <div>
//               <p className="font-semibold">Number of guests:</p>
//               {isEditing ? (
//                 <Input
//                   type="number"
//                   value={editedNumberOfGuests}
//                   onChange={(e) =>
//                     setEditedNumberOfGuests(Number(e.target.value))
//                   }
//                 />
//               ) : (
//                 <span>{numberOfGuests}</span>
//               )}
//             </div>
//             <div>
//               <p className="font-semibold">Event Duration:</p>
//               {isEditing ? (
//                 <Input
//                   value={editedEventDuration}
//                   onChange={(e) => setEditedEventDuration(e.target.value)}
//                 />
//               ) : (
//                 <span>{eventDuration}</span>
//               )}
//             </div>
//           </div>

//           <div>
//             <p className="font-semibold">Select Service:</p>
//             <div className="flex gap-2 mt-1">
//               {selectServices.map((service: string, index: number) => (
//                 <span
//                   key={index}
//                   className="bg-blue-100 px-3 py-1 rounded-md text-sm"
//                 >
//                   {service}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="text-gray-600 text-sm">
//             <p className="font-semibold">
//               Additional Requirements or Services Needed:
//             </p>
//             {isEditing ? (
//               <Input.TextArea
//                 value={editedAdditionalRequirements}
//                 onChange={(e) =>
//                   setEditedAdditionalRequirements(e.target.value)
//                 }
//               />
//             ) : (
//               <p>{additionalRequirements}</p>
//             )}
//           </div>

//           <div className="text-gray-600 text-sm">
//             <p className="font-semibold">Additional Note:</p>
//             {isEditing ? (
//               <Input.TextArea
//                 value={editedAdditionalNote}
//                 onChange={(e) => setEditedAdditionalNote(e.target.value)}
//               />
//             ) : (
//               <p>{additionalNote}</p>
//             )}
//           </div>

//           {amountPaid && (
//             <div className="bg-gray-100 text-center py-2 rounded-md text-blue-600 font-semibold">
//               {amountPaid}
//             </div>
//           )}
//           {bookingType === 'ongoing' && (
//             <div className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md">
//               <p>{timeLeft}</p>
//             </div>
//           )}

//           {isEditing && (
//             <button
//               className="w-full p-2 rounded-md hover:bg-blue-700 bg-blue-600 text-white mt-4"
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </button>
//           )}
//         </div>
//         {!isEditing && bookingType === 'requested' && (
//           <div className="text-end p-2 bg-blue-600 text-white cursor-pointer font-bold hover:bg-blue-800  flex items-center justify-center  rounded-md">
//             <div onClick={() => setIsEditing(true)}>Edit Request</div>
//           </div>
//         )}
//       </Modal>

//       <Modal
//         visible={isPaymentModalOpen}
//         onCancel={handlePaymentModalCancel}
//         footer={null}
//         centered
//       >
//         <Payment />
//       </Modal>

//       <Modal
//         open={isReviewModalOpen}
//         onCancel={() => setIsReviewModalOpen(false)}
//         footer={null}
//         centered
//       >
//         <div className="space-y-4">
//           <p className="text-lg font-semibold">
//             How Would You Rate This Vendor Overall?
//           </p>
//           <Rate onChange={setRating} value={rating} />

//           <div>
//             <p className="text-lg font-semibold">Review</p>
//             <Input.TextArea
//               rows={4}
//               placeholder="Enter your Review..."
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//             />
//           </div>

//           <Button
//             type="primary"
//             className="bg-blue-600 w-full text-white"
//             onClick={handleSubmit}
//           >
//             Submit
//           </Button>
//         </div>
//       </Modal>
//     </>
//   )
// }

// export default MyBookingsModel

import { Button, Input, Modal, Rate } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Payment from '../payment/Payment'
import toast from 'react-hot-toast'
import { useCreatePaymentMutation } from '@/redux/paymentApis'
import { useRouter } from 'next/navigation'

interface CardProps {
  id: string
  bookingType: string
  image: string
  name: string
  email: string
  phone: string
  bookingFor: string
  selectServices: string[]
  eventName?: string
  eventLocation?: string
  eventTime?: string
  numberOfGuests?: number
  eventDuration?: string
  additionalRequirements?: string
  additionalNote?: string
  amountPaid?: string
  timeLeft?: string
  price?: number
  requested_by?: string
  is_paid?: boolean
}

const MyBookingsModel = ({
  id,
  bookingType,
  image,
  name,
  email,
  price,
  phone,
  bookingFor,
  selectServices,
  eventName,
  eventLocation,
  eventTime,
  numberOfGuests,
  eventDuration,
  additionalRequirements,
  additionalNote,
  amountPaid,
  is_paid,
  timeLeft,
  requested_by,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createPayment, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation()
  const router = useRouter()

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const handleSubmit = () => {
    console.log('Review Submitted:', { id, rating, review })
    toast.success('Review submitted successfully!')
    setIsReviewModalOpen(false)
    setRating(0)
    setReview('')
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true)
  }

  const handlePaymentModalCancel = () => {
    setIsPaymentModalOpen(false)
  }
  const handleSubscribe = async () => {
    try {
      const payload = {
        price_data: [
          {
            name: name,
            unit_amount: price,
            quantity: 1,
            booking_id: id,
          },
        ],
        purpose: 'BOOKING',
      }

      const response = await createPayment(payload).unwrap()

      if (response.success && response.url) {
        window.location.href = response.url
        router.push('/vendor-home')
      }
    } catch (error) {
      console.error('Payment creation failed:', error)
    }
  }
  // const [isEditing, setIsEditing] = useState(false)

  // const [editedEventName, setEditedEventName] = useState(eventName)
  // const [editedEventLocation, setEditedEventLocation] = useState(eventLocation)
  // const [editedEventTime, setEditedEventTime] = useState(eventTime)
  // const [editedNumberOfGuests, setEditedNumberOfGuests] =
  //   useState(numberOfGuests)
  // const [editedEventDuration, setEditedEventDuration] = useState(eventDuration)
  // const [editedAdditionalRequirements, setEditedAdditionalRequirements] =
  //   useState(additionalRequirements)
  // const [editedAdditionalNote, setEditedAdditionalNote] =
  //   useState(additionalNote)

  // const handleSaveChanges = () => {
  //   console.log('Updated Booking:', {
  //     id,
  //     editedEventName,
  //     editedEventLocation,
  //     editedEventTime,
  //     editedNumberOfGuests,
  //     editedEventDuration,
  //     editedAdditionalRequirements,
  //     editedAdditionalNote,
  //   })

  //   toast.success('Booking updated successfully!')
  //   setIsEditing(false)
  //   setIsModalOpen(false)
  // }

  // const getImageSrc = () => {
  //   if (!image || image.includes('undefined')) {
  //     return '/placeholder.png'
  //   }
  //   return image
  // }

  return (
    <>
      <div
        onClick={showModal}
        className="mt-2 cursor-pointer bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
      >
        View Details
      </div>
      <Modal
        title={
          <div className="flex items-center mb-5 justify-center text-center text-3xl">
            {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} booking
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelText={
          bookingType === 'paymentRequest' ? (
            <div onClick={handlePaymentClick} style={{ color: 'red' }}>
              Payment
            </div>
          ) : bookingType === 'completed' ? (
            <div onClick={() => setIsReviewModalOpen(true)}>Get Rating</div>
          ) : null
        }
        cancelButtonProps={{
          style: {
            display:
              bookingType !== 'ongoing' &&
              bookingType !== 'canceled' &&
              bookingType !== 'requested'
                ? 'inline-block'
                : 'none',
          },
        }}
        centered
      >
        <div className="mx-auto bg-white rounded-xl space-y-4">
          <div className="flex items-center space-x-4 mb-3">
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-gray-500">{email}</p>
              <p className="text-sm text-gray-500">{phone}</p>
            </div>
          </div>

          <Link href={`/chat`}>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
              Send Message
            </button>
          </Link>

          <div className="space-y-3 text-md">
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                Booking For:{' '}
                <span className="font-normal bg-blue-100 px-3 py-1 rounded-lg">
                  {bookingFor}
                </span>
              </p>
              <div className="text-sm flex gap-2 bg-red-200 p-2 items-center justify-center  font-bold">
                <p className="font-semibold">Price:</p>
                <span className="text-[16px]">{price}</span>
                <span className="text-[16px]">
                  {is_paid ? '(Paid) ' : '(unpaid)'}
                </span>
              </div>
            </div>

            <div>
              <p className="font-semibold">Event Name:</p>
              <span>{eventName}</span>
            </div>
            <div>
              <p className="font-semibold">Event Location:</p>
              <span>{eventLocation}</span>
            </div>
            <div>
              <p className="font-semibold">Event Time:</p>
              <span>{eventTime}</span>
            </div>
            <div>
              <p className="font-semibold">Number of guests:</p>
              <span>{numberOfGuests}</span>
            </div>
            <div>
              <p className="font-semibold">Event Duration:</p>
              <span>{eventDuration}</span>
            </div>
          </div>

          <div>
            <p className="font-semibold">Select Service:</p>
            <div className="flex gap-2 mt-1">
              {selectServices.map((service: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 px-3 py-1 rounded-md text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            <p className="font-semibold">
              Additional Requirements or Services Needed:
            </p>

            <p>{additionalRequirements || 'None specified'}</p>
          </div>

          <div className="text-gray-600 text-sm">
            <p className="font-semibold">Additional Note:</p>

            <p>{additionalNote || 'None specified'}</p>
          </div>

          {bookingType === 'ongoing' && (
            <div className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md">
              <p>{timeLeft}</p>
            </div>
          )}

          {/* {amountPaid && (
            <div className="bg-gray-100 text-center py-2 rounded-md text-blue-600 font-semibold">
              {amountPaid} is paid
            </div>
          )} */}
          {/* {bookingType === 'ongoing' ||
            (requested_by === 'VENDOR' && (
              <div className="flex justify-end text-xl">
                <p className="font-semibold text-red-500">Price: {price}</p>
              </div>
            ))} */}

          {bookingType === 'requested' && (
            <div className="flex justify-end text-[16px]">
              <div>
                <p className="font-semibold text-red-500">Price: {price}</p>
                <button
                  onClick={handleSubscribe}
                  className="border rounded-lg px-2 py-1 bg-blue-600 text-white hover:bg-white hover:text-black"
                >
                  Payment
                </button>
              </div>
            </div>
          )}
          {/* {requested_by === 'VENDOR' && (
            <div className="flex justify-end ">
              <Button
                className="!bg-red-200 hover:!bg-black hover:!text-white"
                onClick={handleSubscribe}
              >
                Payment
              </Button>
            </div>
          )} */}

          {/* {isEditing && (
            <button
              className="w-full p-2 rounded-md hover:bg-blue-700 bg-blue-600 text-white mt-4"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )} */}
        </div>
        {/* {!isEditing && bookingType === 'requested' && (
          <div className="text-end p-2 bg-blue-600 text-white cursor-pointer font-bold hover:bg-blue-800 flex items-center justify-center rounded-md">
            <div onClick={() => setIsEditing(true)}>Edit Request</div>
          </div>
        )} */}
      </Modal>

      <Modal
        open={isPaymentModalOpen}
        onCancel={handlePaymentModalCancel}
        footer={null}
        centered
      >
        <Payment
          price={price}
          name={name}
          email={email}
          phone={phone}
          id={id}
        />
      </Modal>

      <Modal
        open={isReviewModalOpen}
        onCancel={() => setIsReviewModalOpen(false)}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            How Would You Rate This Vendor Overall?
          </p>
          <Rate onChange={setRating} value={rating} />

          <div>
            <p className="text-lg font-semibold">Review</p>
            <Input.TextArea
              rows={4}
              placeholder="Enter your Review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            className="bg-blue-600 w-full text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default MyBookingsModel
