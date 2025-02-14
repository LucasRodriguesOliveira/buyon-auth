export interface ICryptoService {
  hash(original: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
