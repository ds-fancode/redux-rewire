import '../../base.jest.mock'

jest.mock('@fancode/fc-ui-components', () => ({
  FCFlowState: {
    HOME: 'HOME'
  }
}))
