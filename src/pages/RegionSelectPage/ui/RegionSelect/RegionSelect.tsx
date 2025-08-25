"use client"

import { useEffect, useState } from "react"

import textLogo from "@/assets/icons/text-logo.png"
import { Card, Flex, message, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { useRouter } from "next/navigation"

import { fetchRegions } from "@entities/region"
import { useRegion } from "@shared/lib"
import { BubleCard, StyledButton } from "@shared/ui"

import styles from "./RegionSelect.module.scss"

// const regions: IRegion[] = [
// 	{ label: "Белгородская область", value: "belgorod" },
// 	{ label: "Брянская область", value: "bryansk" },
// 	{ label: "Владимирская область", value: "vladimir" },
// 	{ label: "Воронежская область", value: "voronezh" },
// 	{ label: "Ивановская область", value: "ivanovo" },
// ]

export default function RegionSelect () {
	const { saveRegion } = useRegion()

	const [ regions, setRegions ] = useState<DefaultOptionType[]>([])
	const [ selected, setSelected ] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const regions = fetchRegions()

		const formatedRegions = regions.map(({ name, id }): DefaultOptionType => {
			return {
				label: name,
				value: id,
			}
		})

		setRegions(formatedRegions)
	}, [])

	const handleNext = () => {
		if (!selected) {
			message.error("Пожалуйста, выберите регион")
			return
		}

		saveRegion(selected)
		router.push("/login")
	}

	return (
		<Flex
			justify="center"
			align="center"
			style={ {
				minHeight: "100vh",
				minWidth: "100vw",
				background: "linear-gradient(135deg, #dff5f1, #eef5fb)",
			} }
		>
			<BubleCard
				style={ {
					borderRadius: 50,
					padding: "45px 47px 50px 56px",
					textAlign: "center",
					boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
				} }
			>
				<img
					style={ { display: "block", margin: "0 auto" } }
					src={ textLogo.src }
					alt="Логотип"
				/>

				<Select
					size="large"
					placeholder="Выберите ваш регион"
					options={
						regions.length
							? regions
							: [ { label: "загрузка...", disabled: true } ]
					}
					style={ {
						// minWidth: "100% !important",
						width: "400px",
						marginTop: "92px",
					} }
					popupMatchSelectWidth={ false }
					value={ selected || undefined }
					onChange={ (val) => setSelected(val) }
					classNames={ {
						popup: {
							root: styles.selectPopup,
						},
					} }
				/>

				<StyledButton
					style={ {
						marginTop: "80px",
					} }
					type="primary"
					block
					onClick={ handleNext }
				>
					Далее
				</StyledButton>
			</BubleCard>
		</Flex>
	)
}
