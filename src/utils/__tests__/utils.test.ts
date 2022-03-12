import capitalizeSentence from '../capitalizeSentence';
import splitProjectTitle from '../splitProjectTitle';

describe('Capitalize Sentence tests', () => {
  it('capitalizes a sentence with all lowercase', () => {
    const testSentence = 'hello world';

    expect(capitalizeSentence(testSentence)).toEqual('Hello World');
  });

  it('capitalizes a sentence with mixed case', () => {
    const testSentence = 'Hello world';

    expect(capitalizeSentence(testSentence)).toEqual('Hello World');
  });

  it('capitalizes a sentence with all upper case', () => {
    const testSentence = 'HELLO WORLD';

    expect(capitalizeSentence(testSentence)).toEqual('Hello World');
  });
});

describe('Split Project Title tests', () => {
  it('splits a title', () => {
    const testTitle = 'kanbasic-nice name';

    expect(splitProjectTitle(testTitle)).toEqual('nice name');
  });

  it('splits a title with hiphen', () => {
    const testTitle = 'kanbasic-nice-name';

    expect(splitProjectTitle(testTitle)).toEqual('nice-name');
  });
});
