import { useEffect } from "react";
import { useShade } from "../../context/ShadeContext";

const Modal = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode | any;
}) => {
    const { selectedShade } = useShade();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "";
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    const handleOverlayClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                handleOverlayClick(e);
            }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-lg relative"
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal="true"
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div
                    id="modal-title"
                    className="text-xl pl-4 pt-4 font-semibold mb-4 flex justify-center"
                >
                    <h2 style={{ color: children.props.color }}>
                        {children.props.color.toUpperCase()}
                    </h2>
                    <h2
                        className="ml-2"
                        style={{ color: selectedShade ? selectedShade : "" }}
                    >
                        {selectedShade ? `${selectedShade.toUpperCase()} Copied!` : ""}
                    </h2>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;
