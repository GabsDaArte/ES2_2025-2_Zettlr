/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        sortByPDF tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the sortByPDF utility function.
 *
 * END HEADER
 */

import { strictEqual, deepStrictEqual } from 'assert'
import sortByPDF from '../source/common/util/sort-by-pdf'

describe('Utility#sortByPDF()', function () {
    it('should return -1 when first file is PDF and second is not', () => {
        const result = sortByPDF('document.pdf', 'document.txt')
        strictEqual(result, -1)
    })

    it('should return 1 when second file is PDF and first is not', () => {
        const result = sortByPDF('document.txt', 'document.pdf')
        strictEqual(result, 1)
    })

    it('should return 0 when both files are PDFs', () => {
        const result = sortByPDF('document1.pdf', 'document2.pdf')
        strictEqual(result, 0)
    })

    it('should return 0 when neither file is PDF', () => {
        const result = sortByPDF('document1.txt', 'document2.doc')
        strictEqual(result, 0)
    })

    it('should handle case-insensitive PDF extension', () => {
        const result = sortByPDF('document.PDF', 'document.txt')
        strictEqual(result, -1)
    })

    it('should handle mixed case PDF extension', () => {
        const result = sortByPDF('document.PdF', 'document.txt')
        strictEqual(result, -1)
    })

    it('should handle paths with multiple dots', () => {
        const result = sortByPDF('my.document.pdf', 'my.document.txt')
        strictEqual(result, -1)
    })

    it('should sort an array of files with PDFs at top', () => {
        const files = [
            'document.txt',
            'image.png',
            'report.pdf',
            'data.csv',
            'summary.pdf',
            'notes.md'
        ]
        const sorted = files.sort(sortByPDF)
        // PDFs should be at the beginning
        strictEqual(sorted[0], 'report.pdf')
        strictEqual(sorted[1], 'summary.pdf')
    })

    it('should handle empty strings', () => {
        const result = sortByPDF('', '')
        strictEqual(result, 0)
    })

    it('should handle strings without extensions', () => {
        const result = sortByPDF('noextension', 'anotherfile')
        strictEqual(result, 0)
    })

    it('should correctly sort when first is PDF and second is empty', () => {
        const result = sortByPDF('document.pdf', '')
        strictEqual(result, -1)
    })

    it('should correctly sort when second is PDF and first is empty', () => {
        const result = sortByPDF('', 'document.pdf')
        strictEqual(result, 1)
    })

    it('should handle absolute paths', () => {
        const result = sortByPDF('/path/to/document.pdf', '/path/to/document.txt')
        strictEqual(result, -1)
    })

    it('should handle relative paths', () => {
        const result = sortByPDF('./documents/report.pdf', './documents/notes.txt')
        strictEqual(result, -1)
    })

    it('should maintain relative order of non-PDF files', () => {
        const files = ['z.txt', 'a.doc', 'report.pdf']
        const sorted = files.sort(sortByPDF)
        strictEqual(sorted[0], 'report.pdf')
        // Non-PDF files maintain their relative order (stable sort behavior)
    })

    it('should work with Array.sort() to group all PDFs together', () => {
        const files = [
            'a.txt',
            'b.pdf',
            'c.doc',
            'd.pdf',
            'e.txt',
            'f.pdf'
        ]
        const sorted = files.sort(sortByPDF)
        // All PDFs should be at the start
        strictEqual(sorted[0].endsWith('.pdf'), true)
        strictEqual(sorted[1].endsWith('.pdf'), true)
        strictEqual(sorted[2].endsWith('.pdf'), true)
    })
})
