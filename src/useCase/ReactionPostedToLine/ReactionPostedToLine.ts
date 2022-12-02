import { InMemoryChapterDatabase } from '../../infra/InMemoryChapterDatabase';
import { InMemoryEventDatabase } from '../../infra/InMemoryEventDatabase';
import { ReactionPostedToLineEvent } from '../../events/ReactionPostedToLineEvent';

interface ReactionPostedToLineRequest {
  preReaderId: string,
  lineId: string,
  reactionType: string
}

export class ReactionPostedToLine {
  constructor(
    private readonly chapterDatabase: InMemoryChapterDatabase,
    private readonly eventDatabase: InMemoryEventDatabase
  ) {
  }

  public execute(request: ReactionPostedToLineRequest) {
    const chapter = this.chapterDatabase.getChapterByLineId(request.lineId);

    chapter.postReactionToLine(request.lineId, request.reactionType, request.preReaderId);

    this.chapterDatabase.save(chapter);
    this.eventDatabase.save(new ReactionPostedToLineEvent('daniel test'));
  }
}
