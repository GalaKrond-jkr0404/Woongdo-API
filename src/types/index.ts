export interface jwtTokenType {
    type: string,
    id: string,
    name: string,
    iat: number,
    iss: string
}

export interface loginDataType {
    isError: boolean,
    message: string,
    token: string
}

export interface registerDataType {
    isError: boolean,
    message: string
}

export interface bookDataDBType {
    idx: number,
    title: string,
    author: string,
    company: string,
    bookID: string,
    status: number
}

export interface searchDataType {
    isError: boolean,
    message: string,
    length: number,
    data: Array<bookDataDBType>
}

export interface bookHistoryDBType {
    idx: number,
    userName: string,
    userID: string,
    bookTitle: string,
    bookAuthor: string,
    bookCompany: string,
    bookID: string,
    fromDate: string,
    endDate: string,
    status: number
}

export interface historyDataType {
    isError: boolean,
    message: string,
    length: number,
    data: Array<bookHistoryDBType>,
}

export interface returnItemType {
    userID: string,
    bookID: string
}

export interface mealDataType {
    title: string,
    menu: Array<string>
}