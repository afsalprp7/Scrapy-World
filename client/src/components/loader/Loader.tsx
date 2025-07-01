import React from 'react'
import Image from 'next/image';
import logo_image from '../../../public/favicon_io/android-chrome-192x192.png'

function Loader() {
  return (
    <div>
      <div className='h-screen w-full bg-white flex items-center justify-center'>
        <div>
        <Image width={80} height={80} src={logo_image} alt='logo' className='animate-spin'/>
        <p className='text-center'>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
