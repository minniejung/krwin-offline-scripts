import dotenv from 'dotenv'
import { ethers } from 'ethers'
import { loadFile } from './utils/file.helper'

dotenv.config()

const signedTx = loadFile('signatures', '02-signed-tx-deploy-krwin-proxy.txt') // TODO : change file

async function main() {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL_ETHEREUM_MAINNET)

        const network = await provider.getNetwork()
        console.log('>>> Connected to network:', network.name, 'Chain ID:', network.chainId)

        const tx = ethers.utils.parseTransaction(signedTx)
        console.log('>>> Transaction details:', {
            to: tx.to,
            value: tx.value?.toString(),
            gasLimit: tx.gasLimit?.toString(),
            maxFeePerGas: tx.maxFeePerGas?.toString(),
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString(),
            nonce: tx.nonce,
        })

        console.log('>>> Broadcasting transaction...')
        const broadcastTx = await provider.sendTransaction(signedTx)
        console.log('>>> Broadcasted:', broadcastTx.hash)
        console.log('>>> Etherscan:', `https://etherscan.io/tx/${broadcastTx.hash}`)

        console.log('>>> Waiting for confirmation...')
        const receipt = (await Promise.race([
            broadcastTx.wait(1),
            new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 600000)),
        ])) as ethers.providers.TransactionReceipt
        console.log('>>> Mined in block', receipt.blockNumber)

        if (receipt.status === 0) {
            console.error('>>> Transaction failed!')
        } else {
            console.log('>>> Transaction successful!')
            console.log('>>> Gas used:', receipt.gasUsed.toString())
        }
    } catch (error: any) {
        console.error('>>> Error details:', error)

        if (error.message?.includes('nonce')) {
            console.error('>>> Nonce error - check current nonce')
        } else if (error.message?.includes('insufficient funds')) {
            console.error('>>> Insufficient ETH for gas')
        } else if (error.message?.includes('gas')) {
            console.error('>>> Gas related error')
        } else if (error.message?.includes('revert')) {
            console.error('>>> Transaction reverted')
        }

        if (error.code) {
            console.error('>>> Error code:', error.code)
        }
        if (error.message) {
            console.error('>>> Error message:', error.message)
        }
        if (error.reason) {
            console.error('>>> Error reason:', error.reason)
        }
        if (error.data) {
            console.error('>>> Error data:', error.data)
        }
    }
}

main().catch((error) => {
    console.error('>>> Unhandled error:', error)
    process.exit(1)
})
