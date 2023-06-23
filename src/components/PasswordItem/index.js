import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isChecked, onClickDeletePassword} = props
  const {website, username, password, bgColor, id} = passwordDetails
  const firstLetter = username[0].toUpperCase()

  const deletePassword = () => {
    onClickDeletePassword(id)
  }

  return (
    <li className="list-item">
      <div className={`first-letter-bg ${bgColor} `}>
        <p>{firstLetter}</p>
      </div>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {isChecked ? (
          <p>{password}</p>
        ) : (
          <img
            className="star-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <div>
        <button
          type="button"
          className="delete-button"
          onClick={deletePassword}
          data-testid="delete"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
