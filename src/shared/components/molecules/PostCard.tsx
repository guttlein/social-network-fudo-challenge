import { Link } from 'react-router-dom';
import { Button } from '../atoms';
import type { Post } from '@/shared/types';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  showDeleteButton?: boolean;
}

export function PostCard({
  post,
  onDelete,
  showDeleteButton = true,
}: PostCardProps) {
  const handleDelete = () => {
    onDelete(post.id);
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

          {showDeleteButton && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Delete
            </Button>
          )}
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
