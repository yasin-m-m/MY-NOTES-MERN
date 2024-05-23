import React from 'react'

const Footer = () => {
  const date=new Date()
  let year=date.getFullYear()
  return (
    <footer className='text-center mx-2 mt-3 px-2 pt-2 bg-blue-500 text-white'>Copyright &copy; {year} By Yasin M M Projects </footer>
  )
}

export default Footer