import {Link} from 'react-router-dom'
import {BiVideo} from 'react-icons/bi'
import {AiOutlinePlus, AiFillAppstore, AiOutlineMenu} from 'react-icons/ai'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="header-top-container">
      <div className="header-top-left-container">
        <h1 className="virtual-cards-heading">Virtual Cards</h1>
        <p className="learn-more-text">
          <BiVideo className="video-icon" />
          Learn more
        </p>
      </div>
      <button type="button" className="add-virtual-card-button">
        <AiOutlinePlus className="plus-icon" /> Virtual Card
      </button>
    </div>
    <div className="header-bottom-container">
      <ul className="tab-names-list">
        <li className="link-item">
          <Link to="/your" className="route-link">
            Your
          </Link>
        </li>

        <li className="link-item">
          <Link to="/all" className="route-link">
            All
          </Link>
        </li>

        <li className="link-item">
          <Link to="/blocked" className="route-link">
            Blocked
          </Link>
        </li>
      </ul>
      <div className="layout-change-container">
        <button className="layout-change-button">
          <AiFillAppstore />
        </button>
        <button className="layout-change-button">
          <AiOutlineMenu />
        </button>
      </div>
    </div>
    <hr className="horizontal-line" />
  </nav>
)

export default Header
