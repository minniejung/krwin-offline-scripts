import dotenv from 'dotenv'
import { ethers } from 'ethers'
import artifactOzProxy from '../../artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json'
import artifactFeeManager from '../../artifacts/contracts/FeeManager.sol/FeeManager.json'
import artifactKrwin from '../../artifacts/contracts/KRWIN.sol/KRWIN.json'

dotenv.config()

export const DEPLOYER = (process.env.MEW_DEPLOYER_ADDERSS as string) || '' // todo

export const MULTISIG_ADDRESS = process.env.SAFE_MULTISIG_ADDRESS as string

export const MEW_PRIVATE_KEY = process.env.MEW_PRIVATE_KEY as string

export const LZ_ENDPOINT_SEPOLIA =
    (process.env.LZ_ENDPOINT_SEPOLIA as string) || '0x6EDCE65403992e310A62460808c4b910D972f10f' //sepolia
export const LZ_ENDPOINT_MAINNET =
    (process.env.LZ_ENDPOINT_MAINNET as string) || '0x1a44076050125825900e736c501f859c50fE728c' //mainnet
// 30101 // mainnet eid

export const KRWIN_IMPL_ADDRESS = (process.env.KRWIN_IMPL_ADDRESS as string) || '' // todo
export const KRWIN_PROXY_ADDRESS = (process.env.KRWIN_PROXY_ADDRESS as string) || '' // todo
export const FEE_MANAGER_IMPL_ADDRESS = (process.env.FEE_MANAGER_IMPL_ADDRESS as string) || '' // todo
export const FEE_MANAGER_PROXY_ADDRESS = (process.env.FEE_MANAGER_PROXY_ADDRESS as string) || '' // todo

export const CHAIN_ID_SEPOLIA = 11155111 as number // sepolia : test purpose
export const CHAIN_ID_MAINNET = 1 as number // TODO : change to mainnet

export const SETTER_GAS_PRICE = ethers.utils.parseUnits('10', 'gwei')
export const SETTER_GAS_LIMIT = 500000

// maxFeePerGas: ethers.utils.parseUnits('8', 'gwei'),
// maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'),
// gasLimit: 5000000,

export const ARTIFCAT_KRWIN = artifactKrwin
export const ARTIFCAT_OZ_PROXY = artifactOzProxy
export const ARTIFCAT_FEE_MANAGER = artifactFeeManager
