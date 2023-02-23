import React from 'react'
import TodoItem from './components/TodoItem'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { hideCompleted } from './store/slice/sortSlice'
import { todoAdd } from './store/slice/todoSlice'
import { ITodo } from './types/types'

const App = () => {
  const dispatch = useAppDispatch()
  const todo = useAppSelector(state => state.todoSlice.todo)
  const completed = useAppSelector(state => state.sortSlice.showCompleted)
  const [items, setItems] = React.useState<ITodo[]>([])
  const [value, setValue] = React.useState<string>('')

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const onClickAdd = () => {
    dispatch(todoAdd({id: Date.now(), body: value, isComplete: false}))
    setValue('')
  }
  React.useEffect(() => {
    setItems([...todo.filter((obj) => completed ? obj.isComplete !== completed : obj)])
  },[todo, completed])

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='text-center my-5'>
        
      <input onChange={inputHandler} value={value} className='border-black border p-2 mb-5' placeholder='task'></input>
      <button onClick={onClickAdd} className='ml-5 border-black border p-2'>add</button>
      
      {todo.length !== 0 && <button onClick={() => dispatch(hideCompleted())} className={`w-60 border-black/50 border block mx-auto p-5  ${!completed ? 'bg-green-100' : 'bg-blue-200'}`}>{!completed ? "Hide Completed" : "Show Completed"}</button>}
      </div>
      {items.map((obj, index) => {
        return(
          <TodoItem key={obj.id}  todo={obj} index={index} />
        )
      })}
    </div>
  )
}

export default App