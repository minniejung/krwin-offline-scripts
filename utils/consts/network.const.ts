import { EndpointId } from '@layerzerolabs/lz-definitions'
import 'dotenv/config'

export type NetworkKey = keyof typeof NETWORKS
export type Network = (typeof NETWORKS)[NetworkKey]

export const NETWORKS = {
    1: {
        name: 'Ethereum Mainnet',
        networkName: 'mainnet',
        eid: EndpointId.ETHEREUM_V2_MAINNET, // 30101
        lzNetworkName: 'ethereum',
        contractAddress: '', // TODO : krwin proxy address
        rpcUrl: process.env.RPC_URL_ETHEREUM_MAINNET || 'https://eth-mainnet.g.alchemy.com/public',
    },
    43114: {
        name: 'Avalanche Mainnet',
        networkName: 'avalanche-mainnet',
        eid: EndpointId.AVALANCHE_V2_MAINNET, // 30106
        lzNetworkName: 'avalanche',
        contractAddress: '', // TODO : krwin proxy address
        rpcUrl: process.env.RPC_URL_AVALANCHE_MAINNET || 'https://api.avax.network/ext/bc/C/rpc',
    },
    11155111: {
        name: 'Sepolia',
        networkName: 'sepolia-testnet',
        eid: EndpointId.SEPOLIA_V2_TESTNET,
        lzNetworkName: 'sepolia',
        contractAddress: '', // TODO : krwin proxy address (test purpose)
        rpcUrl: process.env.RPC_URL_SEPOLIA_TESTNET || 'https://rpc.sepolia.org',
    },
} as const

export const CONTRACT_CONFIG = {
    name: 'KRWIN',
    tokenName: 'KRWIN',
    tokenSymbol: 'KRWIN',
    decimals: 18,
} as const
