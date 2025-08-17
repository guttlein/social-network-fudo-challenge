import { Link } from 'react-router-dom';
import { Button } from '../atoms';
import type { Post } from '@/shared/types';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

export function PostCard({
  post,
  onDelete,
  onEdit,
  showDeleteButton = true,
  showEditButton = true,
}: PostCardProps) {
  const handleDelete = () => {
    onDelete(post.id);
  };

  const handleEdit = () => {
    onEdit?.(post.id);
  };

  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.avatar || '/default-avatar.png'}
              alt={post.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={e => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <div>
              <h3 className="font-semibold text-gray-900">{post.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {showEditButton && onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEdit}
                aria-label={`Edit post by ${post.name}`}
              >
                Edit
              </Button>
            )}

            {showDeleteButton && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                aria-label={`Delete post by ${post.name}`}
              >
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            to={`/post/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            See Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
