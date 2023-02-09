import PropTypes from 'prop-types'
import{Btn} from './Button.styled'

function Button({incrementPage}) {
  return (

    <Btn type="button" onClick={incrementPage}>Load more</Btn>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
}

export default Button
