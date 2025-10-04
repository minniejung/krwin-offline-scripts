import { ethers } from 'ethers'
import { CHAIN_ID_MAINNET, MEW_PRIVATE_KEY } from './utils/consts'
import { loadFile, saveFile } from './utils/file.helper'

const deployData = loadFile('preps', '04-prep-data-feeManager-proxy.txt')
const nonce = 4 // TODO : double check nonce

async function main() {
    const unsignedTx = {
        type: 2,
        chainId: CHAIN_ID_MAINNET,
        nonce,
        maxFeePerGas: ethers.utils.parseUnits('2', 'gwei'), // TODO : check gas tracker before
        maxPriorityFeePerGas: ethers.utils.parseUnits('0.5', 'gwei'), // TODO : check gas tracker before
        gasLimit: 6000000, // TODO : check gas tracker before
        value: 0,
        data: deployData,
    }

    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)
    const signed = await wallet.signTransaction(unsignedTx)

    console.log('>>> Signed TX:\n', signed)

    const { data, ...unsignedTxWithoutData } = unsignedTx
    console.log('\n >>> unsignedTx (without data):', unsignedTxWithoutData)

    saveFile('signatures', '04-signed-tx-deploy-feeManager-proxy.txt', signed)
}

main().catch(console.error)
