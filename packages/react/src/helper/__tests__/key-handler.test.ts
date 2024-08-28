import {assert} from 'chai'
import {keyHandler} from '../key-handler'

describe('keyHandler', () => {
  describe('getParentKey', () => {
    it('should get 2 level up string', function () {
      const input = 'abc/null/xyz/undefined'
      const actual = keyHandler.getParentKey(input, 2)
      assert.deepEqual(actual, 'abc/null')
    })
  })
  describe('getComponentId', () => {
    it('should get corresponding componentId of the map', function () {
      keyHandler.componentIdMap['abc/null'] = 'xyz'
      const input = 'abc/null/xyz/undefined'
      const actual = keyHandler.getComponentId(input)
      assert.deepEqual(actual, 'xyz')
    })
  })
  describe('getAllParentKey', () => {
    it('should get array of the all possible parent keys', function () {
      const input = 'abc/null/xyz/undefined'
      const actual = keyHandler.getAllParentKey(input)
      assert.deepEqual(actual, ['abc/null/xyz', 'abc/null', 'abc'])
    })
  })
})
