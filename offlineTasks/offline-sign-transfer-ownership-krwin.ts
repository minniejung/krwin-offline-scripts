import { ethers } from 'ethers'
import { Interface } from 'ethers/lib/utils.js'
import {
    ARTIFCAT_KRWIN,
    CHAIN_ID_MAINNET,
    CHAIN_ID_SEPOLIA,
    KRWIN_PROXY_ADDRESS,
    MEW_PRIVATE_KEY,
    MULTISIG_ADDRESS,
    SETTER_GAS_LIMIT,
    SETTER_GAS_PRICE,
} from './utils/consts'
import { saveFile } from './utils/file.helper'

let nonce = 27 // TODO : double check nonce

async function main() {
    const iface = new Interface(ARTIFCAT_KRWIN.abi)
    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)

    const data = iface.encodeFunctionData('transferOwnership', [MULTISIG_ADDRESS])

    const tx = {
        chainId: CHAIN_ID_MAINNET, // TODO : change to CHAIN_ID_MAINNET
        nonce: nonce,
        gasPrice: SETTER_GAS_PRICE,
        gasLimit: SETTER_GAS_LIMIT,
        to: KRWIN_PROXY_ADDRESS,
        value: 0,
        data,
    }

    const signed = await wallet.signTransaction(tx)
    saveFile('signatures', `${nonce}-signed-transfer-ownership-krwin.txt`, signed)
}

main().catch(console.error)
