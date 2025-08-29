import Button from '../Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
  height?: number;
  width?: number;
};

function Modal({
  isOpen,
  onClose,
  title = '',
  children,
  onConfirm,
  confirmText = 'Confirm',
  onCancel,
  cancelText = 'Cancel',
  height = 300,
  width = 350,
}: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="flex justify-center items-center w-screen h-full position fixed bg-opacity-60 top-0 left-0 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`flex flex-col p-4 w-[${width}px] h-[${height}px] bg-customBg rounded-2xl border border-customBorderGray`}
      >
        {/* Title Area */}
        <div className="flex items-center h-[12%] font-semibold">{title}</div>

        {/* Content Area */}
        <div className="flex-grow h-[60%] overflow-auto">{children}</div>

        {/* Action Area */}
        <div className="h-[28%] flex gap-3 items-center justify-end">
          <Button
            text={cancelText}
            color="bg-red-500"
            onClick={onCancel ?? onClose}
          />
          {onConfirm && <Button text={confirmText} onClick={onConfirm} />}
        </div>
      </div>
    </div>
  );
}
export default Modal;
