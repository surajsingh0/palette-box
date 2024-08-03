import { createContext, useState, useContext, ReactNode } from "react";

interface ShadeContextProps {
    selectedShade: string | null;
    selectShade: (shade: string) => void;
}

const ShadeContext = createContext<ShadeContextProps | undefined>(undefined);

export const ShadeProvider = ({ children }: { children: ReactNode }) => {
    const [selectedShade, setSelectedShade] = useState<string | null>(null);

    const selectShade = (shade: string) => {
        setSelectedShade(shade);
        navigator.clipboard.writeText(shade);
    };

    return (
        <ShadeContext.Provider value={{ selectedShade, selectShade }}>
            {children}
        </ShadeContext.Provider>
    );
};

export const useShade = () => {
    const context = useContext(ShadeContext);
    if (!context) {
        throw new Error("useShade must be used within a ShadeProvider");
    }
    return context;
};
