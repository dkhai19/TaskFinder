import {useEffect, useState} from 'react'
import {UnsubcribeFunc} from '../types/unsubcribe.type'
import {getAllTasks} from '../firebase/tasks.api'
import {useDispatch} from 'react-redux'
import {setTasks} from '../redux/slices/taskSlice'

const useFetchTask = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    let unsubscribe: UnsubcribeFunc | undefined
    const setupTasks = async () => {
      try {
        // dispatch(loadTasks()).unwrap()
        unsubscribe = await getAllTasks(tasks => {
          dispatch(setTasks(tasks))
          setIsLoading(false)
        })
      } catch (error) {
        console.error('Failed to load tasks:', error)
      }
    }
    setupTasks()
  }, [])

  return {isLoading}
}
