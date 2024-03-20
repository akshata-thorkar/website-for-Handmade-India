import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"
import ScrollingHeadlines from "./headline"
const headlines = [
  'Breaking News 1',

  // Add more headlines as needed
];

const Header = ({ CartItem }) => {
  return (
    <>
      <Head />
      <Search CartItem={CartItem} />
      <ScrollingHeadlines headlines={headlines} />
      <Navbar />
    </>
  )
}

export default Header
