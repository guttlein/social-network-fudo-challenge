import { Modal } from './Modal';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  isDeletingComments?: boolean;
  commentsProgress?: {
    total: number;
    deleted: number;
    current: string;
  };
  isCompleted?: boolean;
  successMessage?: string;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isDeleting = false,
  isDeletingComments = false,
  commentsProgress,
  isCompleted = false,
  successMessage = 'Operation completed successfully!',
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    if (!isCompleted) {
      onConfirm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4 sm:space-y-6">
        {/* Icon - Changes based on state */}
        <div className="flex justify-center">
          {isCompleted ? (
            // Success Icon
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            // Warning Icon
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Message - Changes based on state */}
        {isCompleted ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Success!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              {successMessage}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm sm:text-base px-2">
            {message}
          </p>
        )}

        {/* Comments Deletion Progress */}
        {isDeletingComments && commentsProgress && (
          <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 font-medium">
                Deleting comments...
              </span>
              <span className="text-blue-600">
                {commentsProgress.deleted}/{commentsProgress.total}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${commentsProgress.total > 0 ? (commentsProgress.deleted / commentsProgress.total) * 100 : 0}%`,
                }}
              />
            </div>

            {/* Current Comment Being Deleted */}
            {commentsProgress.current && (
              <p className="text-xs text-blue-600 text-center truncate">
                {commentsProgress.current}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {isCompleted ? (
            // Only Close button when completed
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium"
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={isDeleting || isDeletingComments}
                className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isDeleting || isDeletingComments}
                className="flex-1 px-4 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
              >
                {isDeleting || isDeletingComments ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {isDeletingComments
                      ? 'Deleting Comments...'
                      : 'Deleting...'}
                  </div>
                ) : (
                  confirmText
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
