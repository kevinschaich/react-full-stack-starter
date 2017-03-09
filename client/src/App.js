import React from 'react';
import DB from './DB';

class App extends React.Component {
  state = {items: []};

  componentDidMount() {
    const search_value = 'your-search-terms-here';
    DB.search(search_value, (items) => {
      this.setState({items: items});
    });
  }

  render() {
    const items = this.state.items.map(
      (item, i) => (<h1 key={i}>{item.name}</h1>)
    );
    return (
      <div>
        {items}
      </div>
    );
  }
}

export default App;
