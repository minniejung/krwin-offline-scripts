import { Interface } from 'ethers/lib/utils.js'
import {
    ARTIFCAT_FEE_MANAGER,
    ARTIFCAT_OZ_PROXY,
    DEPLOYER,
    FEE_MANAGER_IMPL_ADDRESS,
    KRWIN_PROXY_ADDRESS,
} from './utils/consts'
import { saveFile } from './utils/file.helper'

const KRWIN = KRWIN_PROXY_ADDRESS
const IMPL = FEE_MANAGER_IMPL_ADDRESS
const ADMIN = DEPLOYER // TODO : eoa or multisig (Proxy 관리자)
const LP = DEPLOYER // 1 of EOA (not used for now)
const TREASURY = DEPLOYER // 1 of EOA (not used for now)

if (!IMPL || !ADMIN || !KRWIN || !LP || !TREASURY) {
    throw new Error('IMPL, ADMIN, KRWIN, LP, TREASURY not found')
}

async function main() {
    // initialize(krwinAddress, lpReceiver, treasuryReceiver)
    const initIface = new Interface(ARTIFCAT_FEE_MANAGER.abi)
    const initData = initIface.encodeFunctionData('initialize', [KRWIN, LP, TREASURY])

    console.log('>>> initData:\n', initData)
    console.log('\n>>> KRWIN_PROXY_ADDRESS : ', KRWIN)
    console.log('>>> FEE_MANAGER_IMPL_ADDRESS : ', IMPL)
    console.log('>>> ADMIN : ', ADMIN)
    console.log('>>> LP : ', LP)
    console.log('>>> TREASURY : ', TREASURY)

    // constructor(address _logic, address admin_, bytes memory _data)
    const proxyArgs = [IMPL, ADMIN, initData]
    const proxyIface = new Interface(ARTIFCAT_OZ_PROXY.abi)
    const encodedArgs = proxyIface.encodeDeploy(proxyArgs)

    const deployData = ARTIFCAT_OZ_PROXY.bytecode + encodedArgs.slice(2)

    saveFile('preps', '04-prep-data-feeManager-proxy.txt', deployData)
}
main().catch(console.error)
