import create from 'zustand'

interface MapSettingsContextValue {
  showControl: boolean;
  toggleControl: () => void;
}

export const useMapSettingsStore = create<MapSettingsContextValue>()((set, get) => ({
  showControl: true,
  toggleControl: () => set((state) => ({ showControl: !get().showControl }))
}))