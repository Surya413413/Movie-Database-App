import {Component} from 'react'

class Pagination extends Component {
  state = {page: 1}

  onNextPage = () => {
    const {totalPages, apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.page < totalPages) {
          return {
            page: prevState.page + 1,
          }
        }
        return prevState
      },
      () => {
        const {page} = this.state
        apiCallback(page)
      },
    )
  }

  onPrevousPage = () => {
    const {totalPages, apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.page > totalPages) {
          return {
            page: prevState.page - 1,
          }
        }
        return prevState
      },

      () => {
        const {page} = this.state
        apiCallback(page)
      },
    )
  }

  render() {
    const {page} = this.state
    return (
      <div>
        <button type="button" onClick={this.onPrevousPage}>
          Prev
        </button>
        <p>{page}</p>
        <button type="button" onClick={this.onNextPage}>
          Next
        </button>
      </div>
    )
  }
}
export default Pagination
