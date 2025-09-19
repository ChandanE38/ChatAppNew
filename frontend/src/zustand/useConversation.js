import { createWithEqualityFn } from 'zustand/traditional';

const useConversation = createWithEqualityFn((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;
