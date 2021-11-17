import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { Row, Col, Image, ListGroup, Card, Button, Form, Dropdown} from 'react-bootstrap'


const HomeScreen = ({ match }) => {

  const wardrobeName = match.params.wardrobeName

  const [countData, setCountData] = useState([])

  useEffect(async () =>{
    const res = await fetch("/api/counter")
    const graph_data = await res.json()
    setCountData(graph_data)
  }, [])

  return (
    <>
      <h1>{wardrobeName}</h1>
      <Button
        variant='success'
        className='btn-block'
        type='button'
        disabled={true}
      >
        Visitors: {countData.length}
      </Button>
    </>
  )
}

export default HomeScreen
