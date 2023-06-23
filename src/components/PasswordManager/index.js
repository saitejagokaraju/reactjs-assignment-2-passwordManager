import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialBgColors = [
  'LAUGHINGORANGE',
  'GREENTEAL',
  'LIQUIDLAVA',
  'TURQUOISETOPAZ',
  'FIERYGARNET',
  'HORIZON',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const number = Math.ceil(Math.random() * initialBgColors.length - 1)

    const initialColor = initialBgColors[number]

    const newPassword = {
      id: v4(),
      website,
      username,
      password,
      bgColor: initialColor,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state

    const filteredPasswordList = passwordList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({
      passwordList: filteredPasswordList,
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      isChecked,
      passwordList,
      website,
      username,
      password,
      searchInput,
    } = this.state

    const SearchList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const listLength = SearchList.length < 1

    const count = SearchList.length

    return (
      <div className="app-container">
        <div>
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            alt="app logo"
          />
        </div>
        <div className="container-1">
          <div className="image-container-small">
            <img
              className="password-manager-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>

          <form className="formEl" onSubmit={this.onClickAddButton}>
            <h1 className="newpassword-heading">Add New Password</h1>
            <div className="input-container">
              <label htmlFor="website">
                <img
                  className="label-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </label>
              <input
                className="input-element"
                type="text"
                id="website"
                value={website}
                onChange={this.onChangeWebsite}
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <label htmlFor="username">
                <img
                  className="label-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                />
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                className="input-element"
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">
                <img
                  className="label-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                className="input-element"
                placeholder="Enter Password"
              />
            </div>
            <div className="button-cont">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <div className="image-container">
            <img
              className="password-manager-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="container-2">
          <div className="search-count-container">
            <div className="count-cont">
              <h1 className="your-passwords">Your Passwords</h1>
              <p className="span-text"> {count}</p>
            </div>
            <div className="search-el">
              <img
                className="label-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input
              onChange={this.onChangeCheckBox}
              type="checkbox"
              id="showpassword"
              className="checkbox-input"
            />
            <label htmlFor="showpassword" className="label-text">
              Show Passwords
            </label>
          </div>
          {listLength && (
            <div className="nopassword-container">
              <img
                className="nopassword-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="nopassword-text"> No Passwords</p>
            </div>
          )}
          <ul className="unorderList-container">
            {SearchList.map(eachItem => (
              <PasswordItem
                key={eachItem.id}
                passwordDetails={eachItem}
                isChecked={isChecked}
                onClickDeletePassword={this.deletePassword}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
