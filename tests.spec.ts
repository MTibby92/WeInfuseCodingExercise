import calculator from './WeInfuseCodingExercise'

describe('Bowling Score Tests', () => {
    it('Should handle an empty array', () => {
      const result = calculator([])
      expect(result).toEqual([])
    });
    it('Should handle an array of 1 roll', () => {
        const result = calculator([3])
        expect(result).toEqual(['nil'])
    })
    it('Handles [5,3,3,2,6,/,4]', () => {
        const input: Array<'X'|'/'|number> = [5,3,3,2,6,'/',4]
        const result = calculator(input)
        expect(result).toEqual([8,5,14,'nil'])
    })
    it('Handles [2,1,X,3,/,4,5]', () => {
        const input: Array<'X'|'/'|number> = [2,1,'X',3,'/',4,5]
        const result = calculator(input)
        expect(result).toEqual([3,23,14,9])
    })
    it('Handles [4,5,X,8]', () => {
        const input: Array<'X'|'/'|number> = [4,5,'X',8]
        const result = calculator(input)
        expect(result).toEqual([9,'nil','nil'])
    })
    it('Handles [4,5,X,8,1]', () => {
        const input: Array<'X'|'/'|number> = [4,5,'X',8,1]
        const result = calculator(input)
        expect(result).toEqual([9,19,9])
    })
    it('Handles a perfect game', () => {
        const input: Array<'X'|'/'|number> = ['X','X','X','X','X','X','X','X','X','X','X','X']
        const result = calculator(input)
        expect(result).toEqual([30,30,30,30,30,30,30,30,30,30])
    })
  });