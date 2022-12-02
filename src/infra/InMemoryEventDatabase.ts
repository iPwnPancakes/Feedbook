import { ReactionPostedToLineEvent } from '../events/ReactionPostedToLineEvent';

export class InMemoryEventDatabase {
  private list: ReactionPostedToLineEvent[] = [];

  public save(event: ReactionPostedToLineEvent) {
    this.list.push(event);
  }

  public exists(event: ReactionPostedToLineEvent): boolean {
    return Boolean(this.list.find((e: ReactionPostedToLineEvent) => e.reactionId === event.reactionId));
  }
}
