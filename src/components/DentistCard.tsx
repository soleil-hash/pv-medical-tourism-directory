'use client'

import { MapPin, Star, DollarSign } from 'lucide-react'
import { DentistCardProps } from '@/types/dentist'

export function DentistCard({ dentist, onClick }: DentistCardProps) {
  const displayedServices = dentist.services.slice(0, 2)
  const additionalServicesCount = dentist.services.length - 2

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#D6D3CE] hover:border-[#B06A4A] flex overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative w-48 flex-shrink-0">
        <img
          src={dentist.image}
          alt={dentist.name}
          className="w-full h-full object-cover"
        />
        {/* Rating Badge Overlay */}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[#2E2E2C]">{dentist.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Dentist Name */}
          <h3 className="text-lg font-bold text-[#2E2E2C]">{dentist.name}</h3>

          {/* Practice Name */}
          <p className="text-sm font-medium text-[#B06A4A]">
            {dentist.practice}
          </p>

          {/* Specialty */}
          <p className="text-xs text-[#7C8475]">{dentist.specialty}</p>

          {/* Location and Price */}
          <div className="flex items-center gap-4 text-xs text-[#7C8475]">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{dentist.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{dentist.price}</span>
            </div>
          </div>

          {/* Service Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {displayedServices.map((service, index) => (
              <span
                key={index}
                className="bg-[#F6F5F2] text-[#2E2E2C] px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {service}
              </span>
            ))}
            {additionalServicesCount > 0 && (
              <span className="text-xs text-[#7C8475]">
                +{additionalServicesCount} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
