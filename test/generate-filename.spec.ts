/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        generateFilename test
 * CVM-Role:        Unit Test
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * END HEADER
 */

import generateFilename from '@common/util/generate-filename'
import assert from 'assert'

describe('generateFilename()', function () {
    it('should generate a filename with ID substitution', function () {
        // We use %Y to get the current year, which is deterministic enough for a regex check
        const result = generateFilename('Note %id', '%Y')
        // Expect "Note " followed by 4 digits (the year)
        assert.match(result, /^Note \d{4}$/)
    })

    it('should generate a UUID when the pattern is empty', function () {
        const result = generateFilename('', '')
        assert.match(result, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    })

    it('should generate a UUID when the pattern is only whitespace', function () {
        const result = generateFilename('   ', '')
        assert.match(result, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    })
})