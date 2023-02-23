import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { todoComplete, todoEdit, todoRemove } from '../store/slice/todoSlice';
import { IEdit, ITodo } from '../types/types'

interface TodoItemProps {
  todo: ITodo;
  index: number
}

const TodoItem: React.FC<TodoItemProps> = ({todo, index}) => {
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>(todo.body)

  const dispatch = useAppDispatch()
  const tareaRef = React.useRef<HTMLTextAreaElement>(null)
  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEditMode(false)
    let editpost:IEdit = {id: todo.id, body: value}
    dispatch(todoEdit(editpost))
  }
  const onClickRemove = (id: number) => {
    dispatch(todoRemove(id))
  }
  const onCLickComplete = (id: number) => {
    dispatch(todoComplete(id))
  }
  const onClickEdit = () => {
      setEditMode(true)
      setTimeout(() => {
      tareaRef.current?.focus()
      tareaRef.current?.setSelectionRange(value.length, value.length)
    }, 50);
  }

  return (
    <div className={`md:flex space-x-5 m-5 border border-blue-300 justify-between ${todo.isComplete ? 'bg-green-300' : 'bg-blue-200'} transition-all duration-300 `}>
        <div className='w-5/6 flex md:text-2xl'>
          <div className='p-5'>
            {index + 1}.
          </div>
          {editMode 
           ?
           <textarea ref={tareaRef} className='grow w-full p-2 m-5 self-start rounded-3xl resize-none' onChange={inputHandler} value={value}></textarea>      
           :
           <div className='grow m-5'>{value}.</div>}
           </div>
        <div className='md:w-1/6 flex md:flex-col justify-center p-5'>
        {editMode 
        ? 
        <button onClick={onClickHandler} className='border border-black py-5 bg-green-200'>Save</button> 
        :
        <>
        <button onClick={() => onClickRemove(todo.id)} className='border border-red-800 p-1 bg-red-300'>remove</button>
        <button onClick={() => onCLickComplete(todo.id)} className={`border border-green-800 mx-2 md:mx-0 md:my-1 p-1  ${todo.isComplete ? 'bg-slate-300' : 'bg-green-400'} transition-all duration-300` }>{todo.isComplete ? 'Undo' : 'Done'}</button>
        <button onClick={onClickEdit} className='border border-gray-800 p-1 bg-gray-300'>edit</button>
        </>}
        </div>
      </div>
  )
}

export default TodoItem