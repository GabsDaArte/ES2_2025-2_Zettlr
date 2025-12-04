/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        cssSafeString tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     Tests the cssSafeString utility function.
 *
 * END HEADER
 */

import assert from 'assert';
import cssSafeString from '@common/util/css-safe-string';

describe('Utility#cssSafeString()', function () {
    it('should convert strings to lowercase', function () {
        assert.strictEqual(cssSafeString('TeSt'), 'test');
    });

    it('should replace spaces with hyphens', function () {
        assert.strictEqual(cssSafeString('hello world'), 'hello-world');
        assert.strictEqual(cssSafeString('multiple   spaces'), 'multiple---spaces');
    });

    it('should remove invalid characters', function () {
        assert.strictEqual(cssSafeString('test!@#$%^&*()string'), 'teststring');
        assert.strictEqual(cssSafeString('email@address.com'), 'emailaddresscom');
    });

    it('should handle strings starting with a digit', function () {
        assert.strictEqual(cssSafeString('123class'), '_23class');
        assert.strictEqual(cssSafeString('9test'), '_test');
    });

    it('should handle strings starting with double hyphens', function () {
        assert.strictEqual(cssSafeString('--modifier'), '__modifier');
    });

    it('should handle strings starting with a hyphen followed by a digit', function () {
        assert.strictEqual(cssSafeString('-1test'), '__test');
    });

    it('should preserve valid internal underscores and hyphens', function () {
        assert.strictEqual(cssSafeString('snake_case_string'), 'snake_case_string');
        assert.strictEqual(cssSafeString('kebab-case-string'), 'kebab-case-string');
    });
});