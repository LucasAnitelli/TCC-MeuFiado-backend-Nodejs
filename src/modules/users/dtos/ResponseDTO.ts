import Debtor from "@modules/debtors/infra/typeorm/entities/Debtor";
import User from "../infra/typeorm/entities/User";

export interface ResponseDTO {
    Success: boolean;
    Data: User;
}

export interface ResponseDebtorDTO {
    Success: boolean;
    Data: Debtor;
}

export interface TokenDTO {
    Success: boolean;
    Data: ResponseLoginDTO;
}

export interface ResponseLoginDTO {
    id: string;
    nameEstablishment: string;
    email: string;
    token: string;
    avatar: string;
}

export interface AvatarDTO {
    Data: ResponseAvatarImg;
    Success: boolean;
}

export interface ResponseAvatarImg {
    avatar: string;
    id: string;
}