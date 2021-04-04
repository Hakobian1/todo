import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.scss'
import { todos } from './api/api'
import { createEntity, deleteEntity, setEntities, updateEntity } from './toolkitRedux/todoSlice';
import { Form, Formik } from 'formik'
import { basicToDo } from './utils/validation'
import Input from './components/Input/Input'

export function App() {
  const dispatch = useDispatch();

  const [id, setId] = useState(null)
  const [number, setNumber] = useState('')
  const [initialValueFormik, setInitialValueFormik] = useState({
    title: '',
    description: '',
    color: '',
  })

  const onEditData = (data, index) => {
    setId(data._id)
    setNumber(index)
    setInitialValueFormik({
      title: data.title,
      description: data.description,
      color: data.color
    })
  }

  const resetFormik = () => {
    setInitialValueFormik({
      title: '',
      description: '',
      color: ''
    })
  }

  const todoList = useSelector(({ todo }) => todo.entities);


  const deleteItem = useCallback((item) => {
    todos.deleteById(item._id).then(success => {
      if (success) {
        dispatch(deleteEntity(item._id));
      } else {
        // todo show error
      }
    })
  }, [dispatch]);

  const onDeleteAll = useCallback(() => {
    Promise.all(
      todoList.map(item => todos.deleteById(item._id))
    ).then(results => {
      results.forEach(id => dispatch(deleteEntity(id)))
    });
  }, [todoList ,dispatch]);

  useEffect(() => {
    todos.getTodos()
      .then(response => {
        dispatch(setEntities(response.data))
      });
  }, [dispatch])

  return (
    <div className='wrapper'>
      <div className='column1'>
        <Formik
          initialValues={initialValueFormik}
          enableReinitialize={initialValueFormik}
          validationSchema={basicToDo}
          onSubmit={({ title, description, color}, props) => {

            const data = { title, description, color };


            if (id) {
              todos.updateTodo(id, data)
                .then(item => {
                  if (item) {
                    dispatch(updateEntity(item));
                    setId(null)
                    resetFormik()
                  } else {
                    // todo show error
                  }
                })
            } else {
              todos.createTodos(data)
                .then(item => {
                  if (item) {
                    dispatch(createEntity(item));
                    props.resetForm()
                  } else {
                    // todo show error
                  }
                })
            }
          }}
        >
          {
            ({ errors, touched }) => (
              <Form>
                <Input isRequired={true} name={'title'} title={'title'} type={'text'} errors={errors} touched={touched}/>
                <Input isRequired={true} name={'description'} title={'description'} type={'text'} errors={errors} touched={touched}/>
                <Input isRequired={true} name={'color'} title={'color only hex e.g. #ff1122 or #f32'} type={'text'} errors={errors} touched={touched}/>
                <button type='submit'>{
                  !id ? 'Create to do' : `Update ${number}`
                }</button>
              </Form>
            )
          }
        </Formik>
        <div>
          <button type='button' onClick={onDeleteAll}>Delete All</button>
          {id && <button onClick={() => {
            setId(null)
            setNumber(null)
            resetFormik()
          }}>Create</button>}
        </div>
      </div>
      <div className='column2'>
        <ul className='todoList'>
          {
            todoList.map((item, index) => (
              <li key={item._id} className='todoItem' style={{
                backgroundColor: `${item.color}` || '#ffffff'
              }}>
                <div>
                  {++index}
                </div>
                <div className='todoItem__info'>
                  <span>title --- {item.title}</span>
                  {' '}
                  <span>description --- {item.description}</span>
                  {' '}
                  <span>color --- {item.color}</span>
                </div>
                <div className='todoControls'>
                  <button className='btn' type='button' onClick={() => onEditData(item, index)}>
                    <span>edit</span>
                  </button>
                  <button className='btn btn__delete' type='button' onClick={() => deleteItem(item)}>
                    <span>delete</span>
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
