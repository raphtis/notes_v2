import { useDispatch } from "react-redux"


function  GoalItem({goal}) {
  const dispatch = useDispatch()

  return (
    <div className="blog">
      <div>
        {  new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <div>
        <h2>{goal.title}</h2>
        <p>{goal.text}</p>
      </div>
    </div>
  )
}

export default  GoalItem