import * as Yup from 'yup'

const regex = /.*^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$.*/

const basicToDo = Yup.object().shape({
  title: Yup.string()
    .required('required')
    .min(2, 'Must be longer than 2 characters'),
  description: Yup.string()
    .required('required')
    .min(2, 'Must be longer than 2 characters'),
  color: Yup.string()
    .required('required')
    .matches(regex, 'not valid syntax')

})

export {
  basicToDo
}
