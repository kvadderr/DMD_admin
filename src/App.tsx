import { PrivateRoute } from './routes/PrivateRoute'
import { PublicRoute } from './routes/PublicRoute'
import { useAppSelector } from './store/storeHooks'
import { selectIsAuthorized } from './store/slices/authSlice'
import { Routes, Route } from 'react-router-dom'
import { Result, App } from 'antd'
import { Category, Meditation, Voices } from './pages'
import Login from './layout/Login'

export default () => {

  const isAuth = useAppSelector(selectIsAuthorized)
  
  return (
    <App style={{ height: '100%' }} notification={{ placement: 'topRight' }}>
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
        <Route path='/login' element={<PublicRoute isAuth={isAuth} />}>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Result
            status="404"
            title="404"
          />} />
        </Route>
      </Routes>
    </App>
  )
}
