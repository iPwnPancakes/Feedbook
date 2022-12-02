import { LineList } from './LineList';
import { Line } from './Line';
import { Reaction } from './Reaction';

export class Chapter {
  constructor(
    public readonly id: string,
    private readonly lines: LineList
  ) {
  }

  public postReactionToLine(lineId: string, reactionType: string, preReaderId: string): void {
    const line: Line = this.lines.get(lineId);

    line.addPreReaderReaction(new Reaction(preReaderId, reactionType));
  }

  public doesLineHaveReactionFrom(lineId: string, preReaderId: string, reactionType: string): boolean {
    const lineExists = this.lines.exists(lineId);
    if (!lineExists) {
      return false;
    }

    const line = this.lines.get(lineId);
    return line.hasReaction(preReaderId, reactionType);
  }

  public hasLine(lineId: string): boolean {
    return this.lines.exists(lineId);
  }
}
