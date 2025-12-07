import React from 'react'
import Navbar from '~/components/header/new/Navbar'
import NormalNavbar from '~/components/header/new/NormalNavbar'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SrchBarHome from '~/components/header/new/SrchBarHome'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import MainNav from '~/components/header/v1/MainNav'
import { appConfig } from '~/lib/lib'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-full w-full bg-white`}>
      <MainNav />
      {/* <MainNav /> */}
      {/* <SrchBarHome /> */}

      <main className={`h-full flex w-full flex-col mt-[${appConfig.NAVBAR_HEIGHT}px]`}

      >

        {children}
      </main>
    </div>
  )
}

export default HomeLayout
