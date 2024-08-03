import { useState, useMemo, useEffect } from "react";
import { generateHexColor, getLumunanceColor } from "../utils";
import PaletteShades from "./PaletteShades";
import Modal from "./ui/Modal";
import { useShade } from "../context/ShadeContext";

const Palette = () => {
    const [color, _] = useState(generateHexColor());
    const [hovered, setHover] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isShadesOpen, setOnShadesOpen] = useState(false);
    const { selectShade } = useShade();

    const lumunanceColor = useMemo(() => getLumunanceColor(color), [color]);

    const copyColor = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    useEffect(() => {
        if (isShadesOpen) {
            selectShade("");
        }
    }, [isShadesOpen]);

    return (
        <div
            aria-label={`Color code ${color.slice(1)}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={copyColor}
            style={{ backgroundColor: color }}
            className={`palette flex justify-center items-center hover:cursor-pointer ${
                copied ? "palette-copied" : ""
            }`}
        >
            <button
                onClick={() => setOnShadesOpen(!isShadesOpen)}
                className={`absolute top-3 right-3 border p-1 rounded hover:scale-105`}
                style={{
                    color: lumunanceColor,
                    borderColor: lumunanceColor,
                    opacity: hovered ? 1 : 0,
                    transition: "all 0.3s ease",
                }}
            >
                Shades
            </button>
            <span
                style={{ color: lumunanceColor }}
                className={`${hovered || copied ? "text-xl" : "text-base"}`}
            >
                {copied ? "Copied!" : color.slice(1).toUpperCase()}
            </span>

            <Modal
                isOpen={isShadesOpen}
                onClose={() => setOnShadesOpen(false)}
                children={<PaletteShades color={color} />}
            />
        </div>
    );
};

export default Palette;
