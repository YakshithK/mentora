import { ModalType } from '@/types/modal';
import { create } from 'zustand';

interface ModalState {
    state: ModalType | null;
    onOpen: (newState: ModalType) => void;
    onClose: () => void;
}

const useModalStore = create<ModalState>((set) => ({
    state: null,
    onOpen: (newState: ModalType) => set({ state: newState }),
    onClose: () => set({ state: null }),
}));

export default useModalStore;