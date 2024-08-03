export const generateHexColor = () => {
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
};

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

export const getLumunanceColor = (hex: string) => {
    return getLuminance(hex) >= 0.5 ? "black" : "white";
};

// Function to convert hex color to RGB
function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Function to convert RGB to hex color
function rgbToHex(r: number, g: number, b: number) {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}

// Function to generate shades of a given hex color
export function generateShades(hex: string, numberOfShades: number) {
    const { r, g, b } = hexToRgb(hex);
    const shades = [];
    for (let i = 0; i < numberOfShades; i++) {
        const shadeFactor = (i + 1) / (numberOfShades + 1);
        const newR = Math.floor(r * (1 - shadeFactor));
        const newG = Math.floor(g * (1 - shadeFactor));
        const newB = Math.floor(b * (1 - shadeFactor));
        shades.push(rgbToHex(newR, newG, newB));
    }
    return shades;
}
