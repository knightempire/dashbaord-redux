import '@testing-library/jest-dom'

// Fix for jsdom and saxes compatibility issue
process.env.NODE_ENV = 'test'

import '@testing-library/jest-dom'

// Fix for jsdom and saxes compatibility issue
process.env.NODE_ENV = 'test'

// Next.js router mock
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Firebase mock
jest.mock('./src/firebaseConfig', () => ({
  auth: {},
  db: {},
}))

// Redux store mock
const mockStore = {
  getState: jest.fn(() => ({
    employees: {
      users: [],
      deletedUsers: [],
      total: 0,
      page: 1,
      limit: 10,
      deletedPage: 1,
      status: 'idle',
      error: null,
    },
    auth: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    },
  })),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
}

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((selector) => selector(mockStore.getState())),
  useDispatch: () => mockStore.dispatch,
}))
