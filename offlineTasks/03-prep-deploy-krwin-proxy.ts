import { Interface } from 'ethers/lib/utils.js'
import { ARTIFCAT_KRWIN, ARTIFCAT_OZ_PROXY, DEPLOYER } from './utils/consts'
import { saveFile } from './utils/file.helper'

const tokenName = 'KRWIN'
const tokenSymbol = 'KRWIN'
const delegate = process.env.DECENT_ADDRESS_3 // TODO : change to delegate address
const ADMIN = DEPLOYER
const KRWIN_IMPL_ADDRESS = '' // TODO : KRWIN_IMPL_ADDRESS

if (!ADMIN) {
    throw new Error('ADMIN not found')
}

async function main() {
    // initialize(string memory _name, string memory _symbol, address _delegate, address _admin)
    const krwinIface = new Interface(ARTIFCAT_KRWIN.abi)
    const initData = krwinIface.encodeFunctionData('initialize', [
        tokenName, // tokenName
        tokenSymbol, // tokenSymbol
        delegate, // delegate
        ADMIN, // roles
    ])

    console.log('>>> initData:\n', initData)
    console.log('\n>>> KRWIN_IMPL_ADDRESS : ', KRWIN_IMPL_ADDRESS)
    console.log('>>> Delegate Address : ', delegate)
    console.log('>>> ADMIN : ', ADMIN)
    console.log('>>> tokenName : ', tokenName)
    console.log('>>> tokenSymbol : ', tokenSymbol)

    // constructor(address _logic, address admin_, bytes memory _data)
    const proxyArgs = [KRWIN_IMPL_ADDRESS, ADMIN, initData]
    const proxyIface = new Interface(ARTIFCAT_OZ_PROXY.abi)
    const encodedArgs = proxyIface.encodeDeploy(proxyArgs)

    const deployData = ARTIFCAT_OZ_PROXY.bytecode + encodedArgs.slice(2)

    saveFile('preps', '02-prep-data-krwin-proxy.txt', deployData)
}

main().catch(console.error)
