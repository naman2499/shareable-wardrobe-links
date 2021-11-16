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
    setTimeout(() => {
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
          <Button
            type='button'
            variant='light'
          >
            <Link to={`/dashboard`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-journal-richtext" viewBox="0 0 16 16">
                <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>
            </Link>
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default WardrobeScreen
