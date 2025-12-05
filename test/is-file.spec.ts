/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        isFile tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the isFile utility function.
 *
 * END HEADER
 */

import { strictEqual } from 'assert'
import isFile from '../source/common/util/is-file'
import path from 'path'

describe('Utility#isFile()', function () {
    it('should return true for an existing file', () => {
        const testPath = path.join(__dirname, 'is-file.spec.ts')
        strictEqual(isFile(testPath), true)
    })

    it('should return true for another existing test file', () => {
        const testPath = path.join(__dirname, 'hash.spec.ts')
        strictEqual(isFile(testPath), true)
    })

    it('should return false for a non-existent file', () => {
        const testPath = path.join(__dirname, 'non-existent-file-xyz.ts')
        strictEqual(isFile(testPath), false)
    })

    it('should return false for a directory path', () => {
        const testPath = path.join(__dirname)
        strictEqual(isFile(testPath), false)
    })

    it('should return false for an empty string', () => {
        strictEqual(isFile(''), false)
    })

    it('should return false for invalid path characters', () => {
        strictEqual(isFile('\0invalid\0path'), false)
    })

    it('should handle relative file paths that exist', () => {
        const testPath = path.join(__dirname, '../package.json')
        strictEqual(isFile(testPath), true)
    })

    it('should return false for relative paths that do not exist', () => {
        strictEqual(isFile('./non-existent-file-123.txt'), false)
    })

    it('should return false for paths that are neither file nor directory', () => {
        strictEqual(isFile('/dev/null'), false)
    })
})
