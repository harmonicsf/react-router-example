import React from 'react';
import { Link } from 'react-router';
import request from '../request';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    request.get('http://localhost:2000/get/list').then((data) => {
      const { list } = data;
      this.setState({ list });
    })
  }

  render() {
    return (
      <div>
        This is our container
        <ul>
          {
            this.state.list.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={{ pathname: `/word/${item.id}` }}>
                    Open details for {item.value}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}
