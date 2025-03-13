interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Don't render if modal is closed.
  if (!isOpen) return null;

  return (
    <main className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 transition-opacity duration-300">
      {/* Modal Container */}
      <section className="bg-white rounded-lg shadow-lg p-6 min-h-[16rem] w-[32rem] flex flex-col justify-between space-y-4">
        {/* Modal Header */}
        <header className="flex justify-between items-center border-b border-gray-300 pb-2">
          <h2 className="text-lg font-semibold">{title || "Modal Title"}</h2>
          <button
            onClick={onClose}
            className="text-xl cursor-pointer px-2 py-0.8 rounded-full transition-colors duration-300 hover:bg-black/20 font-medium"
          >
            &times;
          </button>
        </header>

        {/* Modal Content */}
        <section className="flex-grow flex">{children}</section>

        {/* Modal Footer */}
        {/* <footer className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            Close
          </button>
        </footer> */}
      </section>
    </main>
  );
};

export default Modal;
