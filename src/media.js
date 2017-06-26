import { css } from 'styled-components'

export default {
  desktop: (...args) => css`
    @media (min-width: 40rem) {
      ${css(...args)}
    }
  `
}
