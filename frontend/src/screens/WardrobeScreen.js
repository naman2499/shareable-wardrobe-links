import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToWardrobe, removeFromWardrobe } from '../actions/wardrobeActions'

const WardrobeScreen = ({ match }) => {
  const [color, setColor] = useState('dark');
  const [text, setText] = useState('Copy Shareable Link!');
  const productId = match.params.id

  const dispatch = useDispatch()

  const wardrobe = useSelector((state) => state.wardrobe)
  const { wardrobeItems } = wardrobe

  useEffect(() => {
    if (productId) {
      dispatch(addToWardrobe(productId))
    }
  }, [dispatch, productId])

  const removeFromWardrobeHandler = (id) => {
    dispatch(removeFromWardrobe(id))
  }
  const BITLY_URL = "https://api-ssl.bitly.com/v4/shorten"
  const BITLY_API_TOKEN = ""

  const shortenUrl = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', BITLY_API_TOKEN)

    let currentUrl = window.location.href;
    let res = await fetch(BITLY_URL, {
      method: 'POST',
      body: {
        "long_url": currentUrl,

      }
    })
    console.log(res)
    let shortenedUrl = res.body["link"]
    return shortenedUrl
  }
  
  const clickHandler = () => {
    let smallUrl = shortenUrl() || window.location.href
    navigator.clipboard.writeText(smallUrl)
    setText('Copied Link!')
    setColor('success')
    setTimeout(() =>{
      setColor('dark')
      setText('Copy Shareable Link!')
    }, 3000)
  }

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1>Wardrobe - Classical</h1>
          {wardrobeItems.length === 0 ? (
            <Message>
              Your wardrobe is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {wardrobeItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>₹{item.price}</Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromWardrobeHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Button
            type='button'
            variant={color}
            onClick={clickHandler}
          > {text}</Button>
        </Col>
      </Row>
    </div>
  )
}

export default WardrobeScreen
