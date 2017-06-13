import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RightLeft from '../styled/right-left'

const generateText = track =>
  `#nowplaying ${track.artist['#text']} – ${track.name}`

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="#25D366"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" /></svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="#55ACEE"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" /></svg>
)

const ShareIcon = () => (
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
)

const Flex = styled.div`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: .5rem;
  }
`

const ShareLink = ({ href, children }) => (
  <a href={href} rel="noopener noreferrer">{children}</a>
)

ShareLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

const ShareButton = styled.a`
  padding: .5rem;
  border-radius: 50%;
  line-height: 0;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  :hover {
    background: #eee;
  }

  :active {
    background: #ddd;
  }
`

const Share = ({ track }) => {
  const text = generateText(track)
  const { url } = track
  const share = async () => {
    try {
      await navigator.share({
        title: '#nowplaying', text, url: window.location.href
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }
  return (
    <RightLeft>
      <Flex>
        <ShareLink href={`https://twitter.com/intent/tweet?url=${
          encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}
        ><TwitterIcon /></ShareLink>
        <ShareLink href={`whatsapp://send?text=${
          encodeURIComponent(`${text} ${url}`)}`}
        ><WhatsAppIcon /></ShareLink>
      </Flex>
      {navigator.share && <ShareButton onClick={share}>
        <ShareIcon />
      </ShareButton>}
    </RightLeft>
  )
}

Share.propTypes = {
  track: PropTypes.shape({
    url: PropTypes.string,
    artist: PropTypes.shape({
      '#text': PropTypes.string
    }),
    name: PropTypes.string
  }).isRequired
}
// https://twitter.com/intent/tweet?url=https://google.com&text=text
export default Share
