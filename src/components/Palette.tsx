import { useState, useMemo } from "react";

function generateHexColor() {
    // Generate a random integer between 0 and 255 for red, green, and blue
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert each color component to a 2-digit hexadecimal string
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");

    // Concatenate the hex strings and return the full hex color
    return `#${hexR}${hexG}${hexB}`;
}

const getLuminance = (hex: string) => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Calculate luminance
    const a = [r, g, b].map((value) => {
        return value <= 0.03928
            ? value / 12.92
            : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getLumunanceColor = (hex: string) => {
    return getLuminance(hex) >= 0.5 ? "black" : "white";
};

const Palette = () => {
    const [color, _] = useState(generateHexColor());
    const [hovered, setHover] = useState(false);
    const [copied, setCopied] = useState(false);

    const lumunanceColor = useMemo(() => getLumunanceColor(color), [color]);

    const copyColor = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

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
            <span
                style={{ color: lumunanceColor }}
                className={`${hovered || copied ? "text-xl" : "text-base"}`}
            >
                {copied ? "Copied!" : color.slice(1).toUpperCase()}
            </span>
        </div>
    );
};

export default Palette;
