import { ModalType } from '@/types/modal';
import { create } from 'zustand';

interface ModalState {
    state: ModalType | null;
    open: (newState: ModalType) => void;
    close: () => void;
}

const useModalStore = create<ModalState>((set) => ({
    state: null,
    open: (newState: ModalType) => set({ state: newState }),
    close: () => set({ state: null }),
}));

export default useModalStore;