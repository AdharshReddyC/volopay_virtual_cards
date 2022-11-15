import {AiFillFire} from 'react-icons/ai'
import {FiRefreshCw} from 'react-icons/fi'
import {BsFillCircleFill} from 'react-icons/bs'

import './index.css'

import Progressbar from '../Progressbar'

const Card = props => {
  const {cardData} = props
  const {
    name,
    budgetName,
    ownerId,
    spent,
    availableToSpend,
    cardType,
    expiry,
    limit,
    status,
    cardHolder,
  } = cardData

  const spentPercentage = Math.ceil(
    (parseInt(spent.value) /
      (parseInt(availableToSpend.value) + parseInt(spent.value))) *
      100,
  )

  const expiryDate = new Date(expiry)

  return (
    <div className="card-container">
      <div className="card-top-container">
        <div className="card-top-left-container">
          <h1 className="name">{name}</h1>
          <div className="user-details-container">
            <p className="user-details-item">{cardHolder}</p>
            <p className="user-details-item">.</p>
            <p className="user-details-item">{budgetName}</p>
          </div>
          <p className="card-type">{cardType.toUpperCase()}</p>
        </div>

        <div className="card-top-right-container">
          {cardType === 'burner' ? (
            <p className="card-type-icon-container">
              <AiFillFire className="card-type-icon" />
            </p>
          ) : (
            <p className="card-type-icon-container">
              <FiRefreshCw className="card-type-icon" />
            </p>
          )}
          {cardType === 'burner' ? (
            <p className="expires-or-limit">
              Expires: {expiryDate.getDate()}&nbsp;
              {expiryDate.toLocaleString('default', {month: 'short'})}
            </p>
          ) : (
            <p className="expires-or-limit">August Limit:180&nbsp;SGD</p>
          )}
        </div>
      </div>
      <Progressbar spentPercentage={spentPercentage} />
      <div className="spending-list">
        <li className="spent-item">
          <p>
            <BsFillCircleFill className="spent-circle-icon" />
            Spent
          </p>
          <p>
            {spent.value} &nbsp;{spent.currency}
          </p>
        </li>
        <li className="available-to-spend-item">
          <p>
            <BsFillCircleFill className="available-circle-icon" />
            Available to spend
          </p>
          <p>
            {availableToSpend.value}&nbsp;{availableToSpend.currency}
          </p>
        </li>
      </div>
    </div>
  )
}

export default Card
