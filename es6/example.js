import { BehaviorTree, Sequence, Task, SUCCESS, FAILURE, RUNNING } from 'behaviortree'

BehaviorTree.register('bark', new Task({
  start: function (dog) {
    console.log('*** 000 start')
  },
  end: function (dog) {
    console.log('*** 000 end')
  },
  run: function (dog) {
    console.log('000 SUCCESS')
    return SUCCESS
  }
}))

let testCount1 = 0;
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
        testCount1++;
        if (testCount1 <= 3) {
          console.log('111 RUNNING')
          return RUNNING
        } else {
          console.log('111 SUCCESS')
          return SUCCESS
        }
      }
    }),
    new Task({
      start: function (dog) {
        console.log('*** 222 start')
      },
      end: function (dog) {
        console.log('*** 222 end')
      },
      run: function (dog) {
        testCount2++;
        if (testCount2 <= 3) {
          console.log('222 RUNNING')
          return RUNNING
        } else {
          console.log('222 SUCCESS')
          return SUCCESS
        }
      }
    })
  ]
})

class Dog {
}

const dog = new Dog()

const bTree = new BehaviorTree({
  tree: tree,
  blackboard: dog
})

let count = 0;
function step() {
  bTree.step()
  console.log('-----------------------------')
  count++;
  if (count < 10) setTimeout(step, 1000);
}
step();
