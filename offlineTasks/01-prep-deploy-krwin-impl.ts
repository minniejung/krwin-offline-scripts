import { Interface } from 'ethers/lib/utils.js'
import { ARTIFCAT_KRWIN, LZ_ENDPOINT_MAINNET, LZ_ENDPOINT_SEPOLIA } from './utils/consts'
import { saveFile } from './utils/file.helper'

async function main() {
    const constructorArgs = [LZ_ENDPOINT_MAINNET] // TODO : change to LZ_ENDPOINT_MAINNET

    const iface = new Interface(ARTIFCAT_KRWIN.abi)
    const encodedArgs = iface.encodeDeploy(constructorArgs)

    const deployData = ARTIFCAT_KRWIN.bytecode + encodedArgs.slice(2)

    console.log('>>> Constructor args:', constructorArgs)
    console.log('>>> Deploy Data: ')
    console.log(deployData)

    saveFile('preps', '01-prep-data-krwin-impl.txt', deployData)
}

main().catch(console.error)
