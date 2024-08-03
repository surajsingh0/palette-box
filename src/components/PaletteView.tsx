import Palette from "./Palette";

const n = 20;

const PaletteView = () => {
    return (
        <div className="grid grid-cols-5 justify-items-stretch items-stretch w-full h-screen bg-red-50">
            {Array.from({ length: n }, (_, index) => (
                <Palette key={index} />
            ))}
        </div>
    );
};

export default PaletteView;
