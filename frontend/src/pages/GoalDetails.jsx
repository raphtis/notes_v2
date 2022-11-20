import { useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalItem from '../components/GoaItem'
import Spinner from '../components/Spinner'
import { getGoal } from '../features/goals/goalSlice'


function GoalDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => 
  state.goals)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoal())
  }, [ user, navigate, isError, message, dispatch])


  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="goal">

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>No goal found.</h3>)}
      </section>
    </div>
  )
}

export default GoalDetails