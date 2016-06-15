import React from 'react';
import { Link } from 'react-router';
import request from '../request';

export default class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditting: false,
      edittingValue: '',
      item: {}
    }
  }

  componentWillMount() {
    request.get('http://localhost:2000/get/item', {
      id: this.props.params.id
    }).then((data) => {
      this.setState({
        item: data.item
      });
    });
  }

  _onClick = () => {
    this.setState({
      isEditting: true,
      edittingValue: this.state.item.value
    });
  }

  _onChangeValue = (e) => {
    this.setState({
      edittingValue: e.target.value
    });
  }

  _stopEditing = () => {
    const updateItem = this.state.item;
    updateItem.value = this.state.edittingValue;

    request.get('http://localhost:2000/update/item', {
       updatedItem: updateItem
    }).then(() => {
      this.setState({
        isEditting: false,
        item: updateItem
      });
    })
  }

  render() {
    const { item, edittingValue, isEditting } = this.state;
    return (
      <div>
        Item with value
        {
          isEditting ?
          (
            <p>
              <input
                value={edittingValue}
                onChange={this._onChangeValue}
              />
            <button
              onClick={this._stopEditing}
            >
                Update value
              </button>
            </p>
          ) :
          (
            <p onClick={this._onClick}>
              {item.value}
            </p>
          )
        }
        <Link to={{ pathname: '/main' }}>
          <button>
            Go back
          </button>
        </Link>
      </div>
    )
  }
}
