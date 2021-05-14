import PropTypes from 'prop-types'
import { Button } from './Button';
import { useLocation } from 'react-router-dom';

export function Header({ title, onAdd, showAdd }) {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
     {location.pathname === '/' && (
       <Button
          color={showAdd ? 'black' : 'red'}
          text={showAdd ? 'Close' : 'Add Task'}
          onAdd={onAdd}
        />
     )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}