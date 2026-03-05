import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "default" | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "w-[90%] sm:w-[75%] md:w-[60%] lg:max-w-sm",
  md: "w-[90%] sm:w-[75%] md:w-[60%] lg:max-w-md",
  lg: "w-[90%] sm:w-[80%] md:w-[65%] lg:max-w-lg",
  xl: "w-[90%] sm:w-[80%] md:w-[70%] lg:max-w-xl",
  default: "w-[95%] sm:w-[90%] md:w-[85%] lg:w-[70%]",
  full: "w-[95%] mx-2 sm:mx-4",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  footer,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div
        className={`
          relative z-10 ${sizeClasses[size]}
          bg-white dark:bg-gray-900
          rounded-2xl shadow-2xl
          flex flex-col
          min-h-[90vh]
          max-h-[90vh]
          animate-in fade-in zoom-in-95 duration-200
        `}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="px-4 sm:px-6 py-5 overflow-y-auto flex-1 text-gray-700 dark:text-gray-300 min-h-0 ">
          {children}
        </div>

        {footer && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
