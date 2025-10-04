import { ethers } from 'ethers'
import { CHAIN_ID_MAINNET, MEW_PRIVATE_KEY } from './utils/consts'
import { loadFile, saveFile } from './utils/file.helper'

const deployData = loadFile('preps', '03-prep-data-feeManager-impl.txt')
const nonce = 3 // TODO : double check nonce

const unsignedTx = {
    type: 2,
    chainId: CHAIN_ID_MAINNET,
    nonce,
    maxFeePerGas: ethers.utils.parseUnits('1', 'gwei'), // TODO : estimated gas fee
    maxPriorityFeePerGas: ethers.utils.parseUnits('0.1', 'gwei'), // TODO : estimated gas fee
    gasLimit: 8000000, // TODO : estimated gas fee
    value: 0,
    data: deployData,
}

async function main() {
    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)
    const signed = await wallet.signTransaction(unsignedTx)

    console.log('>>> Signed TX:\n', signed)

    const { data, ...unsignedTxWithoutData } = unsignedTx
    console.log('\n >>> unsignedTx (without data):', unsignedTxWithoutData)

    saveFile('signatures', '03-signed-tx-deploy-feeManager-impl.txt', signed)
}

main().catch(console.error)
