import { IRegion } from "../model"

export default function fetchRegions(): IRegion[] {
	return [
		{ name: "Белгородская область", id: "belgorod" },
		{ name: "Брянская область", id: "bryansk" },
		{ name: "Владимирская область", id: "vladimir" },
		{ name: "Воронежская область", id: "voronezh" },
		{ name: "Ивановская область", id: "ivanovo" },
	]
}
