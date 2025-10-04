import { ethers } from 'ethers'
import { Interface } from 'ethers/lib/utils.js'
import {
    ARTIFCAT_KRWIN,
    CHAIN_ID_MAINNET,
    CHAIN_ID_SEPOLIA,
    DEPLOYER,
    KRWIN_PROXY_ADDRESS,
    MEW_PRIVATE_KEY,
    MULTISIG_ADDRESS,
    SETTER_GAS_LIMIT,
    SETTER_GAS_PRICE,
} from './utils/consts'
import { saveFile } from './utils/file.helper'

let nonce = 25 // TODO : double check nonce

const ROLE_NAMES = ['OPERATOR_ROLE', 'MINTER_ROLE', 'FUNDS_RECOVERY_ROLE', 'FREEZER_ROLE', 'BLACKLISTER_ROLE']

function roleHash(name: string): string {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
}

async function main() {
    const iface = new Interface(ARTIFCAT_KRWIN.abi)
    const wallet = new ethers.Wallet(MEW_PRIVATE_KEY)

    let counter = nonce

    for (const rn of ROLE_NAMES) {
        const rh = roleHash(rn)

        // grant to MULTISIG
        {
            const data = iface.encodeFunctionData('grantRole', [rh, MULTISIG_ADDRESS])
            const tx = {
                chainId: CHAIN_ID_MAINNET,
                nonce: nonce++,
                gasPrice: SETTER_GAS_PRICE,
                gasLimit: SETTER_GAS_LIMIT,
                to: KRWIN_PROXY_ADDRESS,
                value: 0,
                data,
            }
            const signed = await wallet.signTransaction(tx)

            const filename = `${String(counter++).padStart(2, '0')}-signed-grant-${rn}.txt`
            saveFile('signatures', filename, signed)

            console.log(`>>> grant ${rn} → saved as ${filename}`)
        }

        // revoke from DEPLOYER
        {
            const data = iface.encodeFunctionData('revokeRole', [rh, DEPLOYER])
            const tx = {
                chainId: CHAIN_ID_MAINNET,
                nonce: nonce++,
                gasPrice: SETTER_GAS_PRICE,
                gasLimit: SETTER_GAS_LIMIT,
                to: KRWIN_PROXY_ADDRESS,
                value: 0,
                data,
            }
            const signed = await wallet.signTransaction(tx)

            const filename = `${String(counter++).padStart(2, '0')}-signed-revoke-${rn}.txt`
            saveFile('signatures', filename, signed)

            console.log(`>>> Revoke ${rn} → saved as ${filename}`)
        }
    }

    console.log('\ +revoke txt created')
}

main().catch(console.error)
