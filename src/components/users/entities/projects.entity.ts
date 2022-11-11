import { Column, Entity, ObjectIdColumn } from 'typeorm';

export interface Id {
  $oid: string;
}

export interface Participants {
  director: string;
  cast: string;
  music: string;
}

export interface Gallery {
  fileName: string;
  fileUrl: string;
}

export interface BlockChainDetails {
  ipfsFileUrl: string;
  ipfsMetaDataJson: string;
  mintedNftTransactionHash: string;
  nftTokenId: number;
  nftOwnerTransferTransactionHash: string;
}

export interface PurchaseList {
  payoutHistories: any[];
  ipxNftPurchaseRefUuid: string;
  owner: string;
  purchasedOn: string;
  purchasedPrice?: number;
  equityPercentage: number;
  transactionRefId: string;
  blockChainDetails: BlockChainDetails;
}

export interface Gallery2 {
  fileName: string;
  fileUrl: string;
}

export interface GasPrice {
  $numberLong: string;
}

export interface GasPrice2 {
  $numberLong: string;
}

export interface MetamaskPostResponse {
  usdcContractAddress: string;
  fromUserAddress: string;
  toIpxAddress: string;
  amountInUsdcCoinNotion: string;
  amountToSend: string;
  gasPrice: GasPrice2;
}

export interface Usdc {
  amountInUsdc: string;
  usdcInrConversionRate: number;
  gasPrice: GasPrice;
  metamaskPostResponse: MetamaskPostResponse;
}

export interface BidPaymentsTransactionSummary {
  _id: string;
  createdAt: Date;
  deleted: boolean;
  userId: string;
  email: string;
  walletAddress: string;
  projectId: string;
  projectIndividualNftId: string;
  nftName: string;
  image: string;
  status: string;
  usdc: Usdc;
  paymentMode: string;
  basePrice: number;
  bidPayableAmount: number;
  pendingPayableAmount: number;
  isAuction: boolean;
  bidPrice: number;
}

export interface NftAuctionHistory {
  bidPaymentsTransactionSummary: BidPaymentsTransactionSummary[];
  owner: string;
  bidPrice: number;
  name: string;
  email: string;
  phone: string;
  userId: string;
  bidDate: string;
}

export interface NftAuction {
  expiry: Date;
  startingBidPrice: number;
  lastBidPrice: number;
  recentBidder: string;
  recentBidDate: string;
  nftAuctionHistories: NftAuctionHistory[];
}

export interface ProjectIndividualNft {
  purchaseList: PurchaseList[];
  gallery: Gallery2[];
  _id: string;
  createdAt: Date;
  deleted: boolean;
  projectId: string;
  projectIndividualNftId: string;
  coverName: string;
  coverFileName: string;
  coverFileUrl: string;
  owner: string;
  ownerName: string;
  price: number;
  qty: number;
  equityPercentage: number;
  isAuction: boolean;
  nftAuction: NftAuction;
  expired?: boolean;
}

export interface RootObject {
  _id: Id;
  nftCategory: string;
  coverName: string;
  coverFileUrl: string;
  shortDescription: string;
  participants: Participants;
  gallery: Gallery[];
  ownerName: string;
  owner: string;
  projectIndividualNfts: ProjectIndividualNft[];
  qty: number;
}

@Entity()
export class Projects {
  @ObjectIdColumn()
  _id: string;
}
