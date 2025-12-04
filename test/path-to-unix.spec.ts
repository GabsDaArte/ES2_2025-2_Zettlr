/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        pathToUnix test
 * CVM-Role:        Unit Test
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * END HEADER
 */

import { pathToUnix } from '@common/util/path-to-unix'
import assert from 'assert'

describe('pathToUnix()', function () {
    it('should convert Windows backslashes to forward slashes', function () {
        assert.strictEqual(pathToUnix('C:\\Users\\User\\Documents'), 'C:/Users/User/Documents')
    })

    it('should leave Unix paths unchanged', function () {
        assert.strictEqual(pathToUnix('/home/user/docs'), '/home/user/docs')
    })

    it('should handle mixed paths', function () {
        assert.strictEqual(pathToUnix('some/path\\with\\mixed/separators'), 'some/path/with/mixed/separators')
    })
})