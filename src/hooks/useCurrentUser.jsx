import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/selectors/auth'

export const useCurrentUser = () => useSelector(selectCurrentUser)
