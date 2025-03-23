import { Button, Input, Modal, Rate } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import BookingRequestVendor from './BookingRequestVendor'

interface CardProps {
  id: string
  bookingType: string
  image: string
  userId: string
  name: string
  email: string
  phone: string
  bookingFor: string
  selectServices: string[]
  eventName?: string
  eventLocation?: string
  eventTime?: string
  eventDate?: string
  numberOfGuests?: number
  eventDuration?: string
  additionalRequirements?: string
  additionalNote?: string
  amountPaid?: string
  timeLeft?: string
  requested_by?: string
  price?: number
  is_paid?: boolean
}

const MyBookingsModelVendor = ({
  id,
  bookingType,
  userId,
  image,
  name,
  email,
  phone,
  bookingFor,
  selectServices,
  eventName,
  eventLocation,
  eventTime,
  eventDate,
  numberOfGuests,
  eventDuration,
  additionalRequirements,
  additionalNote,
  amountPaid,
  timeLeft,
  requested_by,
  price,
  is_paid,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isClickCustomBooking, setIsClickCustomBooking] = useState(false)

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

  const handleClickCustomBooking = () => {
    setIsClickCustomBooking(true)
  }
  const handleCancelCustomBooking = () => {
    setIsClickCustomBooking(false)
  }
  console.log(is_paid)
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
        <div className="mx-auto bg-white rounded-xl space-y-4 w-full">
          <div className="flex items-center  space-x-4 mb-3 w-full">
            <div>
              <h1 className="font-bold text-[16px] underline underline-offset-4">
                User Details
              </h1>
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
            <p className="font-semibold">
              Booking For:{' '}
              <span className="font-normal bg-blue-100 px-3 py-1 rounded-lg">
                {bookingFor}
              </span>
            </p>

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
              <p className="font-semibold">Event Date:</p>

              <span>{eventDate}</span>
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

          {amountPaid && (
            <div className="bg-gray-100 text-center py-2 rounded-md text-blue-600 font-semibold">
              {amountPaid}
            </div>
          )}
          {bookingType === 'ongoing' && (
            <div className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md">
              <p>{timeLeft}</p>
            </div>
          )}

          {bookingType === 'requested' && requested_by === 'VENDOR' && (
            <div className="flex justify-end text-xl">
              <p className="font-semibold text-red-500">
                Price: {price} <span className='text-sm text-gray-500'>{is_paid ? '(Paid)' : '(Not Paid)'}</span>
              </p>
            </div>
          )}

          {bookingType === 'requested' && requested_by === 'USER' && (
            <div>
              <Button
                className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md w-full h-[42px]"
                onClick={handleClickCustomBooking}
              >
                Create Custom Booking
              </Button>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        visible={isClickCustomBooking}
        onCancel={handleCancelCustomBooking}
        footer={null}
        centered
      >
        <BookingRequestVendor user={userId} />
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

export default MyBookingsModelVendor
