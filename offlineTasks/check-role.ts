import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { FEE_MANAGER_PROXY_ADDRESS, KRWIN_PROXY_ADDRESS } from './utils/consts'

// npx hardhat check:roles --target 0x6d64129a9A30753015B25843Eac1b0f4540e317b --network sepolia-testnet
// npx hardhat check:roles --target 0xfcA1C3A52C77e89f0A2A8AC635AfCAEc3F76e5EE --network sepolia-testnet

task('check:roles', 'Check KRWIN & FeeManager roles for a given address')
    .addParam('target', 'The address to check roles for')
    .setAction(async (taskArgs: { target: string }, hre: HardhatRuntimeEnvironment) => {
        const { ethers } = hre
        const [signer] = await ethers.getSigners()

        const TARGET = taskArgs.target

        console.log('>>> Checking roles for:', TARGET)

        const krwin = await ethers.getContractAt('KRWIN', KRWIN_PROXY_ADDRESS, signer)
        const feeManager = await ethers.getContractAt('FeeManager', FEE_MANAGER_PROXY_ADDRESS, signer)

        // Roles keccak256 hash values
        const OPERATOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('OPERATOR_ROLE'))
        const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('MINTER_ROLE'))
        const FUNDS_RECOVERY_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('FUNDS_RECOVERY_ROLE'))
        const FREEZER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('FREEZER_ROLE'))
        const BLACKLISTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('BLACKLISTER_ROLE'))
        const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero // 0x00...00

        // KRWIN status check
        console.log('\n=== KRWIN ===')
        console.log('owner():', await krwin.owner())
        console.log('OPERATOR_ROLE:', await krwin.hasRole(OPERATOR_ROLE, TARGET))
        console.log('MINTER_ROLE:', await krwin.hasRole(MINTER_ROLE, TARGET))
        console.log('FUNDS_RECOVERY_ROLE:', await krwin.hasRole(FUNDS_RECOVERY_ROLE, TARGET))
        console.log('FREEZER_ROLE:', await krwin.hasRole(FREEZER_ROLE, TARGET))
        console.log('BLACKLISTER_ROLE:', await krwin.hasRole(BLACKLISTER_ROLE, TARGET))
        console.log('DEFAULT_ADMIN_ROLE:', await krwin.hasRole(DEFAULT_ADMIN_ROLE, TARGET))

        // FeeManager status check
        console.log('\n=== FeeManager ===')
        console.log('owner():', await feeManager.owner())
    })
