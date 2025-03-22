import { Button, Input, Modal, Rate } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Payment from '../payment/Payment'
import toast from 'react-hot-toast'

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
}

const MyBookingsModelVendor = ({
  id,
  bookingType,
  image,
  name,
  email,
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
  timeLeft,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const [isEditing, setIsEditing] = useState(false)

  const [editedEventName, setEditedEventName] = useState(eventName)
  const [editedEventLocation, setEditedEventLocation] = useState(eventLocation)
  const [editedEventTime, setEditedEventTime] = useState(eventTime)
  const [editedNumberOfGuests, setEditedNumberOfGuests] =
    useState(numberOfGuests)
  const [editedEventDuration, setEditedEventDuration] = useState(eventDuration)
  const [editedAdditionalRequirements, setEditedAdditionalRequirements] =
    useState(additionalRequirements)
  const [editedAdditionalNote, setEditedAdditionalNote] =
    useState(additionalNote)

  const getImageSrc = () => {
    if (!image || image.includes('undefined')) {
      return '/placeholder.png'
    }
    return image
  }

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
        // cancelText={
        //   bookingType === 'paymentRequest' ? (
        //     <div onClick={handlePaymentClick} style={{ color: 'red' }}>
        //       Payment
        //     </div>
        //   ) : bookingType === 'completed' ? (
        //     <div onClick={() => setIsReviewModalOpen(true)}>Get Rating</div>
        //   ) : null
        // }
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
            <p className="font-semibold">
              Booking For:{' '}
              <span className="font-normal bg-blue-100 px-3 py-1 rounded-lg">
                {bookingFor}
              </span>
            </p>

            <div>
              <p className="font-semibold">Event Name:</p>
              {isEditing ? (
                <Input
                  value={editedEventName}
                  onChange={(e) => setEditedEventName(e.target.value)}
                />
              ) : (
                <span>{eventName}</span>
              )}
            </div>
            <div>
              <p className="font-semibold">Event Location:</p>
              {isEditing ? (
                <Input
                  value={editedEventLocation}
                  onChange={(e) => setEditedEventLocation(e.target.value)}
                />
              ) : (
                <span>{eventLocation}</span>
              )}
            </div>
            <div>
              <p className="font-semibold">Event Time:</p>
              {isEditing ? (
                <Input
                  value={editedEventTime}
                  onChange={(e) => setEditedEventTime(e.target.value)}
                />
              ) : (
                <span>{eventTime}</span>
              )}
            </div>
            <div>
              <p className="font-semibold">Number of guests:</p>
              {isEditing ? (
                <Input
                  value={editedNumberOfGuests?.toString()}
                  onChange={(e) =>
                    setEditedNumberOfGuests(Number(e.target.value))
                  }
                />
              ) : (
                <span>{numberOfGuests}</span>
              )}
            </div>
            <div>
              <p className="font-semibold">Event Duration:</p>
              {isEditing ? (
                <Input
                  value={editedEventDuration}
                  onChange={(e) => setEditedEventDuration(e.target.value)}
                />
              ) : (
                <span>{eventDuration}</span>
              )}
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
            {isEditing ? (
              <Input.TextArea
                value={editedAdditionalRequirements}
                onChange={(e) =>
                  setEditedAdditionalRequirements(e.target.value)
                }
              />
            ) : (
              <p>{additionalRequirements || 'None specified'}</p>
            )}
          </div>

          <div className="text-gray-600 text-sm">
            <p className="font-semibold">Additional Note:</p>
            {isEditing ? (
              <Input.TextArea
                value={editedAdditionalNote}
                onChange={(e) => setEditedAdditionalNote(e.target.value)}
              />
            ) : (
              <p>{additionalNote || 'None specified'}</p>
            )}
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
        </div>
      </Modal>

      <Modal
        open={isPaymentModalOpen}
        onCancel={handlePaymentModalCancel}
        footer={null}
        centered
      >
        <Payment />
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
