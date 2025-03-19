'use client'
import { useState } from 'react'
import { useCreateBusinessMutation } from '@/redux/businessApis'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const BusinessCreate = () => {
  const router = useRouter()
  const [createBusiness, { isLoading }] = useCreateBusinessMutation()

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    trade_license: '',
  })

  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()

      formDataToSend.append('name', formData.name)
      formDataToSend.append('address', formData.address)
      formDataToSend.append('trade_license', formData.trade_license)

      if (logo) {
        formDataToSend.append('banner', logo)
      }

      const response = await createBusiness(formDataToSend).unwrap()

      if (response.success) {
        toast.success('Business created successfully!')
        router.push('/businesses')
      } else {
        toast.error(response.message || 'Failed to create business')
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
      console.error('Error creating business:', error)
    }
  }

  return (
    <div className="responsive-width py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-6 px-8">
          <h1 className="text-2xl font-bold text-white">
            Register Your Business
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 text-center">
                <p className="font-medium text-gray-700 mb-2 ">Business Logo</p>
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm text-center px-2">
                      Upload logo
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your business name"
              />
            </div>

            {/* Business Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Address*
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your complete business address"
              ></textarea>
            </div>

            {/* Trade License */}
            <div>
              <label
                htmlFor="trade_license"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Trade License Number*
              </label>
              <input
                type="text"
                id="trade_license"
                name="trade_license"
                value={formData.trade_license}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your trade license number"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Register Business'
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              By registering, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BusinessCreate
