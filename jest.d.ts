import '@testing-library/jest-dom'

// Extend Jest matchers with @testing-library/jest-dom
declare module '@jest/expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R
    toBeVisible(): R
    toBeDisabled(): R
    toBeEnabled(): R
    toHaveAttribute(attr: string, value?: string): R
    toHaveClass(...classNames: string[]): R
    toHaveStyle(css: string | object): R
    toHaveTextContent(text?: string | RegExp | number): R
    toBeChecked(): R
    toBePartiallyChecked(): R
    toHaveDescription(text?: string | RegExp): R
    toHaveErrorMessage(text?: string | RegExp): R
    toHaveFocus(): R
    toBeRequired(): R
    toBeValid(): R
    toBeInvalid(): R
    toHaveValue(value?: string | number | string[]): R
    toBeEmpty(): R
    toContainElement(element: HTMLElement | null): R
    toContainHTML(html: string): R
    toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
    toBeSelected(): R
  }
}

// Also extend the global Jest namespace
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toHaveStyle(css: string | object): R
      toHaveTextContent(text?: string | RegExp | number): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveErrorMessage(text?: string | RegExp): R
      toHaveFocus(): R
      toBeRequired(): R
      toBeValid(): R
      toBeInvalid(): R
      toHaveValue(value?: string | number | string[]): R
      toBeEmpty(): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(html: string): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toBeSelected(): R
    }
  }
}

export {}
