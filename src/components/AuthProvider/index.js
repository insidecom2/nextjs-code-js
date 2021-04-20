import React, { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, removeStoreUser } from 'store/reducers/auth'
import Cookies from 'js-cookie'
import _ from 'lodash'

const AuthContext = createContext()
function AuthProvider({ children }) {
  const { pathname, events } = useRouter()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(
    (state) => ({
      user: state.auth.user
    }),
    []
  )

  useEffect(() => {
    // const paths = router.asPath.split('/')
    const token = Cookies.get('token')
    if (pathname !== '/' && !_.isUndefined(token)) {
      dispatch(getCurrentUser())
    } else {
      dispatch(removeStoreUser())
      router.push(`/`)
    }

    // if (pathname !== '/' && _.isEmpty(user)) {
    //   router.push('/')
    // }
  }, [pathname])

  useEffect(() => {
    const token = Cookies.get('token')
    const handleRouteChange = (url) => {
      if (url === '/' && !_.isUndefined(token)) {
        router.push('/dashboard')
      }
    }

    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
