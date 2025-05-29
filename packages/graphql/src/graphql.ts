/* eslint-disable */
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any }
}

export type Account = {
  __typename?: 'Account'
  agency?: Maybe<Scalars['String']['output']>
  balance: Scalars['Float']['output']
  bank?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  credit: Scalars['Float']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  number?: Maybe<Scalars['String']['output']>
  type: AccountType
  updatedAt: Scalars['DateTime']['output']
}

export enum AccountType {
  Checking = 'checking',
  CreditCard = 'credit_card',
  Investment = 'investment',
  Other = 'other',
  Savings = 'savings',
}

export type Auth = {
  __typename?: 'Auth'
  accessToken: Scalars['String']['output']
  user: User
}

export type Beneficiary = {
  __typename?: 'Beneficiary'
  birthdate?: Maybe<Scalars['DateTime']['output']>
  createdAt: Scalars['DateTime']['output']
  document?: Maybe<Scalars['String']['output']>
  documentType?: Maybe<DocumentType>
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  phone?: Maybe<Scalars['String']['output']>
  type?: Maybe<BeneficiaryType>
  updatedAt: Scalars['DateTime']['output']
}

export enum BeneficiaryType {
  Client = 'client',
  Supplier = 'supplier',
}

export type Category = {
  __typename?: 'Category'
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isActive: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type Center = {
  __typename?: 'Center'
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isActive: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type CreateAccountInput = {
  agency?: InputMaybe<Scalars['String']['input']>
  balance: Scalars['Float']['input']
  bank?: InputMaybe<Scalars['String']['input']>
  credit: Scalars['Float']['input']
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  number?: InputMaybe<Scalars['String']['input']>
  type: AccountType
}

export type CreateBeneficiaryInput = {
  birthdate?: InputMaybe<Scalars['DateTime']['input']>
  document?: InputMaybe<Scalars['String']['input']>
  documentType?: InputMaybe<DocumentType>
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  phone?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<BeneficiaryType>
}

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
}

export type CreateCenterInput = {
  description?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
}

export type CreateEntryInput = {
  accountId?: InputMaybe<Scalars['ID']['input']>
  beneficiaryId?: InputMaybe<Scalars['ID']['input']>
  categoryId?: InputMaybe<Scalars['ID']['input']>
  centerId?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  dueDate?: InputMaybe<Scalars['DateTime']['input']>
  offsetDate?: InputMaybe<Scalars['DateTime']['input']>
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>
  receiveFrom: Scalars['String']['input']
  status: EntryStatus
  totalValue: Scalars['Float']['input']
  type: EntryType
}

export type CreateInvoiceInput = {
  amount: Scalars['Float']['input']
  description?: InputMaybe<Scalars['String']['input']>
  dueDate: Scalars['DateTime']['input']
  name: Scalars['String']['input']
  status: InvoiceStatus
}

export type CreateRecurringBillInput = {
  amount: Scalars['Float']['input']
  categoryId?: InputMaybe<Scalars['ID']['input']>
  centerId?: InputMaybe<Scalars['ID']['input']>
  description: Scalars['String']['input']
  endDate: Scalars['DateTime']['input']
  isActive: Scalars['Boolean']['input']
  name: Scalars['String']['input']
  startDate: Scalars['DateTime']['input']
}

export type CreateScheduleInput = {
  description: Scalars['String']['input']
  endDate: Scalars['DateTime']['input']
  identifierColor?: InputMaybe<Scalars['String']['input']>
  isActive: Scalars['Boolean']['input']
  name: Scalars['String']['input']
  reminder: Scalars['Boolean']['input']
  reminderDaysBefore?: InputMaybe<Scalars['Float']['input']>
  startDate: Scalars['DateTime']['input']
  type: ScheduleType
}

export type CreateUserInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
  password: Scalars['String']['input']
  role: UserRole
}

export enum DocumentType {
  Cnpj = 'cnpj',
  Cpf = 'cpf',
  Rg = 'rg',
}

