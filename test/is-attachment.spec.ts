/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        isAttachment tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the isAttachment utility function.
 *
 * END HEADER
 */

import { strictEqual } from 'assert'
import isAttachment from '../source/common/util/is-attachment'
import path from 'path'

describe('Utility#isAttachment()', function () {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg']
    const documentExtensions = ['.pdf', '.doc', '.docx', '.txt']

    it('should return true for an image file with matching extension', () => {
        const testPath = path.join(__dirname, 'test-image.jpg')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should return true for a PNG file with matching extension', () => {
        const testPath = path.join(__dirname, 'test.png')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should return false for a file with non-matching extension', () => {
        const testPath = path.join(__dirname, 'test.txt')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, false)
    })

    it('should handle case-insensitive extensions', () => {
        const testPath = path.join(__dirname, 'test.JPG')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should handle mixed case extensions', () => {
        const testPath = path.join(__dirname, 'test.JpEg')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should return false when file does not exist and skipExistenceCheck is false', () => {
        const testPath = path.join(__dirname, 'non-existent.jpg')
        const result = isAttachment(testPath, imageExtensions, false)
        strictEqual(result, false)
    })

    it('should return true when file does not exist but skipExistenceCheck is true', () => {
        const testPath = path.join(__dirname, 'non-existent.jpg')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should work with document extensions', () => {
        const testPath = path.join(__dirname, 'document.pdf')
        const result = isAttachment(testPath, documentExtensions, true)
        strictEqual(result, true)
    })

    it('should return false for files without extensions', () => {
        const testPath = path.join(__dirname, 'noextension')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, false)
    })

    it('should handle empty extension list', () => {
        const testPath = path.join(__dirname, 'test.jpg')
        const result = isAttachment(testPath, [], true)
        strictEqual(result, false)
    })

    it('should handle paths with multiple dots', () => {
        const testPath = path.join(__dirname, 'test.backup.jpg')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should return true for existing file that matches extension', () => {
        const testPath = path.join(__dirname, 'is-attachment.spec.ts')
        const tsExtensions = ['.ts', '.js']
        const result = isAttachment(testPath, tsExtensions, false)
        strictEqual(result, true)
    })

    it('should handle absolute paths', () => {
        const testPath = '/absolute/path/to/image.svg'
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, true)
    })

    it('should handle relative paths', () => {
        const testPath = './relative/path/document.docx'
        const result = isAttachment(testPath, documentExtensions, true)
        strictEqual(result, true)
    })

    it('should return false for directory-like paths', () => {
        const testPath = path.join(__dirname, '../test/')
        const result = isAttachment(testPath, imageExtensions, true)
        strictEqual(result, false)
    })
})
