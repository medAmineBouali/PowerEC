import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

export default function FilterMenu() {
    const [selectedPlants, setSelectedPlants] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);

    const toggleSelection = (value, currentSelection, setSelection) => {
        setSelection((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <Menubar className="bg-transparent border-none bg-primary">
            {/* PLANT FILTER */}
            <MenubarMenu>
                <MenubarTrigger className="bg-secondary">Plant</MenubarTrigger>
                <MenubarContent>
                    <div className="flex flex-col space-y-2 p-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="plant-a"
                                checked={selectedPlants.includes('plant-a')}
                                onCheckedChange={() => toggleSelection('plant-a', selectedPlants, setSelectedPlants)}
                            />
                            <label htmlFor="plant-a">Plant A</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="plant-b"
                                checked={selectedPlants.includes('plant-b')}
                                onCheckedChange={() => toggleSelection('plant-b', selectedPlants, setSelectedPlants)}
                            />
                            <label htmlFor="plant-b">Plant B</label>
                        </div>
                    </div>
                </MenubarContent>
            </MenubarMenu>

            {/* CATEGORY FILTER */}
            <MenubarMenu>
                <MenubarTrigger className="bg-secondary">Category</MenubarTrigger>
                <MenubarContent>
                    <div className="flex flex-col space-y-2 p-2">
                        {['moulage', 'froid', 'coupe', 'climatisation', 'lighting', 'ventilation'].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                    id={category}
                                    checked={selectedCategories.includes(category)}
                                    onCheckedChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                                />
                                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                </MenubarContent>
            </MenubarMenu>

            {/* INDEX FILTER */}
            <MenubarMenu>
                <MenubarTrigger className="bg-secondary">Index</MenubarTrigger>
                <MenubarContent>
                    <div className="flex flex-col space-y-2 p-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="consumption"
                                checked={selectedIndices.includes('consumption')}
                                onCheckedChange={() => toggleSelection('consumption', selectedIndices, setSelectedIndices)}
                            />
                            <label htmlFor="consumption">Consumption</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="cost"
                                checked={selectedIndices.includes('cost')}
                                onCheckedChange={() => toggleSelection('cost', selectedIndices, setSelectedIndices)}
                            />
                            <label htmlFor="cost">Cost</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="efficiency"
                                checked={selectedIndices.includes('efficiency')}
                                onCheckedChange={() => toggleSelection('efficiency', selectedIndices, setSelectedIndices)}
                            />
                            <label htmlFor="efficiency">Efficiency</label>
                        </div>
                    </div>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
