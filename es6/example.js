import { BehaviorTree, Sequence, Task, SUCCESS, FAILURE, RUNNING } from 'behaviortree'

BehaviorTree.register('bark', new Task({
  start: function (dog) {
    console.log('*** 000 start')
  },
  end: function (dog) {
    console.log('*** 000 end')
  },
  run: function (dog) {
    dog.bark()
    console.log('000 SUCCESS')
    return SUCCESS
  }
}))

let testCount = 0;
let testCount2 = 0;
const tree = new Sequence({
  nodes: [
    'bark',
    new Task({
      start: function (dog) {
        console.log('*** 111 start')
      },
      end: function (dog) {
        console.log('*** 111 end')
      },
      run: function (dog) {
        dog.randomlyWalk()
        testCount++;
        if (testCount <= 3) {
          console.log('111 RUNNING')
          return RUNNING
        } else {
          console.log('111 SUCCESS')
          return SUCCESS
        }
      }
    }),
    // 'bark',
    new Task({
      start: function (dog) {
        console.log('*** 222 start')
      },
      end: function (dog) {
        console.log('*** 222 end')
      },
      run: function (dog) {
        // if (dog.standBesideATree()) {
          // dog.liftALeg()
          dog.pee()
          testCount2++;
          if (testCount2 <= 3) {
            console.log('222 RUNNING')
            return RUNNING
          } else {
            console.log('222 SUCCESS')
            return SUCCESS
          }
        // } else {
        //   return FAILURE
        // }
      }
    })
  ]
})

class Dog {
  bark () {
    // console.log('*wuff*')
    // console.log('000')
  }

  randomlyWalk () {
    // console.log('The dog walks around.')
    // console.log('111')
  }

  liftALeg () {
    // console.log('The dog lifts a leg.')
  }

  pee () {
    // console.log('The dog pees.')
    // console.log('222')
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
