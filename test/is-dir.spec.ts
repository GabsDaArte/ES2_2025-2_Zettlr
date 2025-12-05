/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        isDir tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the isDir utility function.
 *
 * END HEADER
 */

import { strictEqual } from 'assert'
import isDir from '../source/common/util/is-dir'
import path from 'path'

describe('Utility#isDir()', function () {
    it('should return true for an existing directory', () => {
        const testPath = path.join(__dirname)
        strictEqual(isDir(testPath), true)
    })

    it('should return true for the test directory', () => {
        const testPath = path.join(__dirname, '..')
        strictEqual(isDir(testPath), true)
    })

    it('should return false for a non-existent path', () => {
        const testPath = path.join(__dirname, 'non-existent-directory-xyz')
        strictEqual(isDir(testPath), false)
    })

    it('should return false for a file path', () => {
        const testPath = path.join(__dirname, 'is-dir.spec.ts')
        strictEqual(isDir(testPath), false)
    })

    it('should return false for an empty string', () => {
        strictEqual(isDir(''), false)
    })

    it('should return false for invalid path characters', () => {
        strictEqual(isDir('\0invalid\0path'), false)
    })

    it('should handle relative paths that point to directories', () => {
        strictEqual(isDir('.'), true)
    })

    it('should handle relative paths that do not exist', () => {
        strictEqual(isDir('./non-existent-dir-123'), false)
    })
})
