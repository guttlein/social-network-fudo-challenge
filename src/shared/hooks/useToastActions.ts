import { useToast } from '../contexts/ToastContext';

export function useToastActions() {
  const { addToast } = useToast();

  const showSuccess = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string) => {
    const errorMessages = [
      'Oops! Something went wrong.',
      "That didn't work as expected.",
      'We hit a snag there.',
      "Something's not quite right.",
    ];
    const randomError =
      errorMessages[Math.floor(Math.random() * errorMessages.length)];
    addToast({
      type: 'error',
      title,
      message: message || randomError,
    });
  };

  const showWarning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  const showInfo = (title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  };

  // Post-related toasts with personality and context
  const showPostCreated = () => {
    const messages = [
      'Your post is now live and ready for the community!',
      'Your thoughts are now out there for everyone to see!',
      'The community is waiting to hear from you!',
      'Your post has joined the conversation!',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showSuccess('Post Published! 🚀', randomMessage);
  };

  const showPostUpdated = () => {
    const messages = [
      'Your post has been refreshed with new ideas!',
      'The community will see your latest thoughts now!',
      'Your updated post is ready to inspire!',
      'Changes saved and ready to make an impact!',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showSuccess('Post Updated ✨', randomMessage);
  };

  const showPostDeleted = () => {
    const messages = [
      'Post removed from the timeline.',
      'Your post has been taken down.',
      'Post deleted successfully.',
      'That post is now history.',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showSuccess('Post Removed 🗑️', randomMessage);
  };

  const showCommentCreated = () => {
    const messages = [
      'Your comment is now part of the discussion!',
      "You've added your voice to the conversation!",
      'Your thoughts are now visible to everyone!',
      'The community can see your perspective now!',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showSuccess('Comment Posted 💬', randomMessage);
  };

  const showCommentUpdated = () => {
    const messages = [
      'Your comment has been refreshed!',
      'Your updated thoughts are now visible!',
      'Comment updated and ready for discussion!',
      'Your refined comment is now live!',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showSuccess('Comment Updated ✏️', randomMessage);
  };

  const showCommentDeleted = () => {
    const messages = [
      'Comment removed from the thread.',
      'Your comment has been taken down.',
      'Comment deleted successfully.',
      'That comment is no longer visible.',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showSuccess('Comment Removed 🗑️', randomMessage);
  };

  const showErrorCreating = (item: string) => {
    const itemLower = item.toLowerCase();
    const messages = [
      `We couldn't create your ${itemLower}. Let's try again!`,
      `Creating ${itemLower} failed. Don't worry, we'll get it right!`,
      `Something went wrong while creating your ${itemLower}.`,
      `The ${itemLower} creation hit a roadblock.`,
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showError(`Can't Create ${item} 😕`, randomMessage);
  };

  const showErrorUpdating = (item: string) => {
    const itemLower = item.toLowerCase();
    const messages = [
      `We couldn't update your ${itemLower}. Let's try again!`,
      `Updating ${itemLower} failed. Don't worry, we'll get it right!`,
      `Something went wrong while updating your ${itemLower}.`,
      `The ${itemLower} update hit a roadblock.`,
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showError(`Can't Update ${item} 😕`, randomMessage);
  };

  const showErrorDeleting = (item: string) => {
    const itemLower = item.toLowerCase();
    const messages = [
      `We couldn't delete your ${itemLower}. Let's try again!`,
      `Deleting ${itemLower} failed. Don't worry, we'll get it right!`,
      `Something went wrong while deleting your ${itemLower}.`,
      `The ${itemLower} deletion hit a roadblock.`,
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showError(`Can't Delete ${item} 😕`, randomMessage);
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
