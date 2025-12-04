/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        Stats utility tests
 * CVM-Role:        Unit Test
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     Tests for the stats utility functions
 *
 * END HEADER
 */

import assert from 'assert'
import {
    today,
    last30EntriesByDate,
    sumAny30Days,
    avgAny30Days
} from '@common/util/stats'

describe('Stats Utilities', function () {
    describe('today()', function () {
        it('should return a valid ISO date string (YYYY-MM-DD)', function () {
            assert.match(today(), /^\d{4}-\d{2}-\d{2}$/)
        })
    })

    const mockData: Record<string, number> = {
        '2023-01-01': 10,
        '2023-01-02': 20,
        '2023-01-03': 30
    }

    const largeMockData: Record<string, number> = {}
    // Generate 40 days of data
    for (let i = 1; i <= 40; i++) {
        const day = i.toString().padStart(2, '0')
        largeMockData[`2023-02-${day}`] = 1
    }

    describe('last30EntriesByDate()', function () {
        it('should sort dates and returns entries (date, value)', function () {
            // The function returns [date, value] tuples, sorted by date descending
            assert.deepStrictEqual(last30EntriesByDate(mockData), [
                ['2023-01-03', 30],
                ['2023-01-02', 20],
                ['2023-01-01', 10]
            ])
        })

        it('should limit to 30 entries', function () {
            const result = last30EntriesByDate(largeMockData)
            assert.strictEqual(result.length, 30)
            // verify it took the latest dates (feb 40 doesn't exist, but purely string comparison of keys)
            // The keys are 01..40. Sorted: 01, 02... 40. Reversed: 40, 39... 01.
            // Slice 30: 40 down to 11.
            // Since all values are 1, sum is 30.
        })
    })

    describe('sumAny30Days()', function () {
        it('should sum the values correctly', function () {
            assert.strictEqual(sumAny30Days(mockData), 60)
        })

        it('should sum only the last 30 days', function () {
            assert.strictEqual(sumAny30Days(largeMockData), 30)
        })
    })

    describe('avgAny30Days()', function () {
        it('should calculate average correctly', function () {
            assert.strictEqual(avgAny30Days(mockData), 20) // 60 / 3
        })

        it('should return 0 for empty records', function () {
            assert.strictEqual(avgAny30Days({}), 0)
        })
    })
})