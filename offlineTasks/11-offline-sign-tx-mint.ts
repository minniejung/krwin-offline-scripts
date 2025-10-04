import dotenv from 'dotenv'
import { ethers } from 'ethers'
import { formatUnits, Interface, parseUnits } from 'ethers/lib/utils.js'
import fs from 'fs'
import { ARTIFCAT_KRWIN, CHAIN_ID_SEPOLIA, KRWIN_PROXY_ADDRESS, MEW_PRIVATE_KEY } from './utils/consts'

dotenv.config()

const TO = process.env.MINT_TO_WALLET_ADDRESS || '' // TODO : change to TO
const AMOUNT = '200000000' // KRWIN amount

let nonce = 8 // TODO : double check nonce
const GAS_LIMIT = 200000 // TODO : estimated gas fee
const GAS_PRICE = parseUnits('10', 'gwei') // TODO : estimated gas fee

async function main() {
    const iface = new Interface(ARTIFCAT_KRWIN.abi)
    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)

    // mint(to, amount)
    const mintAmount = parseUnits(AMOUNT, 18)
    const mintData = iface.encodeFunctionData('mint', [TO, mintAmount])

    const unsignedTx = {
        chainId: CHAIN_ID_SEPOLIA, // TODO : change to CHAIN_ID_MAINNET
        nonce: nonce,
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
        to: KRWIN_PROXY_ADDRESS,
        value: 0,
        data: mintData,
    }

    const signed = await wallet.signTransaction(unsignedTx)
    fs.writeFileSync('signed-mint.txt', signed)

    console.log('>>> wrote signed-mint.txt')
    console.log(`>>> mint ${formatUnits(mintAmount, 18)} KRWIN to ${TO}`)
}

main().catch(console.error)
