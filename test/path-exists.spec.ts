/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        pathExists tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the pathExists utility function.
 *
 * END HEADER
 */

import { strictEqual } from 'assert'
import pathExists from '../source/common/util/path-exists'
import path from 'path'

describe('Utility#pathExists()', function () {
    it('should return true for an existing file', async () => {
        const testPath = path.join(__dirname, 'path-exists.spec.ts')
        const result = await pathExists(testPath)
        strictEqual(result, true)
    })

    it('should return true for an existing directory', async () => {
        const testPath = path.join(__dirname)
        const result = await pathExists(testPath)
        strictEqual(result, true)
    })

    it('should return false for a non-existent path', async () => {
        const testPath = path.join(__dirname, 'non-existent-path-xyz')
        const result = await pathExists(testPath)
        strictEqual(result, false)
    })

    it('should return false for an empty string', async () => {
        const result = await pathExists('')
        strictEqual(result, false)
    })

    it('should return true for package.json in parent directory', async () => {
        const testPath = path.join(__dirname, '../package.json')
        const result = await pathExists(testPath)
        strictEqual(result, true)
    })

    it('should return false for paths with invalid characters', async () => {
        const result = await pathExists('\0invalid\0path')
        strictEqual(result, false)
    })

    it('should handle relative path that exists', async () => {
        const result = await pathExists('.')
        strictEqual(result, true)
    })

    it('should handle relative path that does not exist', async () => {
        const result = await pathExists('./this-definitely-does-not-exist-xyz')
        strictEqual(result, false)
    })

    it('should work with Buffer paths for existing files', async () => {
        const testPath = Buffer.from(path.join(__dirname, 'path-exists.spec.ts'))
        const result = await pathExists(testPath)
        strictEqual(result, true)
    })

    it('should work with URL paths', async () => {
        const testPath = new URL(`file:///${path.join(__dirname, 'path-exists.spec.ts').replace(/\\/g, '/')}`)
        const result = await pathExists(testPath)
        strictEqual(result, true)
    })
})
