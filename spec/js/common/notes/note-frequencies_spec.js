import NoteFrequencies from 'js/common/notes/note-frequencies';

const EPSILON = 0.0001;

describe('NoteFrequencies', () => {
  it('has the correct notes', () => {
    expect(NoteFrequencies[0]).to.be.closeTo(8.1757989156 ,EPSILON);
    expect(NoteFrequencies['C1']).to.be.closeTo(8.1757989156 ,EPSILON);

    expect(NoteFrequencies[46]).to.be.closeTo(116.5409403795 ,EPSILON);
    expect(NoteFrequencies['Bb4']).to.be.closeTo(116.5409403795 ,EPSILON);
  });
});
