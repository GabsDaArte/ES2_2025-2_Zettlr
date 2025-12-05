/* eslint-disable no-undef */
/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        objectToArray tester
 * CVM-Role:        TESTING
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     This file tests the objectToArray utility function.
 *
 * END HEADER
 */

import { deepStrictEqual, strictEqual } from 'assert'
import objectToArray from '../source/common/util/object-to-array'

describe('Utility#objectToArray()', function () {
    it('should flatten a simple tree object', () => {
        const tree = {
            id: 1,
            name: 'root',
            children: [
                { id: 2, name: 'child1', children: [] },
                { id: 3, name: 'child2', children: [] }
            ]
        }
        const result = objectToArray(tree, 'children')
        strictEqual(result.length, 3)
        strictEqual(result[0].id, 1)
        strictEqual(result[1].id, 2)
        strictEqual(result[2].id, 3)
    })

    it('should handle nested tree with multiple levels', () => {
        const tree = {
            id: 1,
            name: 'root',
            children: [
                {
                    id: 2,
                    name: 'child1',
                    children: [
                        { id: 4, name: 'grandchild1', children: [] }
                    ]
                },
                { id: 3, name: 'child2', children: [] }
            ]
        }
        const result = objectToArray(tree, 'children')
        strictEqual(result.length, 4)
        strictEqual(result[0].id, 1)
        strictEqual(result[1].id, 2)
        strictEqual(result[2].id, 4)
        strictEqual(result[3].id, 3)
    })

    it('should handle an array of trees', () => {
        const trees = [
            { id: 1, name: 'tree1', children: [] },
            { id: 2, name: 'tree2', children: [] }
        ]
        const result = objectToArray(trees as any, 'children')
        strictEqual(result.length, 2)
        strictEqual(result[0].id, 1)
        strictEqual(result[1].id, 2)
    })

    it('should handle tree with no children property', () => {
        const tree = {
            id: 1,
            name: 'leaf'
        }
        const result = objectToArray(tree, 'children')
        strictEqual(result.length, 1)
        strictEqual(result[0].id, 1)
    })

    it('should handle tree with empty children array', () => {
        const tree = {
            id: 1,
            name: 'root',
            children: []
        }
        const result = objectToArray(tree, 'children')
        strictEqual(result.length, 1)
        strictEqual(result[0].id, 1)
    })

    it('should work with different traverse property names', () => {
        const tree = {
            id: 1,
            name: 'root',
            items: [
                { id: 2, name: 'item1', items: [] },
                { id: 3, name: 'item2', items: [] }
            ]
        }
        const result = objectToArray(tree, 'items')
        strictEqual(result.length, 3)
        strictEqual(result[0].id, 1)
        strictEqual(result[1].id, 2)
        strictEqual(result[2].id, 3)
    })

    it('should handle deeply nested trees', () => {
        const tree = {
            id: 1,
            children: [
                {
                    id: 2,
                    children: [
                        {
                            id: 3,
                            children: [
                                { id: 4, children: [] }
                            ]
                        }
                    ]
                }
            ]
        }
        const result = objectToArray(tree, 'children')
        strictEqual(result.length, 4)
        strictEqual(result[0].id, 1)
        strictEqual(result[1].id, 2)
        strictEqual(result[2].id, 3)
        strictEqual(result[3].id, 4)
    })

    it('should preserve all properties of nodes', () => {
        const tree = {
            id: 1,
            name: 'root',
            value: 100,
            children: [
                { id: 2, name: 'child', value: 50, children: [] }
            ]
        }
        const result = objectToArray(tree, 'children')
        strictEqual(result[0].value, 100)
        strictEqual(result[1].value, 50)
    })

    it('should handle array of nested trees', () => {
        const trees = [
            {
                id: 1,
                children: [
                    { id: 2, children: [] }
                ]
            },
            {
                id: 3,
                children: [
                    { id: 4, children: [] }
                ]
            }
        ]
        const result = objectToArray(trees as any, 'children')
        strictEqual(result.length, 4)
        strictEqual(result[0].id, 1)
        strictEqual(result[1].id, 2)
        strictEqual(result[2].id, 3)
        strictEqual(result[3].id, 4)
    })
})
