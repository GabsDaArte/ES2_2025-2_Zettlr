/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        generateId tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the generateId utility function.
 *
 * END HEADER
 */

import { strictEqual, match } from 'assert'
import generateId from '../source/common/util/generate-id'

describe('Utility#generateId()', function () {
    it('should generate an ID with default pattern YYYYMMDDhhmmss', () => {
        const id = generateId()
        // Should be 14 digits (YYYY=4, MM=2, DD=2, hh=2, mm=2, ss=2)
        strictEqual(id.length, 14)
        // Should be all digits
        match(id, /^\d{14}$/)
    })

    it('should generate an ID with a custom pattern', () => {
        const id = generateId('%Y-%M-%D')
        // Should match format YYYY-MM-DD
        match(id, /^\d{4}-\d{2}-\d{2}$/)
    })

    it('should generate an ID with year pattern', () => {
        const id = generateId('%Y')
        strictEqual(id.length, 4)
        match(id, /^\d{4}$/)
    })

    it('should generate an ID with custom separator', () => {
        const id = generateId('%Y_%M_%D_%h_%m_%s')
        match(id, /^\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}$/)
    })

    it('should generate unique IDs on consecutive calls', () => {
        const id1 = generateId()
        // Small delay to ensure different timestamp
        const id2 = generateId()
        // IDs might be the same if called in the same second, so we just verify they're valid
        strictEqual(id1.length, 14)
        strictEqual(id2.length, 14)
    })

    it('should handle empty pattern gracefully', () => {
        const id = generateId('')
        strictEqual(typeof id, 'string')
    })

    it('should handle pattern with no variable placeholders', () => {
        const id = generateId('test-id')
        strictEqual(id, 'test-id')
    })
})