export type Entry = {
  __typename?: 'Entry'
  account?: Maybe<Account>
  beneficiary?: Maybe<Beneficiary>
  category?: Maybe<Category>
  center?: Maybe<Center>
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  dueDate?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  offsetDate?: Maybe<Scalars['DateTime']['output']>
  paymentDate?: Maybe<Scalars['DateTime']['output']>
  receiveFrom: Scalars['String']['output']
  status: EntryStatus
  totalValue: Scalars['Float']['output']
  type: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export enum EntryStatus {
  Cancelled = 'cancelled',
  Overdue = 'overdue',
  PartiallyReceived = 'partially_received',
  Pending = 'pending',
  Received = 'received',
}

export enum EntryType {
  Payment = 'payment',
  Receipt = 'receipt',
  Transfer = 'transfer',
}

export type Invoice = {
  __typename?: 'Invoice'
  amount: Scalars['Float']['output']
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  dueDate: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  status: InvoiceStatus
  updatedAt: Scalars['DateTime']['output']
}

export enum InvoiceStatus {
  Cancelled = 'cancelled',
  Draft = 'draft',
  Overdue = 'overdue',
  Paid = 'paid',
  Sent = 'sent',
}

export type Mutation = {
  __typename?: 'Mutation'
  createAccount: Scalars['String']['output']
  createBeneficiary: Scalars['String']['output']
  createCategory: Scalars['String']['output']
  createCenter: Scalars['String']['output']
  createEntry: Scalars['String']['output']
  createInvoice: Scalars['String']['output']
  createRecurringBill: Scalars['String']['output']
  createSchedule: Scalars['String']['output']
  createUser: User
  deleteAccount: Scalars['String']['output']
  deleteBeneficiary: Scalars['String']['output']
  deleteCategory: Scalars['String']['output']
  deleteCenter: Scalars['String']['output']
  deleteEntry: Scalars['String']['output']
  deleteInvoice: Scalars['String']['output']
  deleteRecurringBill: Scalars['String']['output']
  deleteSchedule: Scalars['String']['output']
  deleteUser: Scalars['String']['output']
  signIn: Auth
  updateAccount: Scalars['String']['output']
  updateBeneficiary: Scalars['String']['output']
  updateCategory: Scalars['String']['output']
  updateCenter: Scalars['String']['output']
  updateEntry: Scalars['String']['output']
  updateRecurringBill: Scalars['String']['output']
  updateSchedule: Scalars['String']['output']
  updateUser: User
}

export type MutationCreateAccountArgs = {
  data: CreateAccountInput
}

export type MutationCreateBeneficiaryArgs = {
  data: CreateBeneficiaryInput
}

export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput
}

export type MutationCreateCenterArgs = {
  data: CreateCenterInput
}

export type MutationCreateEntryArgs = {
  data: CreateEntryInput
}

export type MutationCreateInvoiceArgs = {
  data: CreateInvoiceInput
}

export type MutationCreateRecurringBillArgs = {
  data: CreateRecurringBillInput
}

export type MutationCreateScheduleArgs = {
  data: CreateScheduleInput
}

export type MutationCreateUserArgs = {
  data: CreateUserInput
}

export type MutationDeleteAccountArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteBeneficiaryArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteCenterArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteEntryArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteInvoiceArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteRecurringBillArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteScheduleArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input']
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationUpdateAccountArgs = {
  data: UpdateAccountInput
}

export type MutationUpdateBeneficiaryArgs = {
  data: UpdateBeneficiaryInput
}

export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput
}

export type MutationUpdateCenterArgs = {
  data: UpdateCenterInput
}

export type MutationUpdateEntryArgs = {
  data: UpdateEntryInput
}

export type MutationUpdateRecurringBillArgs = {
  data: UpdateRecurringBillInput
}

export type MutationUpdateScheduleArgs = {
  data: UpdateScheduleInput
}

export type MutationUpdateUserArgs = {
  data: UpdateUserInput
}

export type PaginatedAccounts = {
  __typename?: 'PaginatedAccounts'
  items: Array<Account>
  total: Scalars['Int']['output']
}

export type PaginatedBeneficiaries = {
  __typename?: 'PaginatedBeneficiaries'
  items: Array<Beneficiary>
  total: Scalars['Int']['output']
}

export type PaginatedCategories = {
  __typename?: 'PaginatedCategories'
  items: Array<Category>
  total: Scalars['Int']['output']
}

export type PaginatedCenters = {
  __typename?: 'PaginatedCenters'
  items: Array<Category>
  total: Scalars['Int']['output']
}

export type PaginatedEntries = {
  __typename?: 'PaginatedEntries'
  items: Array<Entry>
  total: Scalars['Int']['output']
}

export type PaginatedInvoices = {
  __typename?: 'PaginatedInvoices'
  items: Array<Invoice>
  total: Scalars['Int']['output']
}

