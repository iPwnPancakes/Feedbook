import { Line } from './Line';

export class LineList {
  constructor(private list: Line[] = []) {
  }

  public add(line: Line) {
    if (!this.exists(line.id)) {
      this.list.push(line);
    }
  }

  public exists(id: string): boolean {
    return Boolean(this.list.find((l: Line) => l.id === id));
  }

  public get(id: string): Line {
    const line = this.list.find((l: Line) => l.id === id);
    if (!line) {
      throw new Error(`Line with ID: ${ id } does not exist`);
    }

    return line;
  }

  public all(): Line[] {
    return this.list;
  }
}
