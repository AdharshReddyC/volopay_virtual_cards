import {Component} from 'react'

import InfiniteScroll from 'react-infinite-scroller'
import Progressbar from '../Progressbar'
import Card from '../Card'
import FiltersSection from '../FiltersSection'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    cardsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    cardTypeList: [],
    page: 1,
  }

  componentDidMount() {
    this.getCardsData()
  }

  changeSearchInput = searchInput => {
    console.log('triggerd')
    this.setState({searchInput}, this.getCardsData)
  }

  applyFilters = (cardHolder, cardType1, cardType2) => {
    console.log(cardHolder, cardType1, cardType2)
    const {cardsList} = this.state
  }

  getCardsData = async () => {
    console.log('called')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput, cardTypeList, cardsList, page} = this.state
    console.log('cards list')

    console.log(cardTypeList)
    console.log(cardsList)
    const cardType = ''
    const apiUrl = `https://636f73bcf2ed5cb047dd8750.mockapi.io/cards?page=${page}&limit=10`

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.map(card => ({
        name: card.name,
        budgetName: card.budget_name,
        ownerId: card.owner_id,
        spent: card.spent,
        availableToSpend: card.available_to_spend,
        cardType: card.card_type,
        expiry: card.expiry,
        limit: card.limit,
        status: card.status,
        id: card.id,
        cardHolder: card.card_holder,
      }))
      console.log(updatedData)
      this.setState({
        cardsList: [...cardsList, ...updatedData],
        apiStatus: apiStatusConstants.success,
        page: page + 1,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <h1>Loading....</h1>
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderCardsListView = () => {
    const {cardsList} = this.state

    return (
      <div className="all-products-container">
        <ul className="cards-list">
          {cardsList.map(card => (
            <Card cardData={card} key={card.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderInfiniteCards = () => {
    const {cardsList, page} = this.state
    const hasMore = true
    return (
      <InfiniteScroll
        loadMore={this.getCardsData}
        loader={<h1>loadingggggg....</h1>}
        hasMore={hasMore}
      >
        <div className="all-products-container">
          <ul className="cards-list">
            {cardsList.map(card => (
              <Card cardData={card} key={card.id} />
            ))}
          </ul>
        </div>
      </InfiniteScroll>
    )
  }

  renderVirtualCards = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCardsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="App">
        <FiltersSection
          changeSearchInput={this.changeSearchInput}
          applyFilters={this.applyFilters}
        />
        {this.renderVirtualCards()}
      </div>
    )
  }
}

export default Home
