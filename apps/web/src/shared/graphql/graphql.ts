/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  /** Session access token */
  accessToken: Scalars['String']['output'];
  /** User logged in */
  user: User;
};

export type Beneficiary = {
  __typename?: 'Beneficiary';
  /** Birthdate of the beneficiary */
  birthDate?: Maybe<Scalars['String']['output']>;
  /** Category of the beneficiary */
  category?: Maybe<Array<Category>>;
  /** Cellphone of the beneficiary */
  cellphone?: Maybe<Scalars['String']['output']>;
  /** Cost center of the beneficiary */
  costCenter?: Maybe<Array<CostCenter>>;
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the beneficiary */
  description?: Maybe<Scalars['String']['output']>;
  /** Document of the beneficiary */
  document?: Maybe<Scalars['String']['output']>;
  /** Document type of the beneficiary */
  documentType?: Maybe<Scalars['String']['output']>;
  /** Email of the beneficiary */
  email?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the beneficiary */
  name: Scalars['String']['output'];
  /** Phone of the beneficiary */
  phone?: Maybe<Scalars['String']['output']>;
  /** Type of the beneficiary */
  type?: Maybe<Scalars['String']['output']>;
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

export type Category = {
  __typename?: 'Category';
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the category */
  deductible: Scalars['Boolean']['output'];
  /** Description of the category */
  description?: Maybe<Scalars['String']['output']>;
  /** Description of the category */
  dreClass?: Maybe<Scalars['String']['output']>;
  /** Description of the category */
  flowClass?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the category */
  name: Scalars['String']['output'];
  /** Sequence number of the category */
  order: Scalars['Float']['output'];
  /** Description of the category */
  type?: Maybe<Scalars['String']['output']>;
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryGroup = {
  __typename?: 'CategoryGroup';
  /** Categories on the group */
  categories?: Maybe<Array<Category>>;
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the category */
  description: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the category */
  name: Scalars['String']['output'];
  /** Sequence number of the category */
  order: Scalars['Float']['output'];
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

export type CostCenter = {
  __typename?: 'CostCenter';
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the cost center */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the cost center */
  name: Scalars['String']['output'];
  /** Sequence number of the cost center */
  order: Scalars['Float']['output'];
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

export type CostCenterGroup = {
  __typename?: 'CostCenterGroup';
  /** Cost centers on the group */
  costCenters?: Maybe<Array<CostCenter>>;
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the cost center group */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the cost center */
  name: Scalars['String']['output'];
  /** Sequence number of the cost center */
  order: Scalars['Float']['output'];
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateBeneficiaryInput = {
  /** Birthdate of the beneficiary */
  birthDate?: InputMaybe<Scalars['String']['input']>;
  /** Category of the beneficiary */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Cellphone of the beneficiary */
  cellphone?: InputMaybe<Scalars['String']['input']>;
  /** Cost center of the beneficiary */
  costCenterId?: InputMaybe<Scalars['ID']['input']>;
  /** Description of the beneficiary */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Document of the beneficiary */
  document?: InputMaybe<Scalars['String']['input']>;
  /** Document type of the beneficiary */
  documentType?: InputMaybe<Scalars['String']['input']>;
  /** Email of the beneficiary */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Name of the beneficiary */
  name: Scalars['String']['input'];
  /** Phone of the beneficiary */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Type of the beneficiary */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategoryGroupInput = {
  /** Description of the category */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the category */
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  /** Description of the category */
  deductible: Scalars['Boolean']['input'];
  /** Description of the category */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Description of the category */
  dreClass?: InputMaybe<Scalars['String']['input']>;
  /** Description of the category */
  flowClass?: InputMaybe<Scalars['String']['input']>;
  /** Name of the category */
  name: Scalars['String']['input'];
  /** Description of the category */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCostCenterGroupInput = {
  /** Description of the cost center group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the cost center */
  name: Scalars['String']['input'];
};

export type CreateCostCenterInput = {
  /** Description of the cost center */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the cost center */
  name: Scalars['String']['input'];
};

export type CreateFinancialAccountInput = {
  /** Agency number of the financial account */
  agency?: InputMaybe<Scalars['String']['input']>;
  /** Agreement information */
  agreement?: InputMaybe<Scalars['String']['input']>;
  /** Bank of the financial account */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** Credit limit of the account */
  creditLimit?: Scalars['Float']['input'];
  /** Whether the account is deductible */
  deductible?: Scalars['Boolean']['input'];
  /** Description of the financial account */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Emission cost */
  emissionCost?: Scalars['Float']['input'];
  /** Emission tax */
  emissionTax?: Scalars['Float']['input'];
  /** Initial balance of the account */
  initialBalance?: Scalars['Float']['input'];
  /** Initial credit amount */
  initialCredit?: Scalars['Float']['input'];
  /** Monthly cost */
  monthlyCost?: Scalars['Float']['input'];
  /** Name of the financial account */
  name: Scalars['String']['input'];
  /** Account number */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Variation information */
  variation?: InputMaybe<Scalars['String']['input']>;
  /** Wallet information */
  wallet?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInflowInput = {
  /** Beneficiary associated with the inflow */
  beneficiaryId?: InputMaybe<Scalars['ID']['input']>;
  /** Category of the inflow */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Compensation information */
  compensation?: InputMaybe<Scalars['String']['input']>;
  /** Cost center associated with the inflow */
  costCenterId?: InputMaybe<Scalars['ID']['input']>;
  /** Description of the inflow */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Due date of the inflow */
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Financial account associated with the inflow */
  financialAccountId?: InputMaybe<Scalars['ID']['input']>;
  /** Name of the inflow */
  name: Scalars['String']['input'];
  /** Whether the inflow has been received */
  received?: Scalars['Boolean']['input'];
  /** Type of the inflow */
  type: InflowType;
  /** Value of the inflow */
  value: Scalars['Float']['input'];
};

export type CreateUserInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Name of the user */
  name: Scalars['String']['input'];
  /** Password of the user */
  password: Scalars['String']['input'];
};

export type FinancialAccount = {
  __typename?: 'FinancialAccount';
  /** Agency number of the financial account */
  agency?: Maybe<Scalars['String']['output']>;
  /** Agreement information */
  agreement?: Maybe<Scalars['String']['output']>;
  /** Bank of the financial account */
  bank?: Maybe<Scalars['String']['output']>;
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Credit limit of the account */
  creditLimit: Scalars['Float']['output'];
  /** Whether the account is deductible */
  deductible: Scalars['Boolean']['output'];
  /** Description of the financial account */
  description?: Maybe<Scalars['String']['output']>;
  /** Emission cost */
  emissionCost: Scalars['Float']['output'];
  /** Emission tax */
  emissionTax: Scalars['Float']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Initial balance of the account */
  initialBalance: Scalars['Float']['output'];
  /** Initial credit amount */
  initialCredit: Scalars['Float']['output'];
  /** Monthly cost */
  monthlyCost: Scalars['Float']['output'];
  /** Name of the financial account */
  name: Scalars['String']['output'];
  /** Account number */
  number?: Maybe<Scalars['String']['output']>;
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
  /** Variation information */
  variation?: Maybe<Scalars['String']['output']>;
  /** Wallet information */
  wallet?: Maybe<Scalars['String']['output']>;
};

export type Inflow = {
  __typename?: 'Inflow';
  /** Beneficiary associated with the inflow */
  beneficiary?: Maybe<Beneficiary>;
  /** Category of the inflow */
  category?: Maybe<Category>;
  /** Compensation information */
  compensation?: Maybe<Scalars['String']['output']>;
  /** Cost center associated with the inflow */
  costCenter?: Maybe<CostCenter>;
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Description of the inflow */
  description?: Maybe<Scalars['String']['output']>;
  /** Due date of the inflow */
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  /** Financial account associated with the inflow */
  financialAccount?: Maybe<FinancialAccount>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the inflow */
  name: Scalars['String']['output'];
  /** Whether the inflow has been received */
  received: Scalars['Boolean']['output'];
  /** Type of the inflow */
  type: InflowType;
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
  /** Value of the inflow */
  value: Scalars['Float']['output'];
};

export enum InflowType {
  Payment = 'PAYMENT',
  Receipt = 'RECEIPT',
  Transfer = 'TRANSFER'
}

export type Mutation = {
  __typename?: 'Mutation';
  createBeneficiary: Beneficiary;
  createCategory: Category;
  createCategoryGroup: CategoryGroup;
  createCostCenter: CostCenter;
  createCostCenterGroup: CostCenterGroup;
  createFinancialAccount: FinancialAccount;
  createInflow: Inflow;
  createUser: User;
  deleteBeneficiary: Beneficiary;
  deleteCategory: Category;
  deleteCategoryGroup: CategoryGroup;
  deleteCostCenter: CostCenter;
  deleteCostCenterGroup: CostCenterGroup;
  deleteFinancialAccount: FinancialAccount;
  deleteInflow: Inflow;
  deleteUser: User;
  signIn: Auth;
  updateBeneficiary: Beneficiary;
  updateCategory: Category;
  updateCategoryGroup: CategoryGroup;
  updateCostCenter: CostCenter;
  updateCostCenterGroup: CostCenterGroup;
  updateFinancialAccount: FinancialAccount;
  updateInflow: Inflow;
  updateUser: User;
};


export type MutationCreateBeneficiaryArgs = {
  data: CreateBeneficiaryInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateCategoryGroupArgs = {
  data: CreateCategoryGroupInput;
};


export type MutationCreateCostCenterArgs = {
  data: CreateCostCenterInput;
};


export type MutationCreateCostCenterGroupArgs = {
  data: CreateCostCenterGroupInput;
};


export type MutationCreateFinancialAccountArgs = {
  data: CreateFinancialAccountInput;
};


export type MutationCreateInflowArgs = {
  data: CreateInflowInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteBeneficiaryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryGroupArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCostCenterArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCostCenterGroupArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteFinancialAccountArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteInflowArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateBeneficiaryArgs = {
  data: UpdateBeneficiaryInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
};


export type MutationUpdateCategoryGroupArgs = {
  data: UpdateCategoryGroupInput;
};


export type MutationUpdateCostCenterArgs = {
  data: UpdateCostCenterInput;
};


export type MutationUpdateCostCenterGroupArgs = {
  data: UpdateCostCenterGroupInput;
};


export type MutationUpdateFinancialAccountArgs = {
  data: UpdateFinancialAccountInput;
};


export type MutationUpdateInflowArgs = {
  data: UpdateInflowInput;
};


export type MutationUpdateUserArgs = {
  data: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllBeneficiaries: Array<Beneficiary>;
  getAllCategories: Array<Category>;
  getAllCategoriesGroups: Array<CategoryGroup>;
  getAllCostCenters: Array<CostCenter>;
  getAllCostCentersGroups: Array<CostCenterGroup>;
  getAllFinancialAccounts: Array<FinancialAccount>;
  getAllInflows: Array<Inflow>;
  getAllUsers: Array<User>;
  getBeneficiaryById: Beneficiary;
  getCategoryById: Category;
  getCategoryGroupById: CategoryGroup;
  getCostCenterById: CostCenter;
  getCostCenterGroupById: CostCenterGroup;
  getCurrentUser: User;
  getFinancialAccountById: FinancialAccount;
  getInflowById: Inflow;
  getUserByEmail: User;
  getUserById: User;
};


export type QueryGetBeneficiaryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoryGroupByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCostCenterByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCostCenterGroupByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetFinancialAccountByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetInflowByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};

export type UpdateBeneficiaryInput = {
  /** Birthdate of the beneficiary */
  birthDate?: InputMaybe<Scalars['String']['input']>;
  /** Category of the beneficiary */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Cellphone of the beneficiary */
  cellphone?: InputMaybe<Scalars['String']['input']>;
  /** Cost center of the beneficiary */
  costCenterId?: InputMaybe<Scalars['ID']['input']>;
  /** Description of the beneficiary */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Document of the beneficiary */
  document?: InputMaybe<Scalars['String']['input']>;
  /** Document type of the beneficiary */
  documentType?: InputMaybe<Scalars['String']['input']>;
  /** Email of the beneficiary */
  email?: InputMaybe<Scalars['String']['input']>;
  /** ID of the beneficiary */
  id: Scalars['String']['input'];
  /** Name of the beneficiary */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Phone of the beneficiary */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Type of the beneficiary */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryGroupInput = {
  /** Description of the category */
  description?: InputMaybe<Scalars['String']['input']>;
  /** ID of the category group */
  id: Scalars['ID']['input'];
  /** Name of the category */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  /** Description of the category */
  deductible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Description of the category */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Description of the category */
  dreClass?: InputMaybe<Scalars['String']['input']>;
  /** Description of the category */
  flowClass?: InputMaybe<Scalars['String']['input']>;
  /** ID of the category */
  id: Scalars['ID']['input'];
  /** Name of the category */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Description of the category */
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCostCenterGroupInput = {
  /** Description of the cost center group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** ID of the cost center group */
  id: Scalars['ID']['input'];
  /** Name of the cost center */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCostCenterInput = {
  /** Description of the cost center */
  description?: InputMaybe<Scalars['String']['input']>;
  /** ID of the cost center */
  id: Scalars['ID']['input'];
  /** Name of the cost center */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFinancialAccountInput = {
  /** Agency number of the financial account */
  agency?: InputMaybe<Scalars['String']['input']>;
  /** Agreement information */
  agreement?: InputMaybe<Scalars['String']['input']>;
  /** Bank of the financial account */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** Credit limit of the account */
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  /** Whether the account is deductible */
  deductible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Description of the financial account */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Emission cost */
  emissionCost?: InputMaybe<Scalars['Float']['input']>;
  /** Emission tax */
  emissionTax?: InputMaybe<Scalars['Float']['input']>;
  /** ID of the financial account */
  id: Scalars['String']['input'];
  /** Initial balance of the account */
  initialBalance?: InputMaybe<Scalars['Float']['input']>;
  /** Initial credit amount */
  initialCredit?: InputMaybe<Scalars['Float']['input']>;
  /** Monthly cost */
  monthlyCost?: InputMaybe<Scalars['Float']['input']>;
  /** Name of the financial account */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Account number */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Variation information */
  variation?: InputMaybe<Scalars['String']['input']>;
  /** Wallet information */
  wallet?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInflowInput = {
  /** Beneficiary associated with the inflow */
  beneficiaryId?: InputMaybe<Scalars['ID']['input']>;
  /** Category of the inflow */
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  /** Compensation information */
  compensation?: InputMaybe<Scalars['String']['input']>;
  /** Cost center associated with the inflow */
  costCenterId?: InputMaybe<Scalars['ID']['input']>;
  /** Description of the inflow */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Due date of the inflow */
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Financial account associated with the inflow */
  financialAccountId?: InputMaybe<Scalars['ID']['input']>;
  /** ID of the inflow */
  id: Scalars['String']['input'];
  /** Name of the inflow */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Whether the inflow has been received */
  received?: InputMaybe<Scalars['Boolean']['input']>;
  /** Type of the inflow */
  type?: InputMaybe<InflowType>;
  /** Value of the inflow */
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Email of the user */
  email: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};
