import { ethers } from 'ethers'
import { CHAIN_ID_MAINNET, MEW_PRIVATE_KEY } from './utils/consts'
import { loadFile, saveFile } from './utils/file.helper'

const deployData = loadFile('preps', '02-prep-data-krwin-proxy.txt')
const nonce = 7 // TODO : double check nonce

async function main() {
    const maxFeePerGas = ethers.utils.parseUnits('1.5', 'gwei') // TODO : estimated gas fee
    const maxPriorityFeePerGas = ethers.utils.parseUnits('0.1', 'gwei') // TODO : estimated gas fee

    const unsignedTx = {
        type: 2,
        chainId: CHAIN_ID_MAINNET,
        nonce: nonce,
        maxFeePerGas,
        maxPriorityFeePerGas,
        gasLimit: 15000000, // TODO : estimated gas fee
        to: undefined,
        value: 0,
        data: deployData,
    }

    console.log('>>> Gas fees:')
    console.log('>>> maxFeePerGas:', ethers.utils.formatUnits(maxFeePerGas, 'gwei'), 'gwei')
    console.log('>>> maxPriorityFeePerGas:', ethers.utils.formatUnits(maxPriorityFeePerGas, 'gwei'), 'gwei')

    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)
    const signed = await wallet.signTransaction(unsignedTx)

    console.log('>>> Signed TX:\n', signed)

    const { data, ...unsignedTxWithoutData } = unsignedTx
    console.log('\n>>> unsignedTx (without data):', unsignedTxWithoutData)

    saveFile('signatures', '02-signed-tx-deploy-krwin-proxy.txt', signed)
}

main().catch(console.error)
