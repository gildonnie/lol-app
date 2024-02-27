import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styling/Resources.scss'
import resorImg from '../imgs/reso.jpg';
import TryndMatchups from '../components/TryndMatchups.json';

function Other() {


  return (
    <Container fluid className='main-res'>
      <Container fluid className='res-container'>
        <Row>
          {/* <h1>Resources</h1> */}
        </Row>
      </Container>
      <div className="middle-container">
        <div className='middle-title'>
          <h1>League Streamers</h1>
          <h2>Tryndamere Mains</h2>
        </div>
      </div>
    </Container>
  )
}

export default Other;