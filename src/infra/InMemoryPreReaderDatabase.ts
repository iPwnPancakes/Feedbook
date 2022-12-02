import { PreReader } from '../models/PreReader';

export class InMemoryPreReaderDatabase {
  constructor(private preReaderList: PreReader[] = []) {
  }

  exists(id: string): boolean {
    return Boolean(this.preReaderList.find((p: PreReader) => p.id === id));
  }

  /**
   *
   * @param id
   *
   * @throws Error if no PreReader exists with passed ID
   */
  get(id: string): PreReader {
    const preReader: PreReader | undefined = this.preReaderList.find((p: PreReader) => p.id === id);
    if (!preReader) {
      throw new Error('No PreReader exists with id ' + id);
    }

    return preReader;
  }

  save(preReader: PreReader): void {
    const index = this.preReaderList.findIndex((p: PreReader) => p.id === preReader.id);
    if (index === -1) {
      this.preReaderList.push(preReader);
    } else {
      this.preReaderList.splice(index, 1, preReader);
    }
  }

}
