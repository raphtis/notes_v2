import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalItem from '../components/GoaItem'
import { getGoals, reset } from '../features/goals/goalSlice'

import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoals())
  }, [ user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return <>
    <section className="heading">
      <h1>Welcome { user && user.username} </h1>
      <p>Goal Dashboard</p>
    </section>

    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3>You have not logged in yet.</h3>)}
    </section>
  </>
}

export default Dashboard