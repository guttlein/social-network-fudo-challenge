import { useToast } from '../contexts/ToastContext';

export function useToastActions() {
  const { addToast } = useToast();

  const showSuccess = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string) => {
    addToast({ type: 'error', title, message });
  };

  const showWarning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  const showInfo = (title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  };

  const showPostCreated = () => {
    showSuccess('Post Created', 'Your post has been published successfully!');
  };

  const showPostUpdated = () => {
    showSuccess('Post Updated', 'Your post has been updated successfully!');
  };

  const showPostDeleted = () => {
    showSuccess('Post Deleted', 'Your post has been deleted successfully!');
  };

  const showCommentCreated = () => {
    showSuccess('Comment Added', 'Your comment has been posted successfully!');
  };

  const showCommentUpdated = () => {
    showSuccess(
      'Comment Updated',
      'Your comment has been updated successfully!'
    );
  };

  const showCommentDeleted = () => {
    showSuccess(
      'Comment Deleted',
      'Your comment has been deleted successfully!'
    );
  };

  const showErrorCreating = (item: string) => {
    showError(
      `Error Creating ${item}`,
      `Failed to create ${item.toLowerCase()}. Please try again.`
    );
  };

  const showErrorUpdating = (item: string) => {
    showError(
      `Error Updating ${item}`,
      `Failed to update ${item.toLowerCase()}. Please try again.`
    );
  };

  const showErrorDeleting = (item: string) => {
    showError(
      `Error Deleting ${item}`,
      `Failed to delete ${item.toLowerCase()}. Please try again.`
    );
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showPostCreated,
    showPostUpdated,
    showPostDeleted,
    showCommentCreated,
    showCommentUpdated,
    showCommentDeleted,
    showErrorCreating,
    showErrorUpdating,
    showErrorDeleting,
  };
}
