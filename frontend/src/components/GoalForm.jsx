import { useState } from "react"
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [ text, setText ] = useState('')
  const [ title, setTitle ] = useState('')

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text, title }))
    setTitle('')
    setText('')
  }

  return (
    <section className="goal-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name="text" 
            id="text" 
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