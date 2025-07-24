import React from 'react';

interface ConfirmDialogProps {
     open: boolean;
     title?: string;
     message: string;
     onConfirm: () => void;
     onCancel: () => void;
     confirmText?: string;
     cancelText?: string;
     loading?: boolean;
}

export default function ConfirmDialog({
     open,
     title = 'Confirm',
     message,
     onConfirm,
     onCancel,
     confirmText = 'Delete',
     cancelText = 'Cancel',
     loading = false,
}: ConfirmDialogProps) {
     if (!open) return null;
     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
               <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm">
                    <div className="mb-4">
                         <h3 className="text-lg font-semibold mb-2">{title}</h3>
                         <p className="text-gray-700">{message}</p>
                    </div>

                    <div className="flex justify-end gap-2">
                         <button
                              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                              onClick={onCancel}
                              type="button"
                              disabled={loading}
                         >
                              {cancelText}
                         </button>

                         <button
                              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center justify-center min-w-[80px]"
                              onClick={onConfirm}
                              type="button"
                              disabled={loading}
                         >
                              {loading ? (
                                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></span>
                              ) : null}
                              {confirmText}
                         </button>
                    </div>
               </div>
          </div>
     );
}
