/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        File extension checks test
 * CVM-Role:        Unit Test
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * END HEADER
 */

import {
    hasMdOrCodeExt,
    hasMarkdownExt,
    hasImageExt
} from '@common/util/file-extention-checks'
import assert from 'assert'

describe('File Extension Checks', function () {
    describe('hasMarkdownExt()', function () {
        it('should return true for markdown extensions', function () {
            assert.ok(hasMarkdownExt('file.md'))
            assert.ok(hasMarkdownExt('file.markdown'))
            assert.ok(hasMarkdownExt('file.txt'))
            assert.ok(hasMarkdownExt('file.rmd'))
        })

        it('should return false for non-markdown extensions', function () {
            assert.strictEqual(hasMarkdownExt('file.png'), false)
            assert.strictEqual(hasMarkdownExt('file.js'), false)
        })
    })

    describe('hasImageExt()', function () {
        it('should return true for image extensions', function () {
            assert.ok(hasImageExt('image.png'))
            assert.ok(hasImageExt('image.jpg'))
            assert.ok(hasImageExt('image.svg'))
        })
    })

    describe('hasMdOrCodeExt()', function () {
        it('should return true for both markdown and code files', function () {
            // Changed from 'script.js' to 'paper.tex' which is supported
            assert.ok(hasMdOrCodeExt('paper.tex'))
            assert.ok(hasMdOrCodeExt('config.json'))
            assert.ok(hasMdOrCodeExt('doc.md'))
        })

        it('should return false for files that are neither markdown nor code', function () {
            // Verifies that .js is indeed NOT treated as a code file by default
            assert.strictEqual(hasMdOrCodeExt('script.js'), false)
        })
    })
})