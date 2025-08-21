import '@testing-library/jest-dom'

// Mock Next.js router
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

// Mock Firebase
jest.mock('./src/firebaseConfig', () => ({
  auth: {},
  db: {},
}))

// Mock Redux store
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

// Global test setup
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
