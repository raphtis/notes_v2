import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from "react-redux"
import { deleteGoal } from "../features/goals/goalSlice"


function  GoalItem({goal}) {
  const dispatch = useDispatch()

  return (
    <div className="goal">
      <div className="goal-date">
        {  new Date(goal.createdAt).toLocaleString('en-US')}
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close"><FaTrashAlt /></button>
      </div>

      <div>
        <h2>{goal.title}</h2>
        <p>{goal.text}</p>
        
      </div>
    </div>
  )
}

export default  GoalItem