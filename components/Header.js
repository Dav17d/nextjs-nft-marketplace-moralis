// import { ConnectButton } from "@web3uikit/web3"
import Link from "next/link"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function Header() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">Sell NFT</a>
                </Link>
                {/* <ConnectButton moralisAuth={false} /> */}
                {account ? (
                    <div className="mr-4 p-6">
                        Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                    </div>
                ) : (
                    <button
                        className="mr-4 p-6"
                        onClick={async () => {
                            await enableWeb3()
                            if (typeof window !== "undefined") {
                                window.localStorage.setItem("connected", "injected")
                            }
                        }}
                        disabled={isWeb3EnableLoading}
                    >
                        Connect
                    </button>
                )}
            </div>
        </nav>
    )
}
