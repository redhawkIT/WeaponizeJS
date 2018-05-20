import React, { Component } from 'react'
import { FaGithubAlt, FaExternalLink } from 'react-icons/lib/fa'
import { MdEmail } from 'react-icons/lib/md'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`

const UserIcon = styled.a`
  margin-left: 25px;
  color: white;
  &:hover {
    color: rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }
`

const iconStyle = {
  width: '20px',
  height: '20px'
}

class UserLinks extends Component {
  render () {
    return (
      <Container className='user-links'>
        <UserIcon href='https://github.com/RcKeller'>
          <FaGithubAlt style={iconStyle} />
        </UserIcon>
        <UserIcon href='https://rykeller.com'>
          <FaExternalLink style={iconStyle} />
        </UserIcon>
        <UserIcon href='mailto:rykeller@uw.edu'>
          <MdEmail style={iconStyle} />
        </UserIcon>
      </Container>
    )
  }
}

export default UserLinks
