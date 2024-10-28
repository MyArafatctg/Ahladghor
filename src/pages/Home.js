import React from 'react'
import Hero from '../components/Hero'
import LetestCollection from '../components/LetestCollection'
import BestSaller from '../components/BestSaller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LetestCollection/>
      <BestSaller/>
      <OurPolicy/>
      <NewsLetter/>
    </div>
  )
}

export default Home
