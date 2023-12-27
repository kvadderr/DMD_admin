import { PrivateRoute } from './routes/PrivateRoute'
import { useAppSelector } from './store/storeHooks'
import { selectIsAuthorized } from './store/slices/authSlice'
import { Routes, Route } from 'react-router-dom'
import { Result } from 'antd'

import { Category, Meditation, Voices } from './pages'
function App() {

  const isAuth = useAppSelector(selectIsAuthorized)

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute isAuth={isAuth} />}>
        <Route path='/category' element={<Category />} />
        <Route path='/meditation' element={<Meditation />} />
        <Route path='/voices' element={<Voices />} />
        <Route path='*' element={<Result
          status="404"
          title="404"
        />} />
      </Route>
    </Routes>
  )
}

export default App