export type PaginatedRecurringBills = {
  __typename?: 'PaginatedRecurringBills'
  items: Array<RecurringBilling>
  total: Scalars['Int']['output']
}

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers'
  items: Array<User>
  total: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  account: Account
  accounts: PaginatedAccounts
  beneficiaries: PaginatedBeneficiaries
  beneficiary: Beneficiary
  categories: PaginatedCategories
  category: Category
  center: Center
  centers: PaginatedCenters
  entries: PaginatedEntries
  entry: Entry
  invoice: Invoice
  invoices: PaginatedInvoices
  recurringBill: RecurringBilling
  recurringBills: PaginatedRecurringBills
  schedule: Schedule
  schedules: Array<Schedule>
  user: User
  users: PaginatedUsers
}

export type QueryAccountArgs = {
  id: Scalars['String']['input']
}

export type QueryAccountsArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryBeneficiariesArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryBeneficiaryArgs = {
  id: Scalars['String']['input']
}

export type QueryCategoriesArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryCategoryArgs = {
  id: Scalars['String']['input']
}

export type QueryCenterArgs = {
  id: Scalars['String']['input']
}

export type QueryCentersArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryEntriesArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryEntryArgs = {
  id: Scalars['String']['input']
}

export type QueryInvoiceArgs = {
  id: Scalars['String']['input']
}

export type QueryInvoicesArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryRecurringBillArgs = {
  id: Scalars['String']['input']
}

export type QueryRecurringBillsArgs = {
  query?: InputMaybe<QueryPaginationInput>
}

export type QueryScheduleArgs = {
  id: Scalars['String']['input']
}

export type QueryUserArgs = {
  id: Scalars['String']['input']
}

export type QueryUsersArgs = {
  query: QueryPaginationInput
}

export type QueryPaginationInput = {
  search?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  take?: InputMaybe<Scalars['Int']['input']>
}

export type RecurringBilling = {
  __typename?: 'RecurringBilling'
  amount: Scalars['Float']['output']
  category: Category
  center: Center
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  endDate: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  isActive: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  startDate: Scalars['DateTime']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type Schedule = {
  __typename?: 'Schedule'
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  endDate: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  identifierColor?: Maybe<Scalars['String']['output']>
  isActive: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  reminder: Scalars['Boolean']['output']
  reminderDaysBefore?: Maybe<Scalars['Int']['output']>
  startDate: Scalars['DateTime']['output']
  type: ScheduleType
  updatedAt: Scalars['DateTime']['output']
}

export enum ScheduleType {
  OneTime = 'one_time',
  Recurring = 'recurring',
}

export type SignInInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type UpdateAccountInput = {
  agency?: InputMaybe<Scalars['String']['input']>
  balance?: InputMaybe<Scalars['Float']['input']>
  bank?: InputMaybe<Scalars['String']['input']>
  credit?: InputMaybe<Scalars['Float']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<AccountType>
}

export type UpdateBeneficiaryInput = {
  birthdate?: InputMaybe<Scalars['DateTime']['input']>
  document?: InputMaybe<Scalars['String']['input']>
  documentType?: InputMaybe<DocumentType>
  email?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  name?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<BeneficiaryType>
}

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type UpdateCenterInput = {
  description?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type UpdateEntryInput = {
  accountId?: InputMaybe<Scalars['ID']['input']>
  beneficiaryId?: InputMaybe<Scalars['ID']['input']>
  categoryId?: InputMaybe<Scalars['ID']['input']>
  centerId?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  dueDate?: InputMaybe<Scalars['DateTime']['input']>
  id: Scalars['ID']['input']
  offsetDate?: InputMaybe<Scalars['DateTime']['input']>
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>
  receiveFrom?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<EntryStatus>
  totalValue?: InputMaybe<Scalars['Float']['input']>
  type?: InputMaybe<EntryType>
}

export type UpdateRecurringBillInput = {
  amount?: InputMaybe<Scalars['Float']['input']>
  categoryId?: InputMaybe<Scalars['ID']['input']>
  centerId?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  id: Scalars['ID']['input']
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type UpdateScheduleInput = {
  description?: InputMaybe<Scalars['String']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  id: Scalars['String']['input']
  identifierColor?: InputMaybe<Scalars['String']['input']>
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  reminder?: InputMaybe<Scalars['Boolean']['input']>
  reminderDaysBefore?: InputMaybe<Scalars['Float']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  type?: InputMaybe<ScheduleType>
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  isActive: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  resetToken?: Maybe<Scalars['String']['output']>
  role: UserRole
  updatedAt: Scalars['DateTime']['output']
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
