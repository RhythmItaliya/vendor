import React from 'react';
import Button from './Button';

interface PaginationProps {
     page: number;
     totalPages: number;
     onPageChange: (page: number) => void;
     disabled?: boolean;
}

export default function Pagination({
     page,
     totalPages,
     onPageChange,
     disabled = false,
}: PaginationProps) {
     return (
          <div className="flex items-center gap-4">
               <Button
                    type="button"
                    variant="gray"
                    disabled={page === 1 || disabled}
                    aria-busy={false}
                    onClick={() => onPageChange(page - 1)}
               >
                    Prev
               </Button>
               {Array.from({ length: totalPages }, (_, i) => (
                    <button
                         key={i}
                         className={`px-2 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                         onClick={() => onPageChange(i + 1)}
                         disabled={page === i + 1 || disabled}
                    >
                         {i + 1}
                    </button>
               ))}
               <Button
                    type="button"
                    variant="gray"
                    disabled={page === totalPages || totalPages === 0 || disabled}
                    aria-busy={false}
                    onClick={() => onPageChange(page + 1)}
               >
                    Next
               </Button>
          </div>
     );
}
