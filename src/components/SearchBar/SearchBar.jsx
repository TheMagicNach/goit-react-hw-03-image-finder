import { Component } from "react";
import { SearchBarStyled } from './SearchBar.styled';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class SearchBar extends Component{
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Write something');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({query:""})
  }

  render() {

    return (
      <SearchBarStyled>
      <form className="form" onSubmit={this.handleSubmit}>
        <button type="submit" className="button" >
          <span className="button-label">Search</span>
          </button>
          
          <input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
      </form>
      </SearchBarStyled>
    )
  }
}


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
