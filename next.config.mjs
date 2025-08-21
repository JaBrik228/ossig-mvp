/** @type {import('next').NextConfig} */
const nextConfig = {
	// Dev на Turbopack (Next 15+)
	turbopack: {
		rules: {
			// URL-импорт: import url from './icon.svg?url'
			"*.svg?url": { as: "asset" },
			// Компонент: import Icon from './icon.svg'
			"*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
		},
	},

	// Build / Webpack
	webpack(config) {
		// Берём существующее правило, которое ловит svg
		const fileLoaderRule = config.module.rules.find((r) =>
			r.test?.test?.(".svg"),
		)

		// 1) вернуть дефолтное поведение только для *.svg?url
		config.module.rules.push({
			...fileLoaderRule,
			test: /\.svg$/i,
			resourceQuery: /url/, // *.svg?url
		})

		// 2) все прочие *.svg → React-компоненты (SVGR)
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: fileLoaderRule.issuer, // .js/.ts/.jsx/.tsx
			resourceQuery: {
				not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/],
			},
			use: ["@svgr/webpack"],
		})

		// 3) исключаем svg из исходного правила
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
}

export default nextConfig
