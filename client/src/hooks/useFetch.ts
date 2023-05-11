import { useReducer, useEffect,  } from 'react';

enum ActionType {
  FETCH = 'FETCH',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

function fetchReducer(state, action) {
  switch(action.type) {
    case 'FETCH':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS':
      return {
        data: action.data,
        error: null,
        loading: false
      }
    case 'ERROR':
      return {
      ...state,
        error: 'Error fetching data. Try again',
        loading: false
      }
    default:
      throw new Error(`That action type not supported.`)
  }
}

function useFetch(url) {
  const [state, dispatch] = useReducer(
    fetchReducer,
    { data: null, error: null, loading: true }
  )
  useEffect(() => {
    dispatch({ type: ActionType.FETCH })
    fetch(url)
      .then((res) => {
        console.log(res.json())
        return res.json()
      })
      .then((data) => dispatch({ type: ActionType.SUCCESS, data }))
      .catch((error) => {
        console.warn(error.message)
        dispatch({ type: ActionType.ERROR, error })
      })
  }, [url])
  return {
    loading: state.loading,
    data: state.data,
    error: state.error
  }
}

export default useFetch