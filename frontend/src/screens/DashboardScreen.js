import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {

  useEffect(()=>{
    // setTimeout(()=>document.getElementById("editMe").style.visibility = "hidden", 5000)
  }, [])

  return (
    <>
      <Meta />
    </>
  )
}

export default HomeScreen
