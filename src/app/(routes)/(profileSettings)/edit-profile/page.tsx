'use client'
import { useEffect, useState } from 'react'
import Password from '../../../../components/profile/Password'
import { Button, Form, Input, message } from 'antd'
import Image from 'next/image'
import toast from 'react-hot-toast'
import {
  useGetProfileDataQuery,
  usePostProfileDataMutation,
} from '@/redux/profileApis'
import { url } from '@/redux/main/server'
import { IoCameraOutline } from 'react-icons/io5'
import Loader from '@/components/loading/ReactLoader'

type FormData = {
  name?: string
  email?: string
  phone?: string
  img?: string | null
}

type ProfileData = {
  data?: {
    name: string
    email: string
    phone: string
    img: string
  }
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { data: profileData, isLoading } = useGetProfileDataQuery()
  const [updateProfile, { isLoading: updateLoading }] =
    usePostProfileDataMutation()

  useEffect(() => {
    if (profileData?.data) {
      form.setFieldsValue({
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
      })

      if (profileData.data.img) {
        setImagePreview(`${url}/${profileData.data.img}`)
      }
    }


   

  }, [profileData, form])

  if (isLoading) return <Loader />

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleUpdate = async () => {
    if (isEditing) {
      try {
        const values = await form.validateFields()

        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('phone', values.phone)

        if (imageFile) {
          formData.append('img', imageFile)
        }

        const response = await updateProfile(formData).unwrap()
        toast.success(response?.message || 'Profile updated successfully!')
        setIsEditing(false)

        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview)
        }
      } catch (error: any) {
        if (error?.data?.message) {
          toast.error(error.data.message)
        } else {
          toast.error('Failed to update profile.')
        }
      }
    } else {
      setIsEditing(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="shadow-md rounded-lg p-8 w-full max-w-3xl">
        <div className="text-2xl font-bold text-center m-5 mb-7">
          Update Your Profile
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-[140px] h-[140px] mx-auto">
            <input
              type="file"
              onChange={handleImageChange}
              id="img"
              style={{ display: 'none' }}
              accept="image/*"
            />
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={140}
                height={140}
                className="border-2 p-[2px] w-[140px] h-[140px] object-cover rounded-full"
              />
            ) : (
              <div className="w-[140px] h-[140px] bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <label
              htmlFor="img"
              className={`
                absolute bottom-0 right-0
                bg-[var(--primary-color)]
                rounded-full
                w-10 h-10
                flex items-center justify-center
                cursor-pointer
                ${!isEditing && 'pointer-events-none opacity-50'}
              `}
            >
              <div className="bg-yellow p-2 rounded-full">
                <IoCameraOutline className="text-4xl bg-white p-1 rounded-full hover:bg-gray-300" />
              </div>
            </label>
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            {profileData?.data?.name || ''}
          </h2>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-800 text-blue-800'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 cursor-pointer ${
              activeTab === 'password'
                ? 'border-b-2 border-blue-800 text-blue-800'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="flex flex-col items-center">
            <div className="rounded-lg w-full max-w-3xl">
              <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ message: 'Please enter your name' }]}
                >
                  <Input disabled={!isEditing} className="h-[40px]" />
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input disabled className="h-[40px]" />
                </Form.Item>

                <Form.Item
                  label="Contact Number"
                  name="phone"
                  rules={[
                    {
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input disabled={!isEditing} className="h-[40px]" />
                </Form.Item>

                <div className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    onClick={handleUpdate}
                    loading={updateLoading}
                  >
                    {isEditing ? 'Save' : 'Update Now'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {activeTab === 'password' && <Password />}
      </div>
    </div>
  )
}

export default Profile
