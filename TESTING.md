# Jest Testing Setup

This project is configured with Jest for comprehensive testing of React components, Redux slices, and utility functions.

## Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── EmployeeTable.test.tsx
│   │   ├── CreateEmployeeModal.test.tsx
│   │   ├── SearchAndFilter.test.tsx
│   │   └── PaginationControls.test.tsx
├── lib/
│   ├── __tests__/
│   │   └── utils.test.ts
│   └── store/
│       └── slices/
│           └── __tests__/
│               ├── employeesSlice.test.ts
│               └── authSlice.test.ts
└── app/
    └── __tests__/
        └── Dashboard.test.tsx
```

## Available Scripts

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests in CI mode (no watch, with coverage)

## Test Coverage

The project is configured with coverage thresholds:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## What's Tested

### Components
- **EmployeeTable**: Rendering, filtering, search functionality, loading states
- **CreateEmployeeModal**: Form validation, submission, error handling
- **SearchAndFilter**: Search input, filter interactions
- **PaginationControls**: Page navigation, disabled states, page highlighting

### Redux Slices
- **employeesSlice**: All actions (CRUD operations), async thunks, state management
- **authSlice**: Authentication actions, state transitions

### Utilities
- **utils.ts**: Class name merging, Tailwind CSS conflict resolution

### Integration Tests
- **Dashboard**: Full page rendering, component integration, data flow

## Test Utilities

The tests use:
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- `@testing-library/user-event` for user interactions
- Redux store mocking for isolated testing
- Axios mocking for API calls

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## Coverage Report

After running `npm run test:coverage`, check the `coverage/` directory for detailed HTML reports.
