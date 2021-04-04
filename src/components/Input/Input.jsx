import classes from './Input.module.scss'
import { Field } from 'formik'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Input = ({ type, name, errors, touched, isRequired, title }) => {

  return (
    <div className={classes.inputContainer}>
      <label className={classes.signUp__label}>
        <span className={classes.signUp__name}>
          <span className={classes.signUp__name_text}>{title}</span>
          {
            isRequired &&
            <span className={classes.signUp__name_red}>*</span>
          }
        </span>
        <span className={classes.signUp__inputField}>
          <Field name={name} type={type} className={classNames(
            classes.signUp__input,
            { [classes.signUp__input_error]: errors[name] && touched[name] })}
          />
          {
            errors[name] && touched[name] &&
            <span className={classes.error}>{errors[name]}</span>
          }
        </span>
      </label>
    </div>
  )
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  errors: PropTypes.any,
  touched: PropTypes.any,
}

export default Input
