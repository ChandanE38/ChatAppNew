import {create} from 'zustand';

//this is same things like:- using useState for defining state and setterFunction;
const useConversation = create((set) => ({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation) => set(({selectedConversation})),
    messages:[],
    setMessages: (messages) => set({ messages }),

}));

export default useConversation;