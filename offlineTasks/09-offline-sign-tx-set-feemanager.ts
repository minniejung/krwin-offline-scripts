import { ethers } from 'ethers'
import { Interface } from 'ethers/lib/utils.js'
import {
    ARTIFCAT_KRWIN,
    CHAIN_ID_MAINNET,
    CHAIN_ID_SEPOLIA,
    FEE_MANAGER_PROXY_ADDRESS,
    KRWIN_PROXY_ADDRESS,
    MEW_PRIVATE_KEY,
} from './utils/consts'
import { saveFile } from './utils/file.helper'

let nonce = 5 // TODO : double check nonce

async function main() {
    const iface = new Interface(ARTIFCAT_KRWIN.abi)
    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)

    // setFeeManager(address)
    const setFeeManagerData = iface.encodeFunctionData('setFeeManager', [FEE_MANAGER_PROXY_ADDRESS])
    const unsignedTx = {
        chainId: CHAIN_ID_MAINNET,
        nonce,
        gasPrice: ethers.utils.parseUnits('8', 'gwei'), // TODO : estimated gas fee
        gasLimit: 500000, // TODO : estimated gas fee
        to: KRWIN_PROXY_ADDRESS,
        value: 0,
        data: setFeeManagerData,
    }
    const signed = await wallet.signTransaction(unsignedTx)

    console.log('>>> Signed TX:\n', signed)

    const { data, ...unsignedTxWithoutData } = unsignedTx
    console.log('\n >>> unsignedTx (without data):', unsignedTxWithoutData)

    console.log('\n>>> FEE_MANAGER_PROXY_ADDRESS', FEE_MANAGER_PROXY_ADDRESS)
    console.log('>>> KRWIN_PROXY_ADDRESS', KRWIN_PROXY_ADDRESS)

    saveFile('signatures', '05-signed-tx-set-feemanager.txt', signed)
}

main().catch(console.error)
