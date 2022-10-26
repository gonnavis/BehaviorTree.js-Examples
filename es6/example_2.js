import { BehaviorTree, Sequence, Selector, Task, SUCCESS, FAILURE, RUNNING } from 'behaviortree'

let count = 0;
const blackboard = {};

BehaviorTree.register('000', new Task({
  run: function (dog) {
    console.log('000')
    if (count <= 3) {
      return FAILURE
    } else {
      return SUCCESS
    }
  }
}))
BehaviorTree.register('111', new Task({
  run: function (dog) {
    console.log('111')
    return RUNNING
  }
}))

const tree = new Selector({nodes: [
  '000',
  '111',
]})

const bTree = new BehaviorTree({
  tree: tree,
  blackboard: blackboard
})

function step() {
  bTree.step()
  console.log('-----------------------------')
  count++;
  if (count < 10) setTimeout(step, 1000);
}
step();
