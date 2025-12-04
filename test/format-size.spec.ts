/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        formatSize tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     Tests the formatSize utility function.
 *
 * END HEADER
 */

import assert from 'assert';
import formatSize from '@common/util/format-size';

describe('Utility#formatSize()', function () {
    it('should format bytes correctly (< 1024)', function () {
        assert.strictEqual(formatSize(500), '500 Byte');
        assert.strictEqual(formatSize(1023), '1023 Byte');
        assert.strictEqual(formatSize(100, true), '100 B');
    });

    it('should format kilobytes correctly', function () {
        // 1024 bytes é o limite inferior para cair no bloco de KB
        assert.strictEqual(formatSize(1024), '1 Kilobyte');
        assert.strictEqual(formatSize(1500), '2 Kilobyte');
        assert.strictEqual(formatSize(2000, true), '2 KB');
    });

    it('should format megabytes correctly', function () {
        const thresholdKB = 1024 * 1000;
        assert.strictEqual(formatSize(thresholdKB), '1 Megabyte');
        assert.strictEqual(formatSize(thresholdKB * 2.5), '3 Megabyte');
        assert.strictEqual(formatSize(thresholdKB, true), '1 MB');
    });

    it('should format gigabytes correctly', function () {
        const thresholdMB = 1024 * 1000 * 1000;
        assert.strictEqual(formatSize(thresholdMB), '1 Gigabyte');
        assert.strictEqual(formatSize(thresholdMB * 1.2), '1 Gigabyte');
        assert.strictEqual(formatSize(thresholdMB, true), '1 GB');
    });
});