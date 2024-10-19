"use client";
import React from 'react'
import { SidebarScore } from '../components/Sidebar_Score';
import Footer from '../components/Footer';

const page = () => {
  return (<>
    <div>
        <SidebarScore />
    </div>
    <Footer />
    </>
  )
}

export default page