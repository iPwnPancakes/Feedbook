import { Chapter } from '../models/Chapter';

export class InMemoryChapterDatabase {
  public list: Chapter[] = [];

  public save(chapter: Chapter) {
    this.list.push(chapter);
  }

  public exists(chapter: Chapter): boolean {
    return this.list.includes(chapter);
  }

  public get(id: string) {
    const chapter: Chapter | undefined = this.list.find((c: Chapter) => c.id === id);
    if (!chapter) {
      throw new Error(`Chapter with ID: ${ id } does not exist`);
    }

    return chapter;
  }

  public getChapterByLineId(lineId: string) {
    const chapter: Chapter | undefined = this.list.find((c: Chapter) => c.hasLine(lineId));
    if (!chapter) {
      throw new Error(`No Chapters have Line with ID: ${ lineId }`);
    }

    return chapter;
  }
}
