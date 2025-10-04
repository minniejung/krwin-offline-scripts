import { ethers } from 'ethers'
import { Interface } from 'ethers/lib/utils.js'
import {
    ARTIFCAT_KRWIN,
    CHAIN_ID_MAINNET,
    CHAIN_ID_SEPOLIA,
    KRWIN_PROXY_ADDRESS,
    MEW_PRIVATE_KEY,
} from './utils/consts'
import { saveFile } from './utils/file.helper'

const GAS_PRICE = ethers.utils.parseUnits('8', 'gwei')
const GAS_LIMIT = 500000

async function main() {
    const iface = new Interface(ARTIFCAT_KRWIN.abi)
    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)

    // setMintFee(0)
    const setMintFeeData = iface.encodeFunctionData('setMintFee', [0])
    const unsignedTx = {
        chainId: CHAIN_ID_MAINNET,
        nonce: 6, // TODO : double check nonce
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
        to: KRWIN_PROXY_ADDRESS,
        value: 0,
        data: setMintFeeData,
    }
    const signed2 = await wallet.signTransaction(unsignedTx)

    console.log('>>> Signed TX:\n', signed2)

    const { data: data2, ...unsignedTxWithoutData2 } = unsignedTx
    console.log('\n >>> unsignedTx (without data):', unsignedTxWithoutData2)

    saveFile('signatures', '06-signed-tx-set-mintfee.txt', signed2)

    // setBurnFee(0)
    const setBurnFeeData = iface.encodeFunctionData('setBurnFee', [0])
    const unsignedTx2 = {
        chainId: CHAIN_ID_MAINNET,
        nonce: 7, // TODO : double check nonce
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT,
        to: KRWIN_PROXY_ADDRESS,
        value: 0,
        data: setBurnFeeData,
    }
    const signed3 = await wallet.signTransaction(unsignedTx2)

    console.log('>>> Signed TX:\n', signed3)

    const { data: data3, ...unsignedTxWithoutData3 } = unsignedTx2
    console.log('\n >>> unsignedTx (without data):', unsignedTxWithoutData3)

    saveFile('signatures', '07-signed-tx-set-burnfee.txt', signed3)
}

main().catch(console.error)
