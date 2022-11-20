import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalItem from '../components/GoaItem'
import GoalForm from '../components/GoalForm'
import { getGoals } from '../features/goals/goalSlice'


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
      <h4>Goal Dashboard</h4>
    </section>

    <GoalForm />

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