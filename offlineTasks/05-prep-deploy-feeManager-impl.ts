import { Interface } from 'ethers/lib/utils.js'
import { ARTIFCAT_FEE_MANAGER } from './utils/consts'
import { saveFile } from './utils/file.helper'

async function main() {
    const constructorArgs: any[] = []

    const iface = new Interface(ARTIFCAT_FEE_MANAGER.abi)
    const encodedArgs = iface.encodeDeploy(constructorArgs)

    const deployData = ARTIFCAT_FEE_MANAGER.bytecode + encodedArgs.slice(2)

    console.log('>>> Impl constructor args:', constructorArgs)
    console.log('>>> Deploy Data: ')
    console.log(deployData)

    saveFile('preps', '03-prep-data-feeManager-impl.txt', deployData)
}
main().catch(console.error)
