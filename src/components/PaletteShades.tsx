import { useMemo } from "react";
import { generateShades } from "../utils";
import { useShade } from "../context/ShadeContext";

const PaletteShades = ({ color }: { color: string }) => {
    const shades = useMemo(() => generateShades(color, 500), [color]);
    const { selectShade } = useShade();

    return (
        <div className="custom-grid h-96">
            {shades.map((shade, index) => (
                <div
                    onClick={() => selectShade(shade)}
                    className={`hover:scale-150 hover:shadow-md ${
                        index < shades.length / 1.5
                            ? "hover:shadow-black/50"
                            : "hover:shadow-slate-500/50"
                    }`}
                    key={index}
                    style={{
                        backgroundColor: shade,
                    }}
                />
            ))}
        </div>
    );
};

export default PaletteShades;
