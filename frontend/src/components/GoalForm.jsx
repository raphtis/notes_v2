import { useState } from "react"
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [ text, setText ] = useState('')
  const [ title, setTitle ] = useState('')

  const dispatch = useDispatch()


  const onSubmit = (e) => {
    e.preventDefault()

    if(!text || !title){
      toast.error('Please fill all form fields.')
    } else {
    dispatch(createGoal({ text, title }))
    setTitle('')
    setText('')
    }
  }

  return (
    <section className="goal-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="title" 
            id="title" 
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="form-group">
          <input 
            type="text" 
            name="text" 
            id="text" 
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm