import { configureStore } from '@reduxjs/toolkit'
import authReducer, {
  setAuthLoading,
  loginSuccess,
  loginFailure,
  logout,
} from '../authSlice'

type UserInfo = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

type RootState = {
  auth: ReturnType<typeof authReducer>
}

const mockUser: UserInfo = {
  uid: '123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg',
}

describe('authSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>

  beforeEach(() => {
    store = configureStore<RootState>({
      reducer: {
        auth: authReducer,
      },
    })
  })

  test('should return the initial state', () => {
    const state = store.getState().auth
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  test('should handle setAuthLoading', () => {
    store.dispatch(setAuthLoading(true))
    const state = store.getState().auth
    expect(state.loading).toBe(true)

    store.dispatch(setAuthLoading(false))
    const newState = store.getState().auth
    expect(newState.loading).toBe(false)
  })

  test('should handle loginSuccess', () => {
    const payload = { user: mockUser, token: 'test-token' }
    store.dispatch(loginSuccess(payload))
    
    const state = store.getState().auth
    expect(state.user).toEqual(mockUser)
    expect(state.token).toBe('test-token')
    expect(state.isAuthenticated).toBe(true)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  test('should handle loginFailure', () => {
    // First set some state to verify it gets reset
    store.dispatch(loginSuccess({ user: mockUser, token: 'test-token' }))
    
    // Then dispatch login failure
    store.dispatch(loginFailure('Login failed'))
    
    const state = store.getState().auth
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Login failed')
  })

  test('should handle logout', () => {
    // First set authenticated state
    store.dispatch(loginSuccess({ user: mockUser, token: 'test-token' }))
    
    // Then logout
    store.dispatch(logout())
    
    const state = store.getState().auth
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  test('should handle multiple state changes correctly', () => {
    // Start loading
    store.dispatch(setAuthLoading(true))
    expect(store.getState().auth.loading).toBe(true)
    
    // Login success
    store.dispatch(loginSuccess({ user: mockUser, token: 'test-token' }))
    let state = store.getState().auth
    expect(state.loading).toBe(false)
    expect(state.isAuthenticated).toBe(true)
    
    // Start loading again
    store.dispatch(setAuthLoading(true))
    expect(store.getState().auth.loading).toBe(true)
    
    // Login failure
    store.dispatch(loginFailure('Invalid credentials'))
    state = store.getState().auth
    expect(state.loading).toBe(false)
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).toBe('Invalid credentials')
  })
})
