import { create } from "zustand";

interface RentModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useCreateModal = create<RentModalProps>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreateModal;
