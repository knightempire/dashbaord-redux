import { cn } from '../utils'

describe('utils', () => {
  describe('cn function', () => {
    test('combines class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    test('handles conditional classes', () => {
      const result = cn('class1', true && 'class2', false && 'class3')
      expect(result).toBe('class1 class2')
    })

    test('handles empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    test('handles null and undefined', () => {
      const result = cn('class1', null, undefined, 'class2')
      expect(result).toBe('class1 class2')
    })

    test('handles arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    test('handles objects with boolean values', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      })
      expect(result).toBe('class1 class3')
    })

    test('combines multiple types of inputs', () => {
      const result = cn(
        'base-class',
        ['array-class1', 'array-class2'],
        {
          'conditional-class': true,
          'hidden-class': false,
        },
        true && 'dynamic-class'
      )
      expect(result).toBe('base-class array-class1 array-class2 conditional-class dynamic-class')
    })

    test('handles tailwind merge functionality', () => {
      // This tests the tailwind-merge functionality
      const result = cn('px-2 py-1', 'px-4')
      // tailwind-merge should remove conflicting classes
      expect(result).toBe('py-1 px-4')
    })

    test('handles complex tailwind classes', () => {
      const result = cn(
        'bg-red-500 text-white',
        'bg-blue-500', // This should override bg-red-500
        'hover:bg-red-600'
      )
      expect(result).toBe('text-white bg-blue-500 hover:bg-red-600')
    })
  })
})
