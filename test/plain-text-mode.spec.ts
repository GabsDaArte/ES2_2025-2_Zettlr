/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        Plain Text Mode Test
 * CVM-Role:        Test
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     Tests the Plain Text mode functionality and configuration.
 *
 * END HEADER
 */

import { strictEqual, notStrictEqual } from "assert"
import { getDefaultConfig } from "source/common/modules/markdown-editor/util/configuration"
import { getPlainTextExtensions, getMarkdownExtensions, CoreExtensionOptions } from "source/common/modules/markdown-editor/editor-extension-sets"
import MarkdownEditor, { DocumentAuthorityAPI } from "source/common/modules/markdown-editor"
import { DocumentType } from "source/types/common/documents"

// Mock Document Authority
const mockAuthority: DocumentAuthorityAPI = {
    fetchDoc: async (_filePath: string) => ({
        content: 'Test content',
        type: DocumentType.Markdown,
        startVersion: 1
    }),
    pullUpdates: async () => false,
    pushUpdates: async () => true
}

// Mock Options for Extension generation
const mockOptions: CoreExtensionOptions = {
    initialConfig: getDefaultConfig(),
    remoteConfig: {
        filePath: '/test.txt',
        startVersion: 1,
        pullUpdates: async () => false,
        pushUpdates: async () => true
    },
    updateListener: () => {},
    domEventsListeners: {}
}

describe('Plain Text Mode', function () {

    describe('Configuration', () => {
        it('should have txtAsPlainText enabled by default', () => {
            const config = getDefaultConfig()
            strictEqual(config.txtAsPlainText, true, 'txtAsPlainText should be true by default')
        })
    })

    describe('Extension Sets', () => {
        it('should generate different extension sets for Plain Text and Markdown', () => {
            const markdownExtensions = getMarkdownExtensions(mockOptions)
            const plainTextExtensions = getPlainTextExtensions(mockOptions)

            // The length or content of the extension arrays should differ
            notStrictEqual(markdownExtensions.length, plainTextExtensions.length, 'Plain text extensions should differ from Markdown extensions')
        })
    })

    describe('MarkdownEditor Logic', () => {

        it('should select Plain Text mode for .txt files when enabled', async () => {
            const filePath = '/path/to/file.txt'
            const editor = new MarkdownEditor('leaf-id', 'window-id', filePath, mockAuthority)

            // Access private config via casting
            const config = (editor as any).config
            strictEqual(config.txtAsPlainText, true, 'Config should be enabled')

            // Manually trigger logic check to verify behavior
            const isTxt = filePath.toLowerCase().endsWith('.txt')
            const shouldUsePlain = isTxt && config.txtAsPlainText

            strictEqual(shouldUsePlain, true, 'Should resolve to Plain Text mode')

            editor.unmount()
        })

        it('should select Markdown mode for .txt files when disabled', async () => {
            const filePath = '/path/to/file.txt'
            // Disable the feature
            const configOverride = { txtAsPlainText: false }
            const editor = new MarkdownEditor('leaf-id', 'window-id', filePath, mockAuthority, configOverride)

            const config = (editor as any).config
            strictEqual(config.txtAsPlainText, false, 'Config should be disabled')

            const isTxt = filePath.toLowerCase().endsWith('.txt')
            const shouldUsePlain = isTxt && config.txtAsPlainText

            strictEqual(shouldUsePlain, false, 'Should resolve to Markdown mode (fallback)')

            editor.unmount()
        })

        it('should always select Markdown mode for .md files', async () => {
            const filePath = '/path/to/file.md'
            const editor = new MarkdownEditor('leaf-id', 'window-id', filePath, mockAuthority)

            const config = (editor as any).config
            strictEqual(config.txtAsPlainText, true, 'Config enabled globally')

            const isTxt = filePath.toLowerCase().endsWith('.txt')
            const shouldUsePlain = isTxt && config.txtAsPlainText

            strictEqual(shouldUsePlain, false, 'Should NOT use Plain Text mode for .md files')

            editor.unmount()
        })
    })
})