import React from 'react'
import Image from 'next/image'

function Banner() {
  return (
    <div className='w-full bg-white pt-12 md:pt-24 overflow-hidden'>
        {/* Banner Image - Full Width */}
        <div className='relative w-full h-auto'>
            <Image 
                src="/banner-1.png" 
                alt="banner" 
                width={1920} 
                height={600} 
                className="w-full h-auto object-cover min-h-[150px]"
                unoptimized
            />
        </div>
        
        {/* Blocks Section - Full Width */}
        <div className='w-full py-8 md:py-12 overflow-hidden px-4 md:px-8 max-w-full mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-center justify-items-center'>
                <div className="w-full">
                    <Image src="/block-1.png" alt="block-1" width={600} height={300} className="w-full h-auto object-contain max-h-32 md:max-h-52 lg:max-h-64" unoptimized />
                </div>
                <div className="w-full">
                    <Image src="/block-2.png" alt="block-2" width={600} height={300} className="w-full h-auto object-contain max-h-32 md:max-h-52 lg:max-h-64" unoptimized />
                </div>
                <div className="w-full">
                    <Image src="/block-3.png" alt="block-3" width={600} height={300} className="w-full h-auto object-contain max-h-32 md:max-h-52 lg:max-h-64" unoptimized />
                </div>
                <div className="w-full">
                    <Image src="/block-4.png" alt="block-4" width={600} height={300} className="w-full h-auto object-contain max-h-32 md:max-h-52 lg:max-h-64" unoptimized />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner