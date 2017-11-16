
class Test{
    constructor() {
         this.t = {
            "Start": 0,
            "End": 0,
            "Ts": 2,
            "Sku": "NO090934535123",
            "Text": "可口可乐300ml",
            "Type": "Normal",
            "Hide": false
        }
        
    }

    setTableValue(tableObj, paramObj) {
        Object.entries(tableObj).map(tableAttri => {
            // console.log(tableObj[tableAttri[0]]);
            // console.log(paramObj[tableAttri[0]]);            
            if (paramObj[tableAttri[0]]) {
                tableObj[tableAttri[0]] = paramObj[tableAttri[0]];
                return;
            }
            
            if (paramObj[tableAttri[0]] === false) {
                tableObj[tableAttri[0]] = paramObj[tableAttri[0]];
                return;            
            }
            
            if (paramObj[tableAttri[0]] === 0) {
                tableObj[tableAttri[0]] = paramObj[tableAttri[0]];
                return;
            }
        });
    }
}



  const te =     {
    "Start": 0,
    "End": 1,
    "Ts": undefined,
    "Sku": "NO090934535123",
    "Text": "可口可乐300ml",
    "CenterX": 320,
    "CenterY": 20,
    "Type": "no scan",
    "Hide": true
  }

const test = new Test();
test.setTableValue(test.t, te);
console.log(test.t);