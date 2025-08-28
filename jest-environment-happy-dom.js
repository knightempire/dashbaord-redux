const { TestEnvironment } = require('jest-environment-node');

class HappyDOMEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
    
    // Set up a minimal DOM-like environment without XML parsing
    const mockElement = {
      setAttribute: () => {},
      getAttribute: () => null,
      appendChild: () => {},
      removeChild: () => {},
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {},
      },
      textContent: '',
      innerHTML: '',
      nodeName: 'DIV',
      nodeType: 1,
      children: [],
      parentNode: null,
      nextSibling: null,
      previousSibling: null,
      ownerDocument: null,
    };

    this.global.window = {
      document: {
        createElement: () => ({ ...mockElement }),
        createTextNode: (text) => ({ 
          textContent: text, 
          nodeType: 3, 
          nodeName: '#text',
          parentNode: null 
        }),
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        body: { ...mockElement },
        head: { ...mockElement },
        documentElement: { ...mockElement, style: {} },
        implementation: {
          createHTMLDocument: () => ({
            body: { ...mockElement },
            head: { ...mockElement },
            documentElement: { ...mockElement }
          })
        },
        defaultView: null,
      },
      location: {
        href: 'http://localhost:3000',
        origin: 'http://localhost:3000',
        pathname: '/',
        search: '',
        hash: '',
        host: 'localhost:3000',
        hostname: 'localhost',
        port: '3000',
        protocol: 'http:',
      },
      navigator: {
        userAgent: 'Jest Test Environment',
        platform: 'node',
        language: 'en-US',
        languages: ['en-US'],
      },
      localStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      sessionStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      },
      matchMedia: () => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
      getComputedStyle: () => ({
        getPropertyValue: () => '',
        setProperty: () => {},
        removeProperty: () => '',
      }),
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      requestAnimationFrame: (cb) => setTimeout(cb, 16),
      cancelAnimationFrame: (id) => clearTimeout(id),
      setTimeout: global.setTimeout,
      clearTimeout: global.clearTimeout,
      setInterval: global.setInterval,
      clearInterval: global.clearInterval,
      console: global.console,
      // Add WebKit animation support properties
      WebKitAnimationEvent: function() {},
      WebKitTransitionEvent: function() {},
      WebKitCSSMatrix: function() {},
    };
    
    // Set up document reference in window
    this.global.window.document.defaultView = this.global.window;
    
    // Set global references
    this.global.document = this.global.window.document;
    this.global.navigator = this.global.window.navigator;
    this.global.location = this.global.window.location;
    this.global.localStorage = this.global.window.localStorage;
    this.global.sessionStorage = this.global.window.sessionStorage;
    this.global.requestAnimationFrame = this.global.window.requestAnimationFrame;
    this.global.cancelAnimationFrame = this.global.window.cancelAnimationFrame;
    
    // Mock ResizeObserver
    this.global.ResizeObserver = function() {
      return {
        observe: () => {},
        unobserve: () => {},
        disconnect: () => {},
      };
    };

    // Mock IntersectionObserver
    this.global.IntersectionObserver = function() {
      return {
        observe: () => {},
        unobserve: () => {},
        disconnect: () => {},
      };
    };

    // Mock MutationObserver
    this.global.MutationObserver = function() {
      return {
        observe: () => {},
        disconnect: () => {},
        takeRecords: () => [],
      };
    };
  }

  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = HappyDOMEnvironment;
