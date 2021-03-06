import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Map from './Map.jsx'

import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Image from 'grommet/components/Image'
import Button from 'grommet/components/Button'
import Carousel from 'grommet/components/Carousel'

class Winner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winBusiness: {},
      isMapShowing: false
    }
    this.populateState = this.populateState.bind(this)
    this.toggleMap = this.toggleMap.bind(this)
  }

  componentWillMount () {
    this.populateState()
  }

  populateState () {
    axios.get('/api/groups/' + this.props.name + '/winner')
    .then((res) => {
      this.setState({winBusiness: res.data.winBusiness})
    })
    .then(() => {
      if (localStorage.getItem('username')) {
        let username = localStorage.getItem('username')
        let business = this.state.winBusiness

        axios.post('/user/addBusiness',
          {
            username: username,
            business: business
          })
        .then(() => {
          console.log('updated business')
        })
        .catch((err) => {
          console.error(err)
        })
      }
    })
  }

  toggleMap (event) {
    this.setState({isMapShowing: !this.state.isMapShowing})
  }

  carouselShow () {
    const imgs = this.state.winBusiness.photos.map((photo, index) => {
      return (<Box basis='full'
        justify='center'
        flex='shrink'
        align='center'
        pad='small'
        colorIndex='light-2'>
        <Image key={photo} src={photo} />
      </Box>)
    })

    return (
      <Carousel>
        {imgs}
      </Carousel>
    )
  }

  render () {
    if (this.state.isMapShowing === false) {
      return (
        <Article
          margin={{
            'left': 'large',
            'right': 'large',
            'top': 'small',
            'bottom': 'small'}}
          pad={{'top': 'none',
            'right': 'none',
            'left': 'none',
            'bottom': 'none'}}
          justify='center'
          align='center'>
          <Section>
            <h3>{this.state.winBusiness.name}</h3>
          </Section>
          <Section>
            { this.state.winBusiness.photos && this.carouselShow() }
          </Section>
          <Section
            pad={{'top': 'none',
              'bottom': 'none'}}
            margin={{
              'top': 'none',
              'bottom': 'none'}}
            justify='center'
            align='center'
            textAlign='center'>
            <Section>
              {this.state.winBusiness.categories ? this.state.winBusiness.categories.map((catogs) => {
                return <div key={catogs.title}>{catogs.title}</div>
              }) : null }
              <br />
              <hr />
              <div onClick={this.toggleMap}>
                {this.state.winBusiness.location ? this.state.winBusiness.location.display_address.map((add) => {
                  return <div key={add}>{add}</div>
                }) : null}
                <br />
                <hr />
              </div>
              <p>{this.state.winBusiness.display_phone ? this.state.winBusiness.display_phone : 'Number Not Available'}</p>
              <p>{this.state.winBusiness.price}</p>
            </Section>
          </Section>
        </Article>
      )
    } else {
      return (
        <Box margin={{
          'left': 'large',
          'right': 'large',
          'top': 'small',
          'bottom': 'small'}}
          pad={{'top': 'none',
            'right': 'none',
            'left': 'none',
            'bottom': 'none'}}
          justify='center'
          align='center'>
          <div>
            { this.state.winBusiness.coordinates ? <Map lat={this.state.winBusiness.coordinates.latitude}
              long={this.state.winBusiness.coordinates.longitude} />
              : null
            }
          </div>
          <div>
            <Button
              label='Back'
              secondary
              accent
              onClick={this.toggleMap} />
          </div>
        </Box>
      )
    }
  }
}

export default Winner
