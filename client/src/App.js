import React from 'react';
import DB from './DB';

class App extends React.Component {
  state = {items: []};

  componentDidMount() {
    const search_value = 'test'
    DB.search(search_value, (items) => {
      this.setState({items: items});
    });
  }

  render() {
    return (
      <div>
        {this.state.items.map((item, i) => (<h1 key={i}>{item.name}</h1>))}
      </div>
    );
  }
}

export default App;
