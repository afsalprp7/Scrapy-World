import Footer from '@/components/footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { UploadForm } from '@/components/UploadFormComponent/UploadForm'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <UploadForm/>
      <Footer/>
    </div>
  )
}
