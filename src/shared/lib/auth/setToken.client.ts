import setCookie from "../cookies/setCookie.client"

export default function saveToken(jwt: string) {
	setCookie("jwt", jwt, 10)
}
