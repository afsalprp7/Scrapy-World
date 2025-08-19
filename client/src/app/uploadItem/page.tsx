'use client'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { UploadForm } from '@/components/UploadFormComponent/UploadForm'
import WrapperAuth from '@/components/wrapper/WrapperAuth'
import React from 'react'

 function page() {
  return (
    <div>
      <Navbar/>
      <UploadForm/>
      <Footer/>
    </div>
  )
}

export default WrapperAuth(page)