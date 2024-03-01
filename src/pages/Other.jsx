import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { motion } from 'framer-motion';
import '../styling/Resources.scss'
import foggedImg from '../imgs/fogged.jpg'; 
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';


function Other() {

  useEffect(() => {
    ScrollReveal().reveal('#animation', { delay: 400 });
    ScrollReveal().reveal('#bottom-anime', {
      origin: 'bottom',
      distance: '20px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out',
  });
  }, [])

  return (
    <Container fluid className='main-res'>
      <Container fluid className='res-container'>
          <div className="text-container">
            <h1>Special Shoutout</h1>
            <p>To Foggedftw2 for providing all the matchup information from his <a href='https://docs.google.com/spreadsheets/d/1xYhZoWcXslNSJMC4U0cZNiaYyZn79Peqr5m0SsunC7w/edit#gid=00' target='_blank' rel="noreferrer">excel</a> sheet!</p>
          </div>
      </Container>
      <div className="middle-container" id='animation'> 
        <div className='middle-title'>
          <h1>League Streamers</h1>
          <p>The following streamers are a great resource for additional Tryndamere tech!</p>
        </div>
      </div>
      <Container id='bottom-anime'>
        <Row className='card-row'>
          <div className="card-container-res">
            <div className="img-container">
              <img src={foggedImg} alt="foogedProfile" />
            </div>
            <h1>Foggedftw2</h1>
            <div className="icons">
              <motion.a  href="https://www.youtube.com/channel/UCaGzBvuWK_FtOSyt2CXAp7A" target='_blank' rel="noreferrer" whileHover={{scale: 1.2}}> 
                <FontAwesomeIcon icon={faYoutube} />
              </motion.a>
              <a href="https://twitter.com/foggedftw2" target='_blank' rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://discord.com/invite/zQPaRBq" target='_blank' rel="noreferrer">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a href="https://www.twitch.tv/foggedftw2" target='_blank' rel="noreferrer">
                <FontAwesomeIcon icon={faTwitch} />
              </a>
            </div>
            <p>"My name is Danny and I am a Challenger Tryndamere main I have been playing league since the end of season 3 and Tryndamere since the end of season 5, and have played Tryndamere into every matchup, in every lane."</p>
            <p>Fogged not only does an amazing at explaining trynd matchups but he also goes over Micro and Macro very well! Make sure to checkout his youtube and twitch and make sure to ask about his coaching in his streams!</p>
          </div>
        </Row>
      </Container>
    </Container>
  )
}

export default Other;