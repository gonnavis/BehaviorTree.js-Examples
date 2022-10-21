import { BehaviorTree, Sequence, Task, SUCCESS, FAILURE, RUNNING } from 'behaviortree'

BehaviorTree.register('bark', new Task({
  run: function (dog) {
    dog.bark()
    return SUCCESS
  }
}))

let testCount = 0;
let testCount2 = 0;
const tree = new Sequence({
  nodes: [
    'bark',
    new Task({
      run: function (dog) {
        dog.randomlyWalk()
        testCount++;
        if (testCount <= 3) {
          return RUNNING
        } else {
          return SUCCESS
        }
      }
    }),
    'bark',
    new Task({
      run: function (dog) {
        if (dog.standBesideATree()) {
          dog.liftALeg()
          dog.pee()
          testCount2++;
          if (testCount2 <= 3) {
            return RUNNING
          } else {
            return SUCCESS
          }
        } else {
          return FAILURE
        }
      }
    })
  ]
})

class Dog {
  bark () {
    console.log('*wuff*')
  }

  randomlyWalk () {
    console.log('The dog walks around.')
  }

  liftALeg () {
    console.log('The dog lifts a leg.')
  }

  pee () {
    console.log('The dog pees.')
  }

  standBesideATree () {
    return true
  }
}

const dog = new Dog() // the nasty details of a dog are omitted

const bTree = new BehaviorTree({
  tree: tree,
  blackboard: dog
})

// ---

// The "game" loop:

// setInterval(function () {
//   bTree.step()
//   console.log('-----------------------------')
// }, 1000)

let count = 0;
function step() {
  bTree.step()
  console.log('-----------------------------')
  count++;
  if (count < 10) setTimeout(step, 1000);
}
step();

// for (let i = 0; i < 3; i++) {
//   bTree.step()
//   console.log('-----------------------------')
// }
