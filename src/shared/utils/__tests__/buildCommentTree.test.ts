import { describe, it, expect } from 'vitest';
import { buildCommentTree } from '../buildCommentTree';
import { Comment } from '../../types';

describe('buildCommentTree', () => {
  const mockComments: Comment[] = [
    {
      id: '1',
      name: 'User 1',
      avatar: 'avatar1.jpg',
      content: 'First comment',
      createdAt: '2024-01-01T00:00:00Z',
      parentId: null,
    },
    {
      id: '2',
      name: 'User 2',
      avatar: 'avatar2.jpg',
      content: 'Reply to first comment',
      createdAt: '2024-01-01T01:00:00Z',
      parentId: '1',
    },
    {
      id: '3',
      name: 'User 3',
      avatar: 'avatar3.jpg',
      content: 'Second comment',
      createdAt: '2024-01-01T02:00:00Z',
      parentId: null,
    },
    {
      id: '4',
      name: 'User 4',
      avatar: 'avatar4.jpg',
      content: 'Reply to second comment',
      createdAt: '2024-01-01T03:00:00Z',
      parentId: '3',
    },
    {
      id: '5',
      name: 'User 5',
      avatar: 'avatar5.jpg',
      content: 'Nested reply',
      createdAt: '2024-01-01T04:00:00Z',
      parentId: '4',
    },
  ];

  it('should build a flat tree when no nested comments exist', () => {
    const flatComments: Comment[] = [
      {
        id: '1',
        name: 'User 1',
        avatar: 'avatar1.jpg',
        content: 'Comment 1',
        createdAt: '2024-01-01T00:00:00Z',
        parentId: null,
      },
      {
        id: '2',
        name: 'User 2',
        avatar: 'avatar2.jpg',
        content: 'Comment 2',
        createdAt: '2024-01-01T01:00:00Z',
        parentId: null,
      },
    ];

    const result = buildCommentTree(flatComments);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[0].children).toHaveLength(0);
    expect(result[1].id).toBe('2');
    expect(result[1].children).toHaveLength(0);
  });

  it('should build a nested tree with proper children', () => {
    const result = buildCommentTree(mockComments);

    expect(result).toHaveLength(2); // Only root comments

    // First comment with one reply
    const firstComment = result.find(node => node.id === '1');
    expect(firstComment).toBeDefined();
    expect(firstComment?.children).toHaveLength(1);
    expect(firstComment?.children[0].id).toBe('2');

    // Second comment with nested replies
    const secondComment = result.find(node => node.id === '3');
    expect(secondComment).toBeDefined();
    expect(secondComment?.children).toHaveLength(1);

    const firstReply = secondComment?.children[0];
    expect(firstReply?.id).toBe('4');
    expect(firstReply?.children).toHaveLength(1);

    const nestedReply = firstReply?.children[0];
    expect(nestedReply?.id).toBe('5');
    expect(nestedReply?.children).toHaveLength(0);
  });

  it('should handle empty comments array', () => {
    const result = buildCommentTree([]);
    expect(result).toHaveLength(0);
  });

  it('should handle comments with invalid parentId', () => {
    const commentsWithInvalidParent: Comment[] = [
      {
        id: '1',
        name: 'User 1',
        avatar: 'avatar1.jpg',
        content: 'Comment with invalid parent',
        createdAt: '2024-01-01T00:00:00Z',
        parentId: '999', // Non-existent parent
      },
    ];

    const result = buildCommentTree(commentsWithInvalidParent);

    // Should still create the comment as a root comment
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].children).toHaveLength(0);
    expect(result[0].isOrphaned).toBe(true);
  });

  it('should maintain comment order within same level', () => {
    const orderedComments: Comment[] = [
      {
        id: '1',
        name: 'User 1',
        avatar: 'avatar1.jpg',
        content: 'First root comment',
        createdAt: '2024-01-01T00:00:00Z',
        parentId: null,
      },
      {
        id: '2',
        name: 'User 2',
        avatar: 'avatar2.jpg',
        content: 'Second root comment',
        createdAt: '2024-01-01T01:00:00Z',
        parentId: null,
      },
    ];

    const result = buildCommentTree(orderedComments);

    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

  it('should handle deep nesting correctly', () => {
    const deepNestedComments: Comment[] = [
      {
        id: '1',
        name: 'User 1',
        avatar: 'avatar1.jpg',
        content: 'Root comment',
        createdAt: '2024-01-01T00:00:00Z',
        parentId: null,
      },
      {
        id: '2',
        name: 'User 2',
        avatar: 'avatar2.jpg',
        content: 'Level 1',
        createdAt: '2024-01-01T01:00:00Z',
        parentId: '1',
      },
      {
        id: '3',
        name: 'User 3',
        avatar: 'avatar3.jpg',
        content: 'Level 2',
        createdAt: '2024-01-01T02:00:00Z',
        parentId: '2',
      },
      {
        id: '4',
        name: 'User 4',
        avatar: 'avatar4.jpg',
        content: 'Level 3',
        createdAt: '2024-01-01T03:00:00Z',
        parentId: '3',
      },
    ];

    const result = buildCommentTree(deepNestedComments);

    expect(result).toHaveLength(1);
    expect(result[0].children[0].children[0].children[0].id).toBe('4');
  });

  it('should mark orphaned comments correctly', () => {
    const orphanedComments: Comment[] = [
      {
        id: '1',
        name: 'User 1',
        avatar: 'avatar1.jpg',
        content: 'Orphaned comment',
        createdAt: '2024-01-01T00:00:00Z',
        parentId: '999', // Non-existent parent
      },
    ];

    const result = buildCommentTree(orphanedComments);

    expect(result).toHaveLength(1);
    expect(result[0].isOrphaned).toBe(true);
    expect(result[0].children).toHaveLength(0);
  });
});
