/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        ignoreDir tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the ignoreDir utility function.
 *
 * END HEADER
 */
/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        ignoreDir tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the ignoreDir utility function.
 *
 * END HEADER
 */

import { strictEqual } from 'assert'
import ignoreDir from '../source/common/util/ignore-dir'
import path from 'path'

describe('Utility#ignoreDir()', function () {
    it('should return true for .app directories', () => {
        const testPath = path.join(__dirname, 'MyApp.app')
        strictEqual(ignoreDir(testPath), true)
    })

    it('should return true for .textbundle directories', () => {
        const testPath = path.join(__dirname, 'MyDocument.textbundle')
        strictEqual(ignoreDir(testPath), true)
    })

    it('should be case-insensitive for .app', () => {
        const testPath = path.join(__dirname, 'MyApp.APP')
        strictEqual(ignoreDir(testPath), true)
    })

    it('should be case-insensitive for .textbundle', () => {
        const testPath = path.join(__dirname, 'MyDoc.TEXTBUNDLE')
        strictEqual(ignoreDir(testPath), true)
    })

    it('should return false for .git directory', () => {
        const testPath = path.join(__dirname, '.git')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should return false for node_modules directory', () => {
        const testPath = path.join(__dirname, 'node_modules')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should return false for test directory', () => {
        const testPath = path.join(__dirname, 'test')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should return false for source directory', () => {
        const testPath = path.join(__dirname, 'source')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should handle paths with parent directories (basename only)', () => {
        const testPath = '/some/parent/path/Document.textbundle'
        strictEqual(ignoreDir(testPath), true)
    })

    it('should only check the basename of the path', () => {
        // Even if parent contains ignored pattern, only basename matters
        const testPath = path.join('MyApp.app', 'Contents', 'mydir')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should handle Windows-style paths with .app', () => {
        const testPath = 'C:\\Users\\test\\MyApp.app'
        strictEqual(ignoreDir(testPath), true)
    })

    it('should handle Unix-style paths with .textbundle', () => {
        const testPath = '/home/user/Document.textbundle'
        strictEqual(ignoreDir(testPath), true)
    })

    it('should return false for regular project directories', () => {
        const testPath = path.join(__dirname, 'src')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should return false for custom directories', () => {
        const testPath = path.join(__dirname, 'my-folder')
        strictEqual(ignoreDir(testPath), false)
    })

    it('should handle empty string', () => {
        strictEqual(ignoreDir(''), false)
    })

    it('should match patterns with prefix text', () => {
        const testPath = path.join(__dirname, 'PrefixedName.app')
        strictEqual(ignoreDir(testPath), true)
    })
})
