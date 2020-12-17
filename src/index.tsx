import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './index.css'

interface IProps {
  num: number
}

const initState = { count: 0 }

type State = Readonly<typeof initState>

class Counter extends React.Component<IProps, State> {
  static defaultProps = {
    num: 1,
  }

  state: State = initState

  handleClick = () =>
    this.setState({
      count: this.state.count + 1,
    })

  render() {
    return (
      <div>
        <div className="content">{this.state.count}</div>
        <button onClick={this.handleClick}>click me!</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))
