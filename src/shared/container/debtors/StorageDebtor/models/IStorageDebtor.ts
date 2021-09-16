
export default interface IStorageDebtor {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}