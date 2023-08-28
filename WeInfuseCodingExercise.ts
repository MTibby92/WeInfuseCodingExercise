/* 
You've been asked to write a calculator to sum an individual player's rolls
and return their score for each frame. The method should accept an array of rolls.

Possible values include zero through nine, a "/" indicating a spare, and an "X"
indicating a strike. 

The return value should be an array of scores for the frames the
player has bowled.

Scoring: The scoring method will be used to calculate a player's running score during
the game, so it's important that the method works for games in progress. 

For example, [4, 5, "X", 8] should return [9, nil, nil], since the second and third frames can't be
calculated yet. When the second roll of the third frame comes in, all three frames
should be returned, e.g. [4, 5, "X", 8, 1] would return [9, 19, 9].(Note that these are
the scores for the frames, not the running score).

Open Frames
[4,5] = [9]

Spares: 10 points PLUS the score of the first roll in the next frame
[3, /, 4, 5] = [14, 9]

Strikes: 10 points PLUS the score of the next 2 rolls
[X, 4, 5] = [19, 9]

10th frame: additional role with spare, 2 with strike (total number of pins knocked down)


Key questions: 
1) how do we determine where to make segments?
    never need to look ahead more than 2 and only need to worry about going forward by 2,
    backtracking to accomodate strikes (1 roll that takes an entire frame)
*/

// this solution assumes that the rollArray input does not have more rolls than are possible
// and that valid roles are recorded (ie no ['/','/'])
const calculateBowlingScore = (rollArray: Array<number | 'X' | '/'>): Array<number | string> => {
    const score: Array<number | string> = []

    if (rollArray.length === 0) {
        return []
    }

    // if our array length is one, return nil as we can't fully calculate
    if (rollArray.length === 1) {
        return ['nil']
    }

    // move frame by frame (ie 2 rolls with look aheads)
    for (let i = 0; i < rollArray.length; i = i + 2) {
        let j = i + 1
        let k = i + 2
        
        // used to determine whether our score is currently incomplete
        let nextFrame = !!rollArray[j]
        let thirdFrame = !!rollArray[k]

        // determine if we're dealing with a strike
        if (rollArray[i] === 'X') {
            // can we calculate the score?
            if (nextFrame && thirdFrame) {
                // @ts-ignore (because a spare isn't possible after a strike)
                score.push(calculateStrike(rollArray[j], rollArray[k]))
                i = i -1 // since a strike completes the frame, we need to move forward by 1 only
            } else {
                // check if last frame, only add nils if not
                if (score.length !== 10) {
                    score.push('nil')
                    i = i -1
                }
            }
        
        // determine if we're dealing with a spare
        } else if (rollArray[j] === '/') {
            // can we calculate the score?
            if (thirdFrame) {
                // @ts-ignore (because a spare isn't possible after a spare)
                score.push(calculateSpare(rollArray[k]))
            } else {
                // check if last frame, only add nils if not
                if (score.length !== 10) {
                    score.push('nil')
                }
            }
        // dealing with an open frame
        } else {
            // can we calculate the score?
            if (!!rollArray[i] && !!rollArray[j]) {
                // @ts-ignore (because only integers possible here)
                let points = rollArray[i] + rollArray[j]
                score.push(points)
            } else {
                score.push('nil')
            }
        }
    }

    return score
}

const calculateStrike = (r2: 'X'|number, r3: 'X'|'/'|number): number => {
    // r1 must be an X, r2 can only be a number or an X
    let total = 10
    let r2Value = 0 // for typing purposes
    if (r2 === 'X') {
        let r2Value = 10
        total = total + r2Value
    } else {
        let r2Value = r2
        total = total + r2Value
    }

    // r3 can be a strike, a spare, or a number
    if (r3 === 'X') {
        total = total + 10
    } else if (r3 === '/') {
        total = total + (10 - r2Value)
    } else {
        total = total + r3
    }

    return total
}

const calculateSpare = (r3: 'X'|number): number => {
    // after a spare, we either add the next number, or 10 for a strike
    let total = 10
    if (r3 === 'X') {
        total = total + 10
    } else {
        total = total + r3
    }

    return total
}

export default calculateBowlingScore