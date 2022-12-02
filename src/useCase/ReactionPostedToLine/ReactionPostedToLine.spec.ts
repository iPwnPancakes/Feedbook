import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { PreReader } from '../../models/PreReader';
import { Line } from '../../models/Line';
import { Chapter } from '../../models/Chapter';
import { InMemoryChapterDatabase } from '../../infra/InMemoryChapterDatabase';
import { InMemoryEventDatabase } from '../../infra/InMemoryEventDatabase';
import { ReactionPostedToLineEvent } from '../../events/ReactionPostedToLineEvent';
import { ReactionPostedToLine } from './ReactionPostedToLine';
import { InMemoryPreReaderDatabase } from '../../infra/InMemoryPreReaderDatabase';
import { LineList } from '../../models/LineList';

const feature = loadFeature(path.join(__dirname, './ReactionPostedToLine.feature'));

defineFeature(feature, (test) => {
  test('Posting a reaction successfully', ({ given, when, then }) => {
    const chapterDatabase = new InMemoryChapterDatabase();
    const eventDatabase = new InMemoryEventDatabase();
    const preReaderDatabase = new InMemoryPreReaderDatabase();

    let useCase: ReactionPostedToLine = new ReactionPostedToLine(chapterDatabase, eventDatabase);

    given('a PreReader exists', () => {
      preReaderDatabase.save(new PreReader('test prereader'));
    });

    given('a Line exists in a Chapter', () => {
      const line = new Line('test line 1', []);
      const list = new LineList([line]);
      const chapter = new Chapter('test chapter', list);

      chapterDatabase.save(chapter);
    });

    when('the PreReader posts a Reaction to a Line in a Chapter', () => {
      useCase.execute({
        preReaderId: 'test prereader',
        lineId: 'test line 1',
        reactionType: 'insightful'
      });
    });

    then('the Reaction should be saved to the database', () => {
      const chapter = chapterDatabase.get('test chapter');

      expect(chapter.doesLineHaveReactionFrom('test line 1', 'test prereader', 'insightful')).toBeTruthy();
    });

    then('an ReactionPostedToLine event should be saved to the event database', () => {
      expect(eventDatabase.exists(new ReactionPostedToLineEvent('daniel test'))).toBeTruthy();
    });
  });
});
