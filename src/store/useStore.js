import { create } from 'zustand';

export const useStore = create((set, get) => ({
    unlockedSeasons: ['s1', 's2'],

    // State-uri UI
    isPhoneOpen: false,
    isReviewOpen: false,
    isCoffeeOpen: false,
    isMallOpen: false,
    hasNotification: true,
    isTransitioning: false,
    isMobile: false,

    // State Narațiune
    currentStep: 'STATION',

    // Navigație (opțional, dacă vrei să urmărești unde se află)
    currentLocation: 'HUB',
    setCurrentLocation: (loc) => set({ currentLocation: loc }),

    bikeProgress: 0,
    setBikeProgress: (val) => set({ bikeProgress: val }),
    isFriendInvited: false,
    inviteFriend: () => set({ isFriendInvited: true }),
    // Setters Simple
    setPhoneOpen: (val) => set({ isPhoneOpen: val }),
    setReviewOpen: (val) => set({ isReviewOpen: val }),
    setCoffeeOpen: (val) => set({ isCoffeeOpen: val }),
    setMallOpen: (val) => set({ isMallOpen: val }),
    setNotification: (val) => set({ hasNotification: val }),
    setIsMobile: (val) => set({ isMobile: val }),

    // Logică de tranzitie complexă
    handleNextStep: (STATIONS) => {
        const { currentStep } = get();
        const keys = Object.keys(STATIONS);
        const nextIndex = (keys.indexOf(currentStep) + 1) % keys.length;
        const nextStep = keys[nextIndex];

        set({ isTransitioning: true });

        setTimeout(() => {
            set({
                currentStep: nextStep,
                hasNotification: true,
                isPhoneOpen: false
            });
        }, 400);

        setTimeout(() => set({ isTransitioning: false }), 2500);
    }
}));