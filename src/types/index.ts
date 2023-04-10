export type BaseUrlCategory = 'API' | 'PAYMENTS'

export type XTargetEnvironment = 'sandbox' | 'live'

export type EndpointCategory =
  | 'CREATE_SUBSCRIPTION'
  | 'FETCH_SUBSCRIPTION'
  | 'DELETE_SUBSCRIPTION'
  | 'MOBILE_CHECKOUT'
  | 'MOBILE_B2C'
  | 'MOBILE_B2B'
  | 'MOBILE_DATA'

export type Endpoints = {
  readonly [category in EndpointCategory]: {
    readonly baseUrlCategory: BaseUrlCategory
    readonly endpoint: string
  }
}

export type PartyId = 'MSISDN' | 'EMAIL' | 'PARTY_CODE'

export interface CreateAccessToken {
  readonly expires_in: number
  readonly access_token: string
  readonly token_type: string
}

export interface MomoClientOptions {
  readonly 'X-Target-Environment': XTargetEnvironment
  readonly 'Ocp-Apim-Subscription-Key': string
  readonly 'API-Key': string
  readonly 'X-Reference-Id': string
  readonly 'X-Callback-Url'?: string | undefined
}

export interface RequestToPayOptions {
  readonly amount: string
  readonly currency: string
  readonly externalId: string
  readonly payer: {
    readonly partyIdType: PartyId
    readonly partyId: string
  }
  readonly payerMessage: string
  readonly payeeNote: string
}

export type TransactionStatus =
  | 'PENDING'
  | 'SUCCESSFUL'
  | 'REJECTED'
  | 'TIMEOUT'
  | 'FAILED'

export interface RequestToPayTransactionStatus extends RequestToPayOptions {
  readonly status: TransactionStatus
}

interface MomoError {
  readonly status_code: number
  readonly status_text: string
  readonly message: string
}

export interface RequestToPayData {
  readonly status_code: number
  readonly message: string
  readonly referenceId: string
}

export interface MomoResponse<T> {
  readonly data: T | null
  readonly error: MomoError | null
}

export interface RequestToPayHeaders {
  readonly [header: string]: string | undefined
  readonly 'Content-Type': string
  readonly 'Ocp-Apim-Subscription-Key': string
  readonly 'X-Reference-Id': string
  readonly 'X-Target-Environment': XTargetEnvironment
  readonly Authorization: string
  readonly 'X-Callback-Url'?: string
}

export interface BasicUserInfo {
  readonly sub: string
  readonly name: string
  readonly given_name: string
  readonly family_name: string
  readonly birthdate: Date
  readonly locale: string
  readonly gender: string
  readonly updated_at: number
}

export interface AccountBalanceData {
  readonly availableBalance: string
  readonly currency: string
}

export interface AccountHolder{
  readonly accountHolderId:string,
  readonly accountHolderIdType:PartyId
}

export interface AccountHolderStatus{
  readonly result:boolean
}

export interface ICollection {
  requestToPay(
    options: RequestToPayOptions
  ): Promise<MomoResponse<RequestToPayData>>
  requestToPayTransactionStatus(
    referenceId: string
  ): Promise<MomoResponse<RequestToPayTransactionStatus>>
  getBasicUserInfo(
    accountHolderMSISDN: string
  ): Promise<MomoResponse<BasicUserInfo>>
  getAccountBalance(): Promise<MomoResponse<AccountBalanceData>>
  validateAccountHolderStatus(options:AccountHolder):Promise<MomoResponse<AccountHolderStatus>>
}
