let dates = [{m:"Jan",person:'lick'},{m:"March",person:'nick'},{m:"Jan",person:'son'},{m:"June",person:'dick'}];
let currentIdx = 2;
newd = {m:"May",person:'pussy'}
const addNext = (newd,currentIdx) => {
  if(currentIdx == dates.length - 1){
    dates.push(newd)
    console.log("success1")
    console.log(dates)
  }else{
    // .splice是对原数组进行修改的
    dates.splice(currentIdx,0,newd)
    console.log("success2")
    console.log(dates)
  }
}

addNext(newd,currentIdx)

