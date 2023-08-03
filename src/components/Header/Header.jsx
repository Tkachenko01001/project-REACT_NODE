import css from './Header.module.css';

import Avatar  from 'components/Avatar'
import Icon from 'components/Icon'

return (
  <>
    <div className={ }>
      <div className={ }>
        <button
          className={ }
          onClick={ }
        >
          <Icon
            className={ }
            name="#icon"
            width="32px"
            height="32px"
          />
        </button>
      </div>

      <div className={ }>
        <div className={ }>
          <button
            className={ }
            onClick={ }
          >
            <span className={ }>Theme</span>
            <Icon name="#icon" width="16px" height="16px" color="#ffffff" />
          </button>
        </div>

        <ul className={}>
          <li className={}>{user.name}</li>
          <li>
            <Avatar
              onClick={ 
              }
              size={32}
            />
          </li>
        </ul>
      </div>
    </div>
  </>
);
