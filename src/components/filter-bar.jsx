import React from "react"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarRadioGroup,
    MenubarRadioItem,
} from "@/components/ui/menubar"

export function AnalyticsFilterMenubar({
                                           selectedPlant,
                                           setSelectedPlant,
                                           selectedCategory,
                                           setSelectedCategory,
                                           selectedIndex,
                                           setSelectedIndex,
                                       }) {
    return (
        <Menubar className="bg-transparent border-none bg-primary">
            {/* PLANT FILTER */}
            <MenubarMenu>
                <MenubarTrigger className="bg-secondary">Plant</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup
                        value={selectedPlant}
                        onValueChange={(value) => setSelectedPlant(value)}
                    >
                        <MenubarRadioItem value="plant-a">Plant A</MenubarRadioItem>
                        <MenubarRadioItem value="plant-b">Plant B</MenubarRadioItem>
                    </MenubarRadioGroup>
                </MenubarContent>
            </MenubarMenu>

            {/* CATEGORY FILTER */}
            <MenubarMenu>
                <MenubarTrigger className="bg-secondary">Category</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup
                        value={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}
                    >
                        <MenubarRadioItem value="moulage">Moulage</MenubarRadioItem>
                        <MenubarRadioItem value="froid">Froid</MenubarRadioItem>
                        <MenubarRadioItem value="coupe">Coupe</MenubarRadioItem>
                        <MenubarRadioItem value="climatisation">Climatisation</MenubarRadioItem>
                        <MenubarRadioItem value="lighting">Lighting</MenubarRadioItem>
                        <MenubarRadioItem value="ventilation">Ventilation</MenubarRadioItem>
                    </MenubarRadioGroup>
                </MenubarContent>
            </MenubarMenu>

            {/* INDEX FILTER */}
            <MenubarMenu>
                <MenubarTrigger className="bg-secondary">Index</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup
                        value={selectedIndex}
                        onValueChange={(value) => setSelectedIndex(value)}
                    >
                        <MenubarRadioItem value="consumption">Conumption</MenubarRadioItem>
                        <MenubarRadioItem value="Cost">Cost</MenubarRadioItem>
                        <MenubarRadioItem value="efficiency">Efficiency</MenubarRadioItem>
                    </MenubarRadioGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
