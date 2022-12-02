import { Reaction } from './Reaction';

export class Line {
  constructor(public readonly id: string, private readonly reactions: Reaction[]) {
  }

  public hasReaction(preReaderId: string, reactionType: string): boolean {
    return Boolean(this.reactions.find((r: Reaction) => r.preReaderId === preReaderId && r.type === reactionType));
  }

  public addPreReaderReaction(reaction: Reaction): void {
    this.reactions.push(reaction);
  }
}
