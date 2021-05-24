import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const Rating =(props)=>{
    const { ratingValue } = props
    let CheckRating = [], negativeRating = 5-ratingValue;
    for(let Count=0;Count<ratingValue;Count++) {CheckRating.push("orange")}
    for(let Count=0;Count<negativeRating;Count++) {CheckRating.push("gray")}
    return<div>{CheckRating.map((SetColor, index)=><FontAwesomeIcon key={index} icon={faStar} color={SetColor} />)}</div>
  };

  Rating.propTypes = {
    ratingValue: PropTypes.number
  }

  export default Rating; 