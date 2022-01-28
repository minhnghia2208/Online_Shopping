export interface RegisterCriteria {
    phoneNumber: string;
    name: string;
}

export interface RegisterCustomerInfo {
    customerId: string,
    isSuccess: boolean;
    errorMessage: string;
}

export interface RegisterShopInfo {
    shopId: string,
    phoneNumber: string;
    errorMessage: string;
}
