'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, ChevronDown, Info } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  dentalWorkType: string
  timeframe: string
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Map our form values to exact Google Forms option text
      const dentalWorkTypeMap: Record<string, string> = {
        'cleaning-checkup': 'Cleaning / Checkup',
        'fillings': 'Fillings',
        'crowns-bridges': 'Crowns / Bridges',
        'implants': 'Dental Implants',
        'veneers-cosmetic': 'Veneers / Cosmetics',
        'root-canal': 'Root Canal',
        'extraction': 'Extraction',
        'dentures': 'Dentures',
        'other-multiple': 'Other / Multiple Procedures',
      }

      const timeframeMap: Record<string, string> = {
        'within-1-month': 'Within 1 month',
        '1-3-months': '1-3 months',
        '3-6-months': '3-6 months',
        'researching': 'Just researching options',
      }

      const formData = new URLSearchParams()
      formData.append('entry.141213607', data.name)
      formData.append('entry.607915724', data.phone)
      formData.append('entry.348284541', dentalWorkTypeMap[data.dentalWorkType] || data.dentalWorkType)
      formData.append('entry.199398544', timeframeMap[data.timeframe] || data.timeframe)

      const response = await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSc1qOkb9JVlkcJ6JMocOp9tDC5FDNZ29SSOLW0PCXJNVxXelQ/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        }
      )

      setIsSubmitted(true)
      setIsSubmitting(false)
      reset()
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('There was an error submitting your request. Please try again.')
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      title: 'Free Introduction Service',
      description:
        'No cost to you. We connect you with dentists who regularly work with foreign patients.',
    },
    {
      title: 'English-Speaking Clinics',
      description:
        'All dentists in our network communicate fluently in English and understand the needs of international patients.',
    },
    {
      title: 'You Choose Who to Contact',
      description:
        "We provide information about multiple clinics. You decide which one(s) you'd like to speak with directly.",
    },
    {
      title: 'Established Practices',
      description:
        'We only work with dental offices that have experience treating foreign patients and are located in Puerto Vallarta.',
    },
  ]

  const faqs = [
    {
      question: 'Is there a cost to use this service?',
      answer:
        'No, there is no cost to you as a patient. Our service is free for people looking to connect with dentists in Puerto Vallarta. We are compensated by the dental clinics in our network.',
    },
    {
      question: 'Do I need to be in Puerto Vallarta already?',
      answer:
        'No, you can request an introduction before traveling. Many people use our service while planning their trip. Once connected, you can discuss scheduling directly with the dentist.',
    },
    {
      question: 'How will the dentist contact me?',
      answer:
        "After you choose which dentist you'd like to speak with, we'll facilitate the introduction via WhatsApp or your preferred contact method. From there, you communicate directly with the dental office.",
    },
    {
      question: 'Can I be introduced to more than one dentist?',
      answer:
        'Yes, absolutely. We encourage you to explore multiple options so you can make an informed decision about which dentist is the best fit for you.',
    },
    {
      question: "What if I'm not satisfied with the dentist options?",
      answer:
        "You're under no obligation to proceed with any dentist we introduce you to. Our role is simply to make the connection—all decisions about treatment are entirely yours.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Form Above the Fold */}
      <section
        className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-12 md:py-20"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Form */}
            <div className="lg:sticky lg:top-8 order-1 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Request an Introduction
              </h2>
              <p className="text-gray-600 mb-6">
                Tell us what you're looking for and we'll connect you with the
                right dentists
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-800 font-medium">
                    Thank you! We will contact you via WhatsApp within 24 hours
                    to discuss your options.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm">{submitError}</p>
                    </div>
                  )}
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('name', { required: 'Full name is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent text-gray-900"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent text-gray-900"
                    />
                    <div className="flex items-start gap-2 mt-2 text-xs text-gray-600">
                      <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <p>
                        Dental offices in Mexico commonly use WhatsApp for scheduling and contacting clients.
                      </p>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Dental Work Type */}
                  <div>
                    <label
                      htmlFor="dentalWork"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      What type of dental work are you considering? *
                    </label>
                    <select
                      id="dentalWork"
                      {...register('dentalWorkType', {
                        required: 'Please select a dental work type',
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent text-gray-900"
                    >
                      <option value="">Select an option</option>
                      <option value="cleaning-checkup">
                        Cleaning / Checkup
                      </option>
                      <option value="fillings">Fillings</option>
                      <option value="crowns-bridges">Crowns / Bridges</option>
                      <option value="implants">Dental Implants</option>
                      <option value="veneers-cosmetic">
                        Veneers / Cosmetics
                      </option>
                      <option value="root-canal">Root Canal</option>
                      <option value="extraction">Extraction</option>
                      <option value="dentures">Dentures</option>
                      <option value="other-multiple">
                        Other / Multiple Procedures
                      </option>
                    </select>
                    {errors.dentalWorkType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dentalWorkType.message}
                      </p>
                    )}
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label
                      htmlFor="timeframe"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      When are you planning to visit Puerto Vallarta? *
                    </label>
                    <select
                      id="timeframe"
                      {...register('timeframe', {
                        required: 'Please select a timeframe',
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent text-gray-900"
                    >
                      <option value="">Select a timeframe</option>
                      <option value="within-1-month">Within 1 month</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="researching">Just researching options</option>
                    </select>
                    {errors.timeframe && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.timeframe.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#667eea] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#5568d3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Connected'}
                  </button>
                </form>
              )}
            </div>
            </div>

            {/* Right Column - Hero Text and Benefits */}
            <div className="space-y-8 order-2 lg:order-2">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Get Connected With Verified English-Speaking Dentists in Puerto
                  Vallarta
                </h1>
                <p className="text-xl md:text-2xl text-white/90">
                  We introduce US and Canadian patients to established dental clinics
                  in Puerto Vallarta. Simple, transparent, no obligations.
                </p>
              </div>
              
              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#667eea] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Submit Your Request
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fill out the form with your information and what type of dental
                work you're considering.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#667eea] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Review Your Options
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We'll contact you over WhatsApp to share information about dentists in our network who match
                your needs. You choose who interests you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#667eea] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Connect Directly
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We introduce you to your selected dentist(s). You communicate
                directly with them to book appointments and discuss details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 flex-shrink-0 transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 leading-relaxed text-center">
            <strong>Important:</strong> We are a connection service that
            introduces patients to dental clinics in Puerto Vallarta. We do not
            provide medical advice, diagnose conditions, or coordinate medical
            appointments. All treatment decisions, scheduling, and communications
            happen directly between you and the dental office you choose. We are
            not a healthcare provider or medical broker.
          </p>
        </div>
      </section>
    </div>
  )
}
