import React from 'react'
import TodoItem from './components/TodoItem'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { todoAdd } from './store/slice/todoSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const todo = useAppSelector(state => state.todoSlice.todo)
  const [value, setValue] = React.useState<string>('')
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const onClickAdd = () => {
    dispatch(todoAdd({id: Date.now(), body: value, isComplete: false}))
    setValue('')
  }
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='text-center my-5'>
      <input onChange={inputHandler} value={value} className='border-black border p-2 mb-5' placeholder='task'></input>
      <button onClick={onClickAdd} className='ml-5 border-black border p-2'>add</button>
      </div>
      {todo.map((obj, index) => {
        return(
          <TodoItem key={obj.id}  todo={obj} index={index} />
        )
      })}
    </div>
  )
}

export default App